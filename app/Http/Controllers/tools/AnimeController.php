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
    public function top(){
        $url = url()->current();
        Analysis::count($url);
        return view('tools.anime.top');
    }

    public function anime_search(Request $request){
        $client = new Client;
        $season_type = $request->season_type;
        $token = \Config::get('token.ANICT_API');
        Log::debug($request);

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
            if($request->season_year == NULL || $request->season_month == NULL){
                //エラー処理
            }
            $filter_season_url = '?filter_season='.$request->season_year.'-'.$request->season_month;
            $url = 'https://api.annict.com/v1/works/'.$filter_season_url;

        //全期間
        } elseif($season_type == 1){
            $url = 'https://api.annict.com/v1/works/';
        }

        //リリース日のソート
        if($request->sort_season == 'new_sort'){
            $url = $season_type == 1 ? $url.'?sort_season=desc' : $url.'&sort_season=desc';
        } else {
            $url = $season_type == 1 ? $url.'?sort_season=asc' : $url.'&sort_season=asc';
        }
        //タイトルが存在した場合
        if($request->title != NULL){
            $url = $url.'&filter_title='.$request->title;
        }
        $url = $url.'&per_page=20';
        Log::debug($url);

        $response = Http::withToken($token)->get($url);
        $json = $response->getBody()->getContents();
        $result = json_decode($json,true);
        return $result;
    }
}
