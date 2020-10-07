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
            //テキスト入力用
            // if (!($event instanceof TextMessage)) {
            //     Log::debug('Non text message has come');
            //     continue;
            // }

            if($request->events[0]['message']['type'] == "image"){
                $messageId = $request->events[0]['message']['id'];
                Log::debug($messageId);

                // 取得した画像データを保存
                $response = $lineBot->getMessageContent($messageId);
                if ($response->isSucceeded()) {
                    $tempfile = tmpfile();
                    fwrite($tempfile, $response->getRawBody());

                    Log::debug($tempfile);
                    $tempfile->store('public');
                    // $user->image = str_replace('public/', '', $filePath);
                    // $imgPath = "images/" . $messageEvent["message"]["id"] . ".jpg";

                } else {
                    Log::error($response->getHTTPStatus() . ' ' . $response->getRawBody());
                }
            }

            // if($request->events[0]['message']['text'] == "誕生日"){
            // }

            $message = new Message();
            $replyToken = $event->getReplyToken();
            $askAge = $message->askAge();
            $askAgeBuilder = new RawMessageBuilder($askAge);
            $lineBot->replyMessage($replyToken, $askAgeBuilder);
        }
    }
}
