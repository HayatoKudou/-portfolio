<?php

namespace App\Http\Controllers;

use App\Analysis;
use Illuminate\Http\Request;

class ToolsController extends Controller
{
    public function calculator(){
        $url = url()->current();
        Analysis::count($url);
        return view('tools.calculator.top');
    }
}
