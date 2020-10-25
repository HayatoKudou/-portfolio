<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Log;

class AnimeController extends Controller
{
    public function top(){
        return view('tools.anime.top');
    }

    public function anime_search(Request $request){
        Log::debug($request);
        $client = new Client;
        $season_type = $request->season_type;
        if($season_type == 3){
            $month = date('m');
            $year = date('Y');
            if($month == '01' || '02' || '03'){
                $konki = 1;
            } elseif($month == '04' || '05' || '06'){
                $konki = 2;
            } elseif($month == '07' || '08' || '09'){
                $konki = 3;
            } elseif($month == '10' || '11' || '12'){
                $konki = 4;
            }
            $response = $client->request('GET', 'http://api.moemoe.tokyo/anime/v1/master/'.$year.'/'.$konki);
        } else {
            if($season_type == 2){
                Log::debug($request->season_date_from);
                Log::debug($request->season_date_to);
            } elseif($season_type == 1){

            }
        }
        $json = $response->getBody()->getContents();
        $result = json_decode($json,true);
        // Log::debug($result);
        return $result;
    }
}
