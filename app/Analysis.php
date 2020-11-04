<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
        $double_check = self::where('date', $today)->where('url', $url)->exists();
        if($double_check){
            $analysis_model = self::where('date', $today)->where('url', $url)->increment('count',1);
        } else {
            $analysis_model = new self;
            $analysis_model->fill([
                'url' => $url,
                'date' => $today,
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
