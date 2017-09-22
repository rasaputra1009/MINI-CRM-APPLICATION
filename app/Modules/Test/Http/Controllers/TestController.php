<?php namespace Modules\Test\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\View;
use Response;

class TestController extends Controller {

	public function index()
	{
		return view('Test::index');
	}
	
}