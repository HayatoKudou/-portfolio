<?php

namespace App\Http\Controllers\tools;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProgramGenerateController extends Controller
{
    public function css_generate(){
        return view('tools.program_generate.css_generate');
    }

    public function php_stringCut_generate(){
        return view('tools.program_generate.css_generate');
    }
}
