<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class image_analysis extends Controller
{
    public function chooce_image(){
        return view('image_analysis.chooce_image');
    }
}
