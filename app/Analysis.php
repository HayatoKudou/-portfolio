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

    public static function count($url){
        $today = date('Ymd');
        $double_check = Analysis::where('date', $today)->where('url', $url)->exists();
        if($double_check){
            $analysis_model = Analysis::where('date', $today)->where('url', $url)->increment('count',1);
        } else {
            $analysis_model = new Analysis;
            $analysis_model->fill([
                'url' => $url,
                'date' => $today,
            ]);
            $analysis_model->save();
        }
        return;
    }
}
