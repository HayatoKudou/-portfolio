<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// dd(app());
Auth::routes();

// Route::get('/', 'MainController@main');
Route::get('/', 'MainController@home_top');
Route::get('/top', 'MainController@main')->name('main');
Route::post('/', 'MainController@send_mail')->name('send_mail');
Route::get('/maintenance', 'MainController@maintenance')->name('maintenance');
Route::get('/home_top', 'MainController@home_top')->name('blog');
Route::get('/portfolio', 'MainController@main')->name('blog');


Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function() {
    Route::get('/', 'Admin\AdminMainController@home_top')->name('blog');
    Route::get('/notice_post', 'Admin\AdminMainController@show_notice_post')->name('notice_post');
    Route::post('/', 'Admin\AdminMainController@register_notice_post')->name('notice_post');
    Route::post('/notice_delete', 'Admin\AdminMainController@notice_delete')->name('notice_delete');
});

Route::group(['prefix' => 'tools'], function() {
    Route::get('/calculator', 'tools\CalculatorController@top');
    Route::get('/anime', 'tools\AnimeController@top');
    Route::post('/anime_search', 'tools\AnimeController@anime_search');
    Route::post('/showDetail', 'tools\AnimeController@anime_detail');
    Route::get('/css_generate', 'tools\ProgramGenerateController@css_generate');
    Route::get('/php_stringCut_generate', 'tools\ProgramGenerateController@php_stringCut_generate');
});

Route::get('/image_analysis', 'image_analysis@chooce_image')->name('image_analysis');

// Route::post('api/line/webhook', 'Line\LineController@webhook')->name('line.webhook');


// Route::get('/amazon', 'AmazonController@getApiData')->name('amazon');
