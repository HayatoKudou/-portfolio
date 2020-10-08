<?php

namespace App\Http\Controllers\API;

use App\Services\Message;

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

class LineController extends Controller
{
    public function webhook (Request $request)
    {
        $httpClient = new CurlHTTPClient(env('LINE_ACCESS_TOKEN'));
        $lineBot = new LINEBot($httpClient, ['channelSecret' => env('LINE_CHANNEL_SECRET')]);

        $signature = $request->header('x-line-signature');

        if (!$lineBot->validateSignature($request->getContent(), $signature)) {
            abort(400, 'Invalid signature');
        }

        $events = $lineBot->parseEventRequest($request->getContent(), $signature);

        foreach ($events as $event) {
            //テキスト用
            if($request->events[0]['message']['type'] == "text"){
                // $message = new Message();
                // $replyToken = $event->getReplyToken();
                // $askAge = $message->askAge();
                // $askAgeBuilder = new RawMessageBuilder($askAge);
                // $lineBot->replyMessage($replyToken, $askAgeBuilder);
            }

            //画像用
            if($request->events[0]['message']['type'] == "image"){
                $replyToken = $event->getReplyToken();
                $messageId = $request->events[0]['message']['id'];

                // 画像データをバイナリデータとして取得
                $response = $lineBot->getMessageContent($messageId);
                if ($response->isSucceeded()) {
                    $tempfile = tmpfile();
                    fwrite($tempfile, $response->getRawBody());

                    // APIキー
                    $api_key = 'AIzaSyC29ZN7P_dc0xkZkuUNvKJkB37CorSZCEI';

                    // 画像へのパス
                    $image_path = asset('storage/image/pic.jpeg');

                    // リクエスト用のJSONを作成
                    $json = json_encode( array(
                        "requests" => array(
                            array(
                                "image" => array(
                                    "content" => base64_encode( $response->getRawBody() ) ,
                                ) ,
                                "features" => array(
                                    //カテゴリの検出
                                    array(
                                        "type" => "LABEL_DETECTION" ,
                                        "maxResults" => 10 ,
                                    ) ,
                                    //顔検出
                                    array(
                                        "type" => "FACE_DETECTION" ,
                                        "maxResults" => 1 ,
                                    ) ,
                                ) ,
                            ) ,
                        ) ,
                    ) ) ;

                    // リクエストを実行
                    $curl = curl_init() ;
                    curl_setopt( $curl, CURLOPT_URL, "https://vision.googleapis.com/v1/images:annotate?key=" . $api_key ) ;
                    curl_setopt( $curl, CURLOPT_HEADER, true ) ;
                    curl_setopt( $curl, CURLOPT_CUSTOMREQUEST, "POST" ) ;
                    curl_setopt( $curl, CURLOPT_HTTPHEADER, array( "Content-Type: application/json" ) ) ;
                    curl_setopt( $curl, CURLOPT_SSL_VERIFYPEER, false ) ;
                    curl_setopt( $curl, CURLOPT_RETURNTRANSFER, true ) ;
                    if( isset($referer) && !empty($referer) ) curl_setopt( $curl, CURLOPT_REFERER, $referer ) ;
                    curl_setopt( $curl, CURLOPT_TIMEOUT, 12 ) ;
                    curl_setopt( $curl, CURLOPT_POSTFIELDS, $json ) ;
                    $res1 = curl_exec( $curl ) ;
                    $res2 = curl_getinfo( $curl ) ;
                    curl_close( $curl ) ;

                    // 取得したデータ
                    $json = substr( $res1, $res2["header_size"] ) ;				// 取得したJSON
                    $header = substr( $res1, 0, $res2["header_size"] ) ;		// レスポンスヘッダー

                    $result = json_decode( $json, true );
                    // Log::debug($result);

                    //顔スコア処理
                    if(isset($result['responses'][0]['faceAnnotations'])){
                        $facialExpression = $result['responses'][0]['faceAnnotations'][0];

                        $face_score = [];
                        foreach ($facialExpression as $key => $value) {
                            if ($facialExpression[$key] == 'UNKNOWN'){
                                $face_score[$key] = 0;
                            }else if ($facialExpression[$key] == 'VERY_UNLIKELY'){
                                $face_score[$key] = 2;
                            }else if ($facialExpression[$key] == 'UNLIKELY'){
                                $face_score[$key] = 4;
                            }else if ($facialExpression[$key] == 'POSSIBLE'){
                                $face_score[$key] = 6;
                            }else if ($facialExpression[$key] == 'LIKELY'){
                                $face_score[$key] = 8;
                            }else if ($facialExpression[$key] == 'VERY_LIKELY'){
                                $face_score[$key] = 10;
                            }
                        }
                    }

                    $labelAnnotations = $result['responses'][0]['labelAnnotations'];
                    $label_keyFirst = array_key_first($labelAnnotations);
                    $face_keyFirst = array_key_first($face_score);

                    foreach ($labelAnnotations as $key => $value) {
                        if ($key === $label_keyFirst) {
                            $contents[] = [
                                'type' => "text",
                                'text' => "■カテゴリ検出"
                            ];
                        }
                        $no = $key+1;
                        $contents[] = [
                            'type' => "text",
                            'text' => "カテゴリ". $no .": " . $result['responses'][0]['labelAnnotations'][$key]['description']
                        ];
                    }

                    foreach ($face_score as $key => $value) {
                        if ($key === $face_keyFirst) {
                            $contents[] = [
                                'type' => "text",
                                'text' => "■顔面スコア検出"
                            ];
                        }
                        $contents[] = [
                            'type' => "text",
                            'text' => $key .": " . $value
                        ];
                    }

                    $array = [
                        "type" => "flex",
                        "altText" => "this is a flex message",
                        "contents" => [
                            "type" => "bubble",
                            "body" => [
                                "type" => "box",
                                "layout" => "vertical",
                                "contents" => $contents,
                            ]
                        ]
                    ];

                    $askAgeBuilder = new RawMessageBuilder($array);
                    $lineBot->replyMessage($replyToken, $askAgeBuilder);


                } else {
                    Log::error($response->getHTTPStatus() . ' ' . $response->getRawBody());
                }
            }


        }
    }
}
