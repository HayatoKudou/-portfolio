<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use Mail;
use Illuminate\Support\Facades\Validator;
use App\Content;
use App\Notice;

class MainController extends Controller
{
    public function getUpdateDate(){
        $path = base_path('resources/views');
        date_default_timezone_set('Asia/Tokyo');
        $update_date = date( "Y-m-d", filemtime($path));
        return $update_date;
    }

    public function getTwitterData(){
        $result = \Twitter::get('statuses/user_timeline', array(
            "count" => 10,
            "exclude_replies" =>  True,
            "include_rts"=>  False,
        ));
        return $result;
    }

    public function maintenance(){
        return redirect()->back()->withErrors('メンテナンス中です。申し訳ございません。');
    }

    public function main(){
        //更新日時取得
        $update_date = $this->getUpdateDate();
        return view('portfolio.mainPage',['update_date' => $update_date]);
    }

    public function send_mail(Request $request){
        //バリデーション
        $content_model = new Content;
        $validator = $content_model->validator($request->all());
        if ($validator->fails()) {
            return redirect()->back()
            ->withErrors($validator)
            ->withInput();
        }
        $content_model->fill([
            'email' => $request->email,
            'content' => $request->content,
        ]);
        $content_model->save();
        //更新日時取得
        $update_date = $this->getUpdateDate();
        //メール送信
        Mail::send('emails.mail', [
            'email' => $request->email,
            'content' => $request->content,
        ], function($message){
    	    $message->to('kudoh115@gmail.com')
            ->from('hayatoportfolio@gmail.com')
            ->subject('ポートフォリオからのお問い合わせ');
    	});
        $request->session()->flash('message', 'ご連絡ありがとうございます。数日以内にご返信いたします。今しばらくお待ちください。');
        return view('portfolio.mainPage',['update_date' => $update_date]);
    }

    public function blog_top(){
        $result = $this->getTwitterData();
        $notice_data = Notice::getNoticeData();
        return view('blog.top',["result" => $result, "notice_data" => $notice_data]);
    }
}
