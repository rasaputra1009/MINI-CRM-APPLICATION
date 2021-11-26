<?php namespace Modules\CRM\Services;

use App\User;
use Illuminate\Support\Facades\Auth;
use Response;

class UserService
{
    const ADMIN = "admin";
    const SALESREPRESENTATIVE = "salesrep";
    const ACCOUNTMANAGER = "account";
    public function cookieSet($role, $user)
    {
        setcookie("userrole", $role);
        setcookie("username", $user);
    }
    public function cookieDelete()
    {
        setcookie("userrole", "", time() - 3600);
        setcookie("username", "", time() - 3600);
    }
    public function sessionSet($email, $user, $role)
    {
        \Session::put(['email' => $email, 'user' => $user, 'userrole' => $role]);
        \Session::save();
    }
    public function sessionDelete()
    {
        \Session::flush();
    }
    public function sessionGet()
    {
        $sessiondata = session()->all();
        return $sessiondata;
    }
    public function userTable($user)
    {
        $userInfo = User::where('username', '=', $user)->first();
        return $userInfo;
    }
    public function login($payload)
    {
        $user = $payload['username'];
        $password = $payload['password'];

        $userInfo = $this->userTable($user);
        $email = $userInfo['email'];
        $role = $userInfo['userrole'];

        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            $this->sessionSet($email, $user, $role);
            $this->cookieSet($role, $user);
            return Response::json(['message' => "Login Succes"], 200);
        } else {
            return Response::json(['message' => "Login Failed"], 401);
        }
    }
    public function logout()
    {
        $this->sessionDelete();
        $this->cookieDelete();
    }
    public function readUsers()
    {
        $check = $this->sessionGet();
        if (array_key_exists('user', $check)) {
            $userInfo = $this->userTable($check['user']);
            $user=$userInfo['username'];
            $role = $userInfo['userrole'];    
            $users = User::all()->pluck('username');
            return Response::json(["users" => $users,"username"=>$user,"role"=>$role]);
        } else {
            return Response::json(['message' => "Access Denied"], 403);
        }
    }
}
