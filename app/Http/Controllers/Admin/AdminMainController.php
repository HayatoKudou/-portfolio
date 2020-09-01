<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Log;
use Mail;
use Twitter;
use Illuminate\Support\Facades\Validator;
use App\Content;
use App\Notice;
use App\Http\Controllers\Controller;

class AdminMainController extends Controller
{
    public function getUpdateDate(){
        $path = base_path('resources/views');
        date_default_timezone_set('Asia/Tokyo');
        $update_date = date( "Y-m-d", filemtime($path));
        return $update_date;
    }

    public function getTwitterData(){
        $result = Twitter::get('statuses/user_timeline', array(
            "count" => 10,
            "exclude_replies" =>  True,
            "include_rts"=>  False,
        ));
        return $result;
    }

    public function home_top(){
        $result = $this->getTwitterData();
        $notice_data = Notice::getNoticeData();
        return view('home.admin.top',["result" => $result, "notice_data" => $notice_data]);
    }

    public function show_notice_post(){
        $today = date("Y-m-d");
        return view('blog.admin.notice_post',["today" => $today]);
    }

    public function register_notice_post(Request $request){
        //バリデーション
        $notice_model = new Notice;
        $validator = $notice_model->validator($request->all());
        if ($validator->fails()) {
            return redirect()->back()
            ->withErrors($validator)
            ->withInput();
        }
        $notice_model->fill([
            'date' => $request->notice_date,
            'notice_content' => $request->notice_content,
        ]);
        $notice_model->save();
        $result = $this->getTwitterData();
        $notice_data = Notice::getNoticeData();
        return view('blog.admin.top',["result" => $result, "notice_data" => $notice_data]);
    }

    public function notice_delete(Request $request){
        foreach ($request->delete_id as $id) {
            Notice::find($id)->delete();
        }
        $result = $this->getTwitterData();
        $notice_data = Notice::getNoticeData();
        return view('blog.admin.top',["result" => $result, "notice_data" => $notice_data]);
    }
}
