<?php namespace Modules\CRM\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use User;
class UserController extends Controller
{
    public function index()
    {
            $user=\Session::get('user');
            $userrole=\Session::get('userrole');
            return view('Crm::index')->with(['user'=>$user,'userrole'=>$userrole]);
    }
     public function readAll()
    {
        return User::readusers();
    }
}