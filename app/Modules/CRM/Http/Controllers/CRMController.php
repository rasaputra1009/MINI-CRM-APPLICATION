<?php namespace Modules\CRM\Http\Controllers;

use App\Publisher;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use CRM;
use Response;

class CRMController extends Controller {
	function login(Request $request)
    {
        return CRM::login($request->all());
    }
	function logout()
    {
        return CRM::logout();
    }
	public function index()
	{
		
		return view('Crm::index');
	}
	public function read()
	{
		return CRM::readPublishers();
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