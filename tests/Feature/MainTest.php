<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\Request;
use App\Content;
use App\Http\Controllers\MainController;
use Log;

class MainTest extends TestCase
{
    //validate用
    public function exampleEmailSendMailData(){
        return [
            'vali_ok' => ['email', 'kudoh115@gmail.com', true],
            'vali_required' => ['email', '', false],
            'vali_max' => ['email', str_repeat('a', 256), false],
            'vali_email' => ['email', 'test', false],
        ];
    }

    /**
     * @dataProvider exampleEmailSendMailData
     * @dataProvider insertData
     */
    public function test_SendMail($item, $data, $expect = null)
    {
        $dataList = [$item => $data];
        $content = new Content;              
        $dataList = [$item => $data];

        $content_model = new Content;
        $content_model->fill([
            'email' => 'kudoh115@gmail.com',
            'content' => 'test_content',
        ]);
        $content_model->save();

        $this->assertDatabaseHas('content', [
            'email' => 'kudoh115@gmail.com',
        ]);
        
        $validator = $content->validator($dataList);
        $result = $validator->passes();
        $this->assertEquals($expect, $result);
    }
}
