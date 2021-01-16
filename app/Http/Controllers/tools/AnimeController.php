<?php

namespace App\Http\Controllers\tools;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Log;
use \Illuminate\Support\Facades\Http;
use App\Analysis;

class AnimeController extends Controller
{
    function __construct(){
        $this->token = \Config::get('token.ANICT_API');
    }

    public function top(){
        return view('tools.anime.top');
    }

    public function anime_search(Request $request){
        $client = new Client;
        $season_type = $request->search_form['season_type'];

        //今期
        if($season_type == 3){
            $month = date('n');
            $year = date('Y');

            if((3 <= $month) && ($month <= 5)) {
                $konki = 'spring';
            } elseif((6 <= $month) && ($month <= 8)) {
                $konki = 'summer';
            } elseif((9 <= $month) && ($month <= 11)) {
                $konki = 'autumn';
            } elseif($month == 12 || $month == 1 || $month == 2) {
                $konki = 'winter';
            }
            $url = 'https://api.annict.com/v1/works/?filter_season='.$year.'-'.$konki;

        //シーズン指定
        } elseif($season_type == 2) {
            $filter_season_url = '?filter_season='.$request->search_form['season_year'].'-'.$request->search_form['season_month'];
            $url = 'https://api.annict.com/v1/works/'.$filter_season_url;

        //全期間
        } elseif($season_type == 1){
            $url = 'https://api.annict.com/v1/works/';
        }

        //リリース日のソート
        if($request->search_form['sort_season'] == 'new_sort'){
            $url = $season_type == 1 ? $url.'?sort_season=desc' : $url.'&sort_season=desc';
        } else {
            $url = $season_type == 1 ? $url.'?sort_season=asc' : $url.'&sort_season=asc';
        }

        //タイトルが存在した場合
        if($request->search_form['title'] != NULL){
            $url = $url.'&filter_title='.$request->search_form['title'];
        }

        $page = $request->page;
        $url = $url.'&per_page=20&page='.$page;
        $response = Http::withToken($this->token)->get($url);
        $json = $response->getBody()->getContents();
        $result = json_decode($json,true);
        return $result;
    }

    //詳細画面用
    public function anime_detail(Request $request){
        $episodes_url = 'https://api.annict.com/v1/episodes/?sort_id=asc';
        $episodes_filter_ids = '&filter_work_id='.$request->id;
        $episodes_url = $episodes_url . $episodes_filter_ids;
        $episodes_response = Http::withToken($this->token)->get($episodes_url);        
        $episodes_json = $episodes_response->getBody()->getContents();        
        $episodes_result = json_decode($episodes_json,true);

        //キャスト情報取得
        $casts_url = 'https://api.annict.com/v1/casts/?sort_id=asc';
        $casts_filter_ids = '&filter_work_id='.$request->id;
        $casts_url = $casts_url . $casts_filter_ids;
        $casts_response = Http::withToken($this->token)->get($casts_url);        
        $casts_json = $casts_response->getBody()->getContents();        
        $casts_result = json_decode($casts_json,true);

        //スタッフ情報取得
        $staffs_url = 'https://api.annict.com/v1/staffs/?sort_id=asc&fields=name,role_text';
        $staffs_filter_ids = '&filter_work_id='.$request->id;
        $staffs_url = $staffs_url . $staffs_filter_ids;
        $staffs_response = Http::withToken($this->token)->get($staffs_url);        
        $staffs_json = $staffs_response->getBody()->getContents();        
        $staffs_result = json_decode($staffs_json,true);

        $result = array_merge ( $staffs_result, $casts_result, $episodes_result );

        return $result;
    }

}
