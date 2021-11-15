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
	Route::get('/publisher','CRMController@read'); // read users
	Route::get('publisher/{path?}','CRMController@readInfo'); //read specific user
	Route::get('publishers','CRMController@search');// search publishers
	Route::post('/publisher','CRMController@create'); // create publisher
	Route::delete('publisher/{path?}','CRMController@delete');
	Route::put('/publisher/{path?}','CRMController@update');
});