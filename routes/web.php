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
Auth::routes();

Route::get('/', 'MainController@main');
Route::get('/top', 'MainController@main')->name('main');
Route::post('/', 'MainController@send_mail')->name('send_mail');
Route::get('/maintenance', 'MainController@maintenance')->name('maintenance');
Route::get('/blog_top', 'MainController@blog_top')->name('blog');


Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function() {
    Route::get('/', 'Admin\AdminMainController@blog_top')->name('blog');
    Route::get('/notice_post', 'Admin\AdminMainController@show_notice_post')->name('notice_post');
    Route::post('/', 'Admin\AdminMainController@register_notice_post')->name('notice_post');
    Route::post('/notice_delete', 'Admin\AdminMainController@notice_delete')->name('notice_delete');
});

Route::group(['prefix' => 'aim_training'], function() {
    Route::get('/', 'AimTraninigController@top');
});


// Route::get('/amazon', 'AmazonController@getApiData')->name('amazon');
