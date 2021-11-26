<?php


Route::group(['prefix' => 'crm', 'namespace' => 'Modules\CRM\Http\Controllers'], function () {
    Route::post('/login', 'AuthController@login');
    Route::post('/logout', 'AuthController@logout');
    Route::get('/{path?}', 'UserController@index')->where('path', '.*');
});
Route::group(['prefix' => 'url', 'namespace' => 'Modules\CRM\Http\Controllers', 'middleware' => 'customAuth'], function () {
    Route::get('/users', 'UserController@readAll'); //read all users /api/crm/users
});

Route::group(['prefix' => '/api/crm', 'namespace' => 'Modules\CRM\Http\Controllers', 'middleware' => 'customAuth'], function () {
    Route::get('publisher/{path?}', 'PublisherController@readInfo'); //read specific publisher details
    Route::get('publishers', 'PublisherController@search'); // search publishers
    Route::post('/publisher', 'PublisherController@create'); // create publisher
    Route::delete('publisher/{path?}', 'PublisherController@delete');
    Route::put('/publisher/{path?}', 'PublisherController@update');
});
    