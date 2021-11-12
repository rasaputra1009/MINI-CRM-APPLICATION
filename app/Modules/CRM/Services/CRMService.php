<?php namespace Modules\CRM\Services;

use Modules\CRM\Repository\CRMRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Publisher;
use App\User;
use Illuminate\Support\Facades\Redirect;

class CRMService {
    private $repository = null;

    /**
     * @param CRMRepository|CRMRepository $CRMRepository
     */
    public function __construct(CRMRepository $CRMRepository)
    {
        $this->repository = $CRMRepository;
    }
    public function login($payload)
    {
        $user=$payload['username'];
        $email=$payload['email'];
        $password=$payload['password'];
        if (Auth::attempt(['email'=>$email,'password'=>$password])) 
        {
            \Session::put(['email'=>$email,'user'=>$user]);
            \Session::save();
            return redirect('/crm/home');
        }
        else{
            return response()->json(["message" => "Login Failed",],401);
        }
    }
    function logout()
    {
        \Session::flush();
        return redirect('/crm/login');
    }

    public function readPublishers()
    {   
        $check=session()->all();
        $user=$check['user'];
        $data = Publisher::where('assigned_to', '=',$user)->get();
		return $data;
    }
    public function createPublisher($payload)
    {
        $data= Publisher::create($payload);
        return response()->json([
            "message" => "Data Added Successfully",
            "data" => $data
        ]);
        // return redirect()->intended('/crm/home');
    }
}