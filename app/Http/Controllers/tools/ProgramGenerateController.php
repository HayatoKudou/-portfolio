<?php

namespace App\Http\Controllers\tools;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProgramGenerateController extends Controller
{
    public function programGenerate(){
        return view('tools.program_generate.programGenerate');
    }

    public function get_api_endPoint(){
        return response()->json(['status' => 'success']);
    }

    public function post_api_endPoint(){
        return 'sucess';
    }

    public function css_generate(){
        return view('tools.program_generate.css_generate');
    }

    public function js_generate(){
        return view('tools.program_generate.js_generate');
    }
}
