<?php namespace Modules\CRM\Http\Controllers;

use User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\CRM\Services\PublisherService;
use Modules\CRM\Services\UserService;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $error = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);
        return User::login($request->all());
    }
    public function logout()
    {
        return User::logout();
    }
}