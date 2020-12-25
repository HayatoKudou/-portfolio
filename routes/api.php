<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::group(['namespace' => 'Api'], function() {
//     // LineからのWebhookを受信
//     Route::post('/line/webhook', 'LineController@webhook')->name('line.webhook');
// });
Route::post('/line/webhook', 'Line\LineController@webhook')->name('line.webhook');

Route::resource('search', 'AmazonController');

Route::get('api_endPoint', 'tools\ProgramGenerateController@get_api_endPoint');
Route::post('api_endPoint', 'tools\ProgramGenerateController@post_api_endPoint');
