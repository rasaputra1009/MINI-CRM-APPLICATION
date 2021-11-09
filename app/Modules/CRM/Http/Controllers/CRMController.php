<?php namespace Modules\Crm\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\View;
use Response;

class CRMController extends Controller {

	public function index()
	{
		return view('Crm::index');
	}
	
}