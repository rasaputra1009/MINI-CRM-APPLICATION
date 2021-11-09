<?php

Route::group(['prefix' => 'crm', 'namespace' => 'Modules\CRM\Http\Controllers'], function()
{
	Route::get('/{path?}', 'CRMController@index')->where('path', '.*');
});