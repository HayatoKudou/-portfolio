<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Log;

class Analysis extends Model
{
    protected $table = 'analysis';
    protected $primaryKey = 'id';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $fillable = [
        'url', 'count', 'date'
    ];

    //アクセスカウント
    public static function count($url){        
        $today = date('Ymd');
        $double_check = Analysis::where('date', $today)->where('url', $url)->exists();
        if($double_check){
            // $analysis_model = Analysis::where('date', $today)->where('url', $url)->increment('count',1);
            $analysis_model = Analysis::where('date', $today)->where('url', $url)->first();
            $analysis_model->fill([
                'url' => $url,
                'date' => $today,
                'count' => $analysis_model->count + 1,
            ]);
            $analysis_model->save();
        } else {
            $analysis_model = new Analysis;
            $analysis_model->fill([
                'url' => $url,
                'date' => $today,
                'count' => 1,
            ]);
            $analysis_model->save();
        }
        return;
    }

    //本日のアクセス数取得
    public static function getTodayAccessCount(){
        $today = date('Ymd');
        $access_data = self::where('date', $today)->get();
        return $access_data;
    }

    //全アクセス合計
    public static function getAllAccessCount(){
        $access_data = self::sum('count');
        return $access_data;
    }
}
