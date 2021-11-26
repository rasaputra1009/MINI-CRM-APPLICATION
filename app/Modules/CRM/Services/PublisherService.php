<?php namespace Modules\CRM\Services;

use App\Publisher;
use App\User;
use Exception;
use Modules\CRM\Repository\CRMRepository;
use Response;

class PublisherService
{
    private $repository = null;
    /**
     * @param CRMRepository|CRMRepository $CRMRepository
     */
    public function __construct(CRMRepository $CRMRepository)
    {
        $this->repository = $CRMRepository;
    }
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
    public function publisherTable($id)
    {
        $data = Publisher::find($id);
        return $data;
    }
    public function publisherById($id)
    {
        $detail = Publisher::where('id', '=', $id)->get();
        return $detail;
    }
    public function checkAdmin($userrole)
    {
        return ($userrole == "admin");
    }
    public function checkAccount($role)
    {
        return ($role == "account");
    }
    public function checkSalesRep($userrole)
    {
        return ($userrole == "salesrep");
    }

    public function searchPublishers($filter, $search, $assigned)
    {
        $check = $this->sessionGet();
        $user = $check['user'];
        $userInfo = $this->userTable($user);
        $username = $userInfo['username'];
        $role = $userInfo['userrole'];
        if ($this->checkAccount($role)) {
            $data = Publisher::where('assignedTo', '=', $username)
            ->where($filter, 'like', '%' . $search . '%')->orderBy('name')->get();
            return Response::json(["searchPublishersData" => $data], 200);
        } else {
            if ($assigned == 'Select User') {$assigned = '';}
            $data = Publisher::where('assignedTo', 'like', '%' . $assigned . '%')
                ->where($filter, 'like', '%' . $search . '%')->orderBy('name')->get();
            return Response::json(["searchPublishersData" => $data], 200);
        }
    }
    public function createPublisher($payload)
    {
        $check = $this->sessionGet();
        $user = $check['user'];
        $userrole = $check['userrole'];
        if ($this->checkAdmin($userrole)) {
            $data = Publisher::create($payload);
            return response()->json([
                "message" => "Data Added Successfully",
                "data" => $data,
            ]);
        } else {
            return Response::json(['message' => "Access Denied"], 403);
        }
    }
    public function readPublisher($id)
    {

        $data = $this->publisherTable($id);
        $check = $this->sessionGet();
        $user = $check['user'];
        $userrole = $check['userrole'];
        $roles = array('admin', 'account', 'salesrep');

        if ($data === null) {
            return Response::json(['message' => "Publisher Details Not Found"], 404);
        } else {
            if (($this->checkAdmin($userrole)) || (($this->checkSalesRep($userrole) ||
                ($this->checkAccount($userrole))) && ($data['assignedTo'] === $user))) {
                $detail = $this->publisherById($id);
                return Response::json(["publishersData" => $detail[0]], 200);
            } else {
                return Response::json(['message' => "Access Denied"], 404);
            }
        }
    }

    public function updatepublisher($payload, $id)
    {

        $check = $this->sessionGet();
        $data = $this->publisherTable($id);
        $user = $check['user'];
        $userrole = $check['userrole'];
        if (($this->checkAdmin($userrole)) || (($this->checkSalesRep($userrole) ||
            ($this->checkAccount($userrole))) && ($data['assignedTo'] === $user))) {
            try {
                $data->update($payload);
                return Response::json(['message' => "Data Updated Successfully", "data" => $data], 200);
            } catch (Exception $e) {
                return Response::json(['message' => "Access Denied"], 403);
            }
        } else {
            return Response::json(['message' => "Access Denied"], 403);
        }
    }

    public function deletepublisher($id)
    {
        $check = $this->sessionGet();
        $user = $check['user'];
        $userrole = $check['userrole'];
        if ($this->checkAdmin($userrole)) {
            $publisher = $this->publisherTable($id);
            $publisher->delete();
            return Response::json(['message' => "Deleted Successfully"], 200);
        } else {
            return Response::json(['message' => "Access Denied"], 403);
        }
    }
}
