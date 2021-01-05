<?php

namespace App\Services\Line;

class Message {

    public function askAge(): array {
        $templete = [
            'type' => 'text',
            'text' => '私には会話をするプログラムが搭載されていませんが、以下のプログラムは搭載しています。',
            'quickReply' => [
                'items' => [
                    [
                        'type' => 'action',
                        'action' => [
                            'type' => 'message',
                            'label' => '天気',
                            'text' => '天気'
                        ],
                    ],
                    [
                        'type' => 'action',
                        'action' => [
                            'type' => 'message',
                            'label' => '退会',
                            'text' => '退会'
                        ],
                    ],
                ]
            ]
        ];
        return $templete;
    }
}
