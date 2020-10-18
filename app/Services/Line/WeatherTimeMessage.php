<?php

namespace App\Services\Line;

class WeatherTimeMessage {

    public function askAge(): array {
        $templete = [
            'type' => 'text',
            'text' => '何時に通知すれば良いですか？',
            'quickReply' => [
                'items' => [
                    [
                        'type' => 'action',
                        'action' => [
                            'type' => 'message',
                            'label' => '6時',
                            'text' => '6時'
                        ],
                    ],
                    [
                        'type' => 'action',
                        'action' => [
                            'type' => 'message',
                            'label' => '7時',
                            'text' => '7時'
                        ],
                    ],
                    [
                        'type' => 'action',
                        'action' => [
                            'type' => 'message',
                            'label' => '8時',
                            'text' => '8時'
                        ],
                    ],
                    [
                        'type' => 'action',
                        'action' => [
                            'type' => 'message',
                            'label' => '9時',
                            'text' => '9時'
                        ],
                    ],
                ]
            ]
        ];
        return $templete;
    }
}
