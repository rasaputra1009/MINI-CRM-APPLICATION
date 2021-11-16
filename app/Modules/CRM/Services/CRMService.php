<?php namespace Modules\CRM\Services;

use Modules\CRM\Repository\CRMRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Request;
use App\Publisher;
use App\User;
use Cookie;

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
        $email=$payload['email'];
        $password=$payload['password'];
        if (Auth::attempt(['email'=>$email,'password'=>$password])) 
        {
            $userInfo = User::where('email', '=',$email)->first();
            $role=$userInfo['userrole'];
            $user=$userInfo['username'];
            \Session::put(['email'=>$email,'user'=>$user,'userrole'=>$role]);
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
    public function readUserInfo()
    {   
        $check=session()->all();
        $user=$check['user'];
        $userInfo = User::where('username', '=',$user)->first();
        return response()->json([
            $data =[
                "username"=>$userInfo['username'],
                "userrole"=>$userInfo['userrole'],
            ]
        ]);
    }
    public function readUsers()
    {   
        $users=User::all()->pluck('username');
		return response()->json([
            $data=[
                "Users"=>$users
            ]
        ]);
    }
    public function searchPublishers($filter,$search)
    {
        $check=session()->all();
        $user=$check['user'];
        $userInfo = User::where('username', '=',$user)->first();
        $role=$userInfo['userrole'];
        if($role==='account')
        {
            $dataAll=Publisher::where('assigned_to','=',$userInfo['username'])->
                                where($filter,'like','%'.$search.'%')->orderBy('name')->get();
            // dd($dataAll);
            return $dataAll;
        }
        else{
            $data=Publisher::where($filter,'like','%'.$search.'%')->orderBy('name')->get();
            return $data;
        }
    }
    public function readPublisher($id)
    {   
        $data = Publisher::where('id', '=',$id)->get();
		return $data;
    }
    public function updatepublisher($payload,$id)
    {   
    
        $check=session()->all();
        $user=$check['user'];
        $data=Publisher::find($id);
        $data->name=$payload['name'];
        $data->email=$payload['email'];
        $data->phone=$payload['phone'];
        $data->website=$payload['website'];
        $data->assigned_to=$payload['assigned_to'];
        $data->save();
        // $data->update($payload);
        return "Updated";
    //    if(data['assigned_to']===$user)
    //    {
    //           $data=Publisher::find($id);
    //         $data->name=$payload['name'];
    //         $data->email=$payload['email'];
    //         $data->phone=$payload['phone'];
    //         $data->website=$payload['website'];
    //         $data->assigned_to=$payload['assigned_to'];
    //         $data->save();
	// 	    return "Updated Successfully";
    //    }
    //    else{
    //     return Response::json([
    //         'message'=>"Access Denied"
    //     ], 403);
    //    }
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