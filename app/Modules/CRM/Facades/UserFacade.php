<?php namespace Modules\CRM\Facades;

use Illuminate\Support\Facades\Facade;
use Modules\CRM\Services\UserService;

class UserFacade extends Facade {
    protected static function getFacadeAccessor() {
        return UserService::class;
    }
    
}

//Dependency Injection
