<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ToolsController extends Controller
{
    public function calculator(){
        return view('tools.calculator.top');
    }

    public function garbled(){
        return view('tools.garbled.top');
    }
}
