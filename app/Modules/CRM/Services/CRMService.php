<?php namespace Modules\CRM\Services;

use Modules\CRM\Repository\CRMRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Publisher;
use App\User;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Request;

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
        $users=User::all()->pluck('username');
		return [$data,$users];
    }
    public function readPublisher($id)
    {   
        $data = Publisher::where('id', '=',$id)->get();
		return $data;
    }
    public function updatepublisher($payload,$id)
    {   
       $data=Publisher::find($id);
       $data->name=$payload['name'];
       $data->email=$payload['email'];
       $data->phone=$payload['phone'];
       $data->website=$payload['website'];
       $data->assigned_to=$payload['assigned_to'];
       $data->save();
		return "Updated Successfully";
    }
    public function deletepublisher($id)
    {
        $publisher = Publisher::find($id);
        $publisher->delete();
        return "Deleeted";
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