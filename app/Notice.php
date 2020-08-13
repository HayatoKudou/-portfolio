<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Log;
use Illuminate\Support\Facades\Validator;

class Notice extends Model
{
    protected $table = 'notice';
    protected $primaryKey = 'id';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $fillable = [
        'date',
        'notice_content',
    ];

    public static function getNoticeData(){
        $all_data = Notice::orderBy('id', 'desc')->get();
        return $all_data;
    }

    public function validator($request){
        $rules = [
            'notice_date' => 'required|max:255',
            'notice_content' => 'required|max:255',
        ];
    $validator = Validator::make($request, $rules);
    return $validator;
}

}
