<?php

namespace App\Http\Controllers\tools;

use App\Analysis;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CalculatorController extends Controller
{
    public function top(){
        $url = url()->current();
        Analysis::count($url);
        return view('tools.calculator.top');
    }
}
