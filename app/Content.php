<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Log;
use Illuminate\Support\Facades\Validator;

class Content extends Model
{
    protected $table = 'content';
    protected $primaryKey = 'id';
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    protected $fillable = [
        'email',
        'content',
    ];

    public function validator($request){
        $rules = [
            'email' => 'required|max:255|email',
            'content' => 'required|max:255',
        ];
    $validator = Validator::make($request, $rules);
    return $validator;
}

}
