<?php namespace Modules\CRM\Services;

use Modules\CRM\Repository\CRMRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\HttpFoundation\Request;
use App\Publisher;
use App\User;
use Cookie;
use Exception;
use Response;

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
        $password=$payload['password'];
        $userInfo = User::where('username', '=',$user)->first();
        $email=$userInfo['email'];
        if (Auth::attempt(['email'=>$email,'password'=>$password])) 
        {
            $role=$userInfo['userrole'];
            \Session::put(['email'=>$email,'user'=>$user,'userrole'=>$role]);
            \Session::save();
            setcookie("userrole", $role);
            setcookie("username",$user);
            return redirect('/crm/home');
        }
        else{
            return Response::json(['message'=>"Login Failed"], 401);
        }
    }
    function logout()
    {
        \Session::flush();
        setcookie("userrole","",time()-3600);
        setcookie("username","",time()-3600);
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
        $check=session()->all();
        if(array_key_exists('user',$check))
        {
            $users=User::all()->pluck('username');
            return response()->json([
                $data=[
                    "Users"=>$users
                ]
            ]);   
        }
        else{
            return Response::json(['message'=>"Access Denied"], 403);
        }
    }
    public function searchPublishers($filter,$search,$assigned)
    {
        $check=session()->all();
        $user=$check['user'];
        $userInfo = User::where('username', '=',$user)->first();
        $role=$userInfo['userrole'];
        if($role==='account')
        {
            $dataAll=Publisher::where('assigned_to','=',$userInfo['username'])->
                                where($filter,'like','%'.$search.'%')->orderBy('name')->get();
            return $dataAll;
        }
        else{
            if($assigned==='Select User') $assigned='';
            $data=Publisher::where('assigned_to','like','%'.$assigned.'%')->where($filter,'like','%'.$search.'%')->orderBy('name')->get();
            return $data;
        }
    }
    public function readPublisher($id)
    {   
        
        $data=Publisher::find($id);
        if($data===null)
        {
            return Response::json(['message'=>"Publisher Details Not Found"], 404);   
        }
        else{
            $check=session()->all();
            $user=$check['user'];
            $userrole=$check['userrole'];
            $data=Publisher::find($id);
            if($userrole==='admin')
            {
                $detail=Publisher::where('id','=',$id)->get();
                return $detail;
            }
            else if(($userrole==='salesrep' || $userrole==='account')&&($data['assigned_to']===$user))
            {
                $detail=Publisher::where('id','=',$id)->get();
                return $detail;
            }
            else{
                return Response::json(['message'=>"Access Denied"], 404);   	
            }
        }
    }
    public function updatepublisher($payload,$id)
    {   
    
        $check=session()->all();
        $user=$check['user'];
        $userrole=$check['userrole'];
        $data=Publisher::find($id);
        if($userrole==='admin')
        {
            try{
                $data->update($payload);
                return "Updated Successfully";
            }
            catch(Exception $e)
            {
                return Response::json(['message'=>"Access Denied"], 403);
            }
        }
       else if(($userrole==='salesrep' || $userrole==='account')&&($data['assigned_to']===$user))
       {
            try{
                $data->update($payload);
                return "Updated Successfully";
            }
            catch(Exception $e)
            {
                return Response::json(['message'=>"Access Denied"], 403);
            }
       }
       else{
            return Response::json(['message'=>"Access Denied"], 403);
       }
    }
    public function deletepublisher($id)
    {
        $check=session()->all();
        $user=$check['user'];
        $userrole=$check['userrole'];
        if($userrole==='admin')
        {
            $publisher = Publisher::find($id);
            $publisher->delete();
            return "Deleeted";
        }
        else{
            return Response::json(['message'=>"Access Denied"], 403);
        }
    }
    public function createPublisher($payload)
    {
        $check=session()->all();
        $user=$check['user'];
        $userrole=$check['userrole'];
        if($userrole==='admin')
        {
                $data= Publisher::create($payload);
                return response()->json([
                    "message" => "Data Added Successfully",
                    "data" => $data
                ]);
        }
        else{
            return Response::json(['message'=>"Access Denied"], 403);   
        }
        // return redirect()->intended('/crm/home');
    }
}