<?php

namespace App\Http\Controllers\tools;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Log;
use \Illuminate\Support\Facades\Http;

class AnimeController extends Controller
{
    public function top(){
        return view('tools.anime.top');
    }

    public function anime_search(Request $request){
        Log::debug($request);
        $client = new Client;
        $season_type = $request->season_type;
        // $token = env('ANICT_API');
        $token = \Config::get('token.ANICT_API');

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

            $url = 'https://api.annict.com/v1/works?filter_season='.$year.'-'.$konki;
            if($request->title != NULL){
                $url = $url.'&filter_title='.$request->title;
            }
            $response = Http::withToken($token)->get($url);

        //シーズン指定
        } elseif($season_type == 2) {
            Log::debug($request);
            if($request->season_year == NULL || $request->season_month == NULL){
                //エラー処理
            }
            $filter_season_url = '?filter_season='.$request->season_year.'-'.$request->season_month;
            $url = 'https://api.annict.com/v1/works'.$filter_season_url;
            //タイトルが存在した場合
            if($request->title != NULL){
                $url = $url.'?filter_title='.$request->title;
            }
            Log::debug($url);
            $response = Http::withToken($token)->get($url);

        //全期間
        } elseif($season_type == 1){
            $url = 'https://api.annict.com/v1/works';
            if($request->title != NULL){
                $url = $url.'?filter_title='.$request->title;
            }
            $response = Http::withToken($token)->get($url);
        }

        $json = $response->getBody()->getContents();
        $result = json_decode($json,true);
        return $result;
    }
}
