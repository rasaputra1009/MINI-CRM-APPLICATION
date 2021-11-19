<?php namespace Modules\CRM\Http\Controllers;

use App\Publisher;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use CRM;
use Exception;
use Response;
Class CRMController extends Controller {
	public function index()
	{	
		return view('Crm::index');
	}
	function login(Request $request)
    {
			$error=$request->validate([
				'username' => 'required',
				'password'=>'required',
			]);
		return CRM::login($request->all());
    }
	function logout()
    {
        return CRM::logout();
    }
	public function read()
	{
		$check= session()->all();
        if(!array_key_exists('user',$check))
        {
			return redirect('/crm/login');
		}
		else{
			return CRM::readUserInfo();
		}
	}
	public function readAll()
	{
		$check= session()->all();
		return CRM::readUsers();
	}
	public function search(Request $request)
	{
			$res=$request->all();
			$filter= array_keys( $res);
			$search=array_values($res);
			return CRM::searchPublishers($filter[0],$search[0],$search[1]);
	}
	public function create(Request $request)
	{
		$error=$request->validate([
			'name' => 'bail|required|max:255',
			'email' => 'bail|required|email',
			'phone' => 'bail|required|digits:10|numeric',
			'website' => 'bail|required|url',
			'assigned_to' => 'bail|required|max:255',
		]);
			return CRM::createPublisher($request->all());
	}
	public function readInfo($id)
	{
		return CRM::readPublisher($id);
	}
	public function update(Request $request,$id)
	{
		$request->validate([
			'name' => 'bail|required|max:255',
			'email' => 'bail|required|email',
			'phone' => 'bail|required|digits:10|numeric',
			'website' => 'bail|required|url',
			'assigned_to' => 'bail|required|max:255',
		]);
		return CRM::updatepublisher($request->all(),$id);
	}
	public function delete($id)
	{
		return CRM::deletePublisher($id);
	}
}
?>