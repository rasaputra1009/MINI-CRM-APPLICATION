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
	Route::get('/publisher','CRMController@read');
	Route::post('/publisher','CRMController@create');
	// Route::post('/login','CRMController@login');
});