<?php

Route::group(['namespace' => 'Modules\Example\Http\Controllers'], function () {
    Route::get('/', 'ExampleController@index');
});
