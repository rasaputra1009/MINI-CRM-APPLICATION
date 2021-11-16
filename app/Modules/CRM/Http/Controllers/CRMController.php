<?php namespace Modules\CRM\Http\Controllers;

use App\Publisher;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use CRM;
use Response;
class CRMController extends Controller {
	public function index()
	{	
		return view('Crm::index');
	}
	function login(Request $request)
    {
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
			if(count($res)>0)
			{
				$search=$res['search'];
				$filter=$res['filter'];
				return CRM::searchPublishers($filter,$search);	
			}
			else{
				return CRM::searchPublishers('');
			}
	}
	public function create(Request $request)
	{
		return CRM::createPublisher($request->all());
	}
	public function readInfo($username)
	{
		return CRM::readPublisher($username);
	}
	public function update(Request $request,$id)
	{
		return CRM::updatepublisher($request->all(),$id);
	}
	public function delete($id)
	{
		return CRM::deletePublisher($id);
	}
}
?>