<?php

use Modules\CRM\Http\Controllers\CRMController;

Route::group(['prefix' => 'crm', 'namespace' => 'Modules\CRM\Http\Controllers'], function()
{
	Route::post('/login','CRMController@login');
	Route::post('/logout','CRMController@logout');
	Route::get('/{path?}', 'CRMController@index')->where('path', '.*');
	
});
Route::group(['prefix' => '/api/crm', 'namespace' => 'Modules\CRM\Http\Controllers'], function()
{
	Route::get('/publishers','CRMController@read');
	Route::get('publisher/{path?}','CRMController@readInfo');
	Route::post('/publisher','CRMController@create');
	Route::delete('/publisher/{path?}','CRMController@delete');
	Route::put('/publisher/{path?}','CRMController@update');
});