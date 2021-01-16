<?php

namespace App\Http\Middleware;

use Closure;
use App\Analysis;

class AccessCount
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->ip() != '219.102.198.3' ){
            $url = url()->current();
            Analysis::count($url);
        }
        return $next($request);
    }
}
