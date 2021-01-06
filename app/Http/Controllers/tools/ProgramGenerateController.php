<?php

namespace App\Http\Controllers\tools;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Analysis;
use Log;

class ProgramGenerateController extends Controller
{
    public function programGenerate(){
        $url = url()->current();
        Analysis::count($url);
        return view('tools.program_generate.programGenerate');
    }

    public function run_php(Request $request){
        $result = '';
        eval($request->run_code);
        return $result;
    }

    public function get_api_endPoint(){
        return response()->json(['status' => 'success']);
    }

    public function post_api_endPoint(){
        return response()->json(['status' => 'success']);
    }
}
