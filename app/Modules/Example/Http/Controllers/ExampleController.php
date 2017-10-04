<?php namespace Modules\Example\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\View;
use Response;

class ExampleController extends Controller {

	public function index()
	{
		return view('Example::index');
	}
	
}