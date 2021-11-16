<?php

use Modules\CRM\Http\Controllers\CRMController;

Route::group(['prefix' => 'crm', 'namespace' => 'Modules\CRM\Http\Controllers'], function()
{
	Route::post('/login','CRMController@login');
	Route::post('/logout','CRMController@logout');
	Route::get('/{path?}', 'CRMController@index')->where('path', '.*');
});
Route::group(['prefix' => 'url', 'namespace' => 'Modules\CRM\Http\Controllers','middleware'=>'customAuth'], function()
{
	Route::get('/user','CRMController@read'); // read userinformation
	Route::get('/users','CRMController@readAll'); //read all users /api/crm/users
});

Route::group(['prefix' => '/api/crm', 'namespace' => 'Modules\CRM\Http\Controllers','middleware'=>'customAuth'], function()
{
	Route::get('publisher/{path?}','CRMController@readInfo'); //read specific publisher details
	Route::get('publishers','CRMController@search');// search publishers
	Route::post('/publisher','CRMController@create'); // create publisher
	Route::delete('publisher/{path?}','CRMController@delete');
	Route::put('/publisher/{path?}','CRMController@update');
});