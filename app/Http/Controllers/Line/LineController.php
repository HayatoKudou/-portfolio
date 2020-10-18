<?php

namespace App\Http\Controllers\Line;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use LINE\LINEBot;
use LINE\LINEBot\Event\MessageEvent\TextMessage;
use LINE\LINEBot\Event\FollowEvent;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use LINE\LINEBot\MessageBuilder\RawMessageBuilder;
use Exception;
use GuzzleHttp\Client;

use App\Http\Controllers\Line\ImagRecognitionController;
use App\Http\Controllers\Line\WeatherController;
use App\Services\Line\Message;
use App\Services\Line\WeatherTimeMessage;

class LineController extends Controller
{
    public function webhook (Request $request)
    {
        $httpClient = new CurlHTTPClient(env('LINE_ACCESS_TOKEN'));
        $lineBot = new LINEBot($httpClient, ['channelSecret' => env('LINE_CHANNEL_SECRET')]);

        //不正アクセス対策
        $signature = $request->header('x-line-signature');
        if (!$lineBot->validateSignature($request->getContent(), $signature)) {
            abort(400, 'Invalid signature');
        }

        $events = $lineBot->parseEventRequest($request->getContent(), $signature);

        foreach ($events as $event) {
            //テキスト用
            Log::debug($request->events[0]['message']['type']);
            if($request->events[0]['message']['type'] == "text"){
                $replyToken = $event->getReplyToken();
                $word = $request->events[0]['message']['text'];

                //天気取得
                if($word == "天気"){
                    $weather_model = new WeatherController;
                    $templete = $weather_model->weather($request, $lineBot, $replyToken);
                    // $weatherTimeMessage_model = new WeatherTimeMessage;
                    // $templete = $weatherTimeMessage_model->askAge();

                } elseif($word == "6時"){
                    $templete = [
                        'type' => 'text',
                        'text' => '朝早すぎます。もう少し寝かせてください。',
                    ];

                //退出
                } elseif($word == "バルス"){
                    Log::debug($request->events[0]['source']['groupId']);
                    //グループID取得
                    $room_id = $request->events[0]['source']['groupId'];
                    $response = $lineBot->leaveGroup($room_id);

                //平文入力
                } else {
                    $message_model = new Message;
                    $templete = $message_model->askAge();
                }
                $askAgeBuilder = new RawMessageBuilder($templete);
                $lineBot->replyMessage($replyToken, $askAgeBuilder);
            }

            //画像用
            if($request->events[0]['message']['type'] == "image"){
                $replyToken = $event->getReplyToken();

                $ImagRecognition = new ImagRecognitionController;
                $templete = $ImagRecognition->imag_recognition($request, $lineBot, $replyToken);

                //送信処理
                $askAgeBuilder = new RawMessageBuilder($templete);
                $lineBot->replyMessage($replyToken, $askAgeBuilder);
            }
        }
    }

}
