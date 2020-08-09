<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use AmazonProduct; // 追加

class AmazonController extends Controller
{
    public function index(){
        $response = AmazonProduct::search('All', 'amazon' , 1);
        return $response;
    }
}
