<?php

namespace Modules\Example\Http\Controllers;

use Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\View;

class ExampleController extends Controller
{
    public function index()
    {
        return view('Example::index');
    }
}
