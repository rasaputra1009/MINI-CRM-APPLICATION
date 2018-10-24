<?php

namespace Modules\Test\Http\Controllers;

use Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\View;

class TestController extends Controller
{
    public function index()
    {
        return view('Test::index');
    }
}
