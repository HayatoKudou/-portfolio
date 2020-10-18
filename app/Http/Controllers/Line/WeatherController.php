<?php

namespace App\Http\Controllers\Line;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WeatherController extends Controller
{
    public function weather($request, $lineBot, $replyToken){
        try {
            $api_type = "weather";
            $area_name = "tokyo";
            $Weather_data = $this->WeatherApi($api_type, $area_name);
            $templete = [
                "type" => "text",
                'text' =>
                "■".$Weather_data['name'] .
                "\n天気: ".$Weather_data['weather'][0]['description'] .
                "\n気温: ".$Weather_data['main']['temp']."°" .
                "\n最低気温: ".$Weather_data['main']['temp_min']."°" .
                "\n最高気温: ".$Weather_data['main']['temp_max']."°" .
                "\n湿度: ".$Weather_data['main']['humidity']."%" .
                "\n風速: ".$Weather_data['wind']['speed']."m/s" .
                "\n風向き: ".$Weather_data['wind']['deg'],
            ];

            return $templete;
        } catch (\Exception $e) {
            $templete = [
                'type' => 'text',
                'text' => "エラーが発生しました。ただいま解析しております、しばらくお待ちください。".$e->getMessage(),
            ];
            return $templete;
        }
    }

    public function WeatherApi($api_type, $area_name){
        $api_base = 'https://api.openweathermap.org/data/2.5/';
        $api_key = env('WEATHER_API_KEY');
        $api_parm = '?q='.$area_name.'&units=metric&lang=ja&appid='.$api_key;
        $api_url = $api_base . $api_type . $api_parm;
        return json_decode(file_get_contents($api_url), true);
    }
}
