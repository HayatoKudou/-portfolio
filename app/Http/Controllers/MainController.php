<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use Mail;
use Illuminate\Support\Facades\Validator;
use App\Content;

class MainController extends Controller
{
    public function main(){
        return view('mainPage');
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

        //メール送信
        Mail::send('emails.mail', [
            'email' => $request->email,
            'content' => $request->content,
        ], function($message){
    	    $message->to('kudoh115@gmail.com')
            ->from('hayatoportfolio@gmail.com')
            ->subject('This is a test mail');
    	});
        $request->session()->flash('message', 'ご連絡ありがとうございます。数日以内にご返信いたします。今しばらくお待ちください。');
        return view('mainPage');
    }
}
