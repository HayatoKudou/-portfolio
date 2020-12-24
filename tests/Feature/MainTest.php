<?php

namespace Tests\Feature;

use App\Http\Controllers\MainController;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;
use Illuminate\Http\Request;
use App\Content;
use App\Analysis;
use App\Notice;
use GuzzleHttp\Client;
use Log;

class MainTest extends TestCase
{
    // use WithoutMiddleware;  //csrf無効化
    
    //validate用データ
    public function exampleEmailSendMailData(){
        return [
           'vali_ok' => ['kudoh115@gmail.com', 'test_content', 200, null, null],
           'vali_required' => ['', 'test_content', 302, 'email', 'メールアドレスは必須です。'],
           'vali_max' => [str_repeat('a', 256).'@gmail.com', 'test_content', 302, 'email', 'メールアドレスは255文字以下で指定してください。'],
           'vali_email' => ['test_email', 'test_content', 302, 'email', 'メールアドレスには有効なメールアドレスを指定してください。'],
        ];
    }

    /**
    * @dataProvider exampleEmailSendMailData
    */
    public function testExample($email, $content, $status_code = null, $session_type = null, $session_message = null){
        $main_con = new MainController;
        
        //メンテナンス画面でエラーが返されるか
        $this->get('/maintenance')->assertStatus(302)->assertSessionHas('errors');
        
        //閲覧カウントがされているか
        $before_latestData = Analysis::where('url', 'http://localhost/home_top')->first();              
            
        $this->get('/home_top')
            ->assertStatus(200)
            ->assertSessionHasNoErrors()
            ->assertViewHas('result')
            ->assertViewHas('notice_data');

        //Twitterデータの配列数 
        $twitter_data = $main_con->getTwitterData();
        $this->assertCount(6, $twitter_data);

        $after_latestData = Analysis::where('url', 'http://localhost/home_top')->first();
        //カウントがされているか
        $this->assertEquals($before_latestData->count+1, $after_latestData->count);

        //お問い合わせ(バリデーション/ メール)
        if(is_null($session_type)){
            $this->post('/', ['email' => $email, 'content' => $content])
                ->assertStatus(200)
                ->assertStatus($status_code)
                ->assertSessionHasNoErrors();
        } else {
            $this->post('/', ['email' => $email, 'content' => $content])
                ->assertStatus(302)
                ->assertStatus($status_code)
                ->assertSessionHasErrors($session_type, $session_message);
        }

        //Qiita APi
        \DB::table('notice')->delete();  //DB初期化

        $main_con->getQiitaData(); //実行

        $token = 'e5f492aedaf7d3d94d1e8088a05471c8c2504ef4';
        $client = new Client;
        $result = $client->request('GET', 'https://qiita.com/api/v2/authenticated_user/items?page=1&per_page=10', [
            'headers' => [
                'Authorization' => 'Bearer '.$token,
                'Accept' => 'application/json',
            ],
        ]);
        $response_body = (string) $result->getBody();
        $decode_res = json_decode($response_body);
        foreach ($decode_res as $data) {
            $qiita_data_list[] = [
                'date' => date( "Y-m-d", strtotime($data->created_at)),
                'notice_content' => $data->title,
                'url' => $data->url,
            ];                        
        }        
        //DBに追加されているかテスト
        foreach($qiita_data_list as $data){
            $this->assertDatabaseHas('notice', $data);
        }        
    }
}
