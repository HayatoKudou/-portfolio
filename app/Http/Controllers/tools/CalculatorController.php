<?php

namespace App\Http\Controllers\tools;

<<<<<<< HEAD
=======
use App\Analysis;
>>>>>>> 268199755ba928f642311aae00a1914748783c93
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CalculatorController extends Controller
{
    public function top(){
<<<<<<< HEAD
=======
        $url = url()->current();
        Analysis::count($url);
>>>>>>> 268199755ba928f642311aae00a1914748783c93
        return view('tools.calculator.top');
    }
}
