<?php

namespace Tests\Feature;

use App\Http\Controllers\MainController;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Content;
use App\Analysis;
use Log;

class MainTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function testExample(){
        $main_con = new MainController;
        
        //Qiita
        $main_con->getQiitaData();
        
        //メンテナンス画面でエラーが返されるか（意味不明）
        $this->get('/maintenance')->assertStatus(302)->assertSessionHas('errors');

        //閲覧カウント
        $analysis_model = new Analysis;
        $analysis_model->fill([
            'url' => 'http://localhost/maintenance',
            'date' => date("Y-m-d"),
            'count' => 1,
        ]);
        $analysis_model->save();
        
        $before_latestData = Analysis::latest()->first();        
        $update_date = $main_con->main();
        $test_update_date = date( "Y-m-d", filemtime('resources/views/home'));
        $this->assertEquals($test_update_date, $update_date); //更新日の比較
        $after_latestData = Analysis::latest()->first();
        Log::debug($before_latestData);
        Log::debug($after_latestData);
        $this->assertEquals($before_latestData->count+1, $after_latestData->count); //更新日の比較
    }
}
