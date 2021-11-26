<?php namespace Modules\CRM\Http\Controllers;

use App\Publisher;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\CRM\Facades\PublisherFacade;

class PublisherController extends Controller
{
    public function validateRequest($request)
    {
        $error = $request->validate([
            'name' => 'bail|required|max:255',
            'email' => 'bail|required|email',
            'phone' => 'bail|required|digits:10|numeric',
            'website' => 'bail|required|url',
            'assignedTo' => 'bail|required|max:255',
        ]);
    }
    public function create(Request $request)
    {
        $this->validateRequest($request);
        return PublisherFacade::createPublisher($request->all());
    }
    public function readInfo($id)
    {
        return PublisherFacade::readPublisher($id);
    }
    public function update(Request $request, $id)
    {
        $this->validateRequest($request);
        return PublisherFacade::updatepublisher($request->all(), $id);
    }
    public function delete($id)
    {
        return PublisherFacade::deletePublisher($id);
    }
    public function search(Request $request)
    {
        $res = $request->all();
        $filter = array_keys($res);
        $search = array_values($res);
        return PublisherFacade::searchPublishers($filter[0], $search[0], $search[1]);
    }
}
