<?php

Route::group(['prefix' => 'test', 'namespace' => 'Modules\Test\Http\Controllers'], function()
{
	Route::get('/', 'TestController@index');
});