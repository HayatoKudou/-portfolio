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
        $url = url()->current();
        Analysis::count($url);
        return view('tools.anime.top');
    }

    public function anime_search(Request $request){
        Log::debug($request);
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
            if($request->search_form['season_year'] == NULL || $request->search_form['season_month'] == NULL){
                //エラー処理
            }
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
        $filter_ids = '?filter_work_id='.$request->id;
        $episodes_url = 'https://api.annict.com/v1/episodes/'.$filter_ids;
        // $staffs_url = 'https://api.annict.com/v1/staffs/'.$filter_ids;
        $episodes_response = Http::withToken($this->token)->get($episodes_url);
        $episodes_json = $episodes_response->getBody()->getContents();
        Log::debug($episodes_json);
        $result = json_decode($episodes_json,true);
        return $result;
    }

}
