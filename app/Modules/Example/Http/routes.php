<?php

Route::group(['prefix'=>'crm','namespace' => 'Modules\Example\Http\Controllers'], function () {
    Route::get('/', 'ExampleController@index');
});
