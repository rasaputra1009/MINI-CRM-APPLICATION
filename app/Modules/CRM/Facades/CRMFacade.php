<?php namespace Modules\CRM\Facades;

use Illuminate\Support\Facades\Facade;

class CRMFacade extends Facade {
    protected static function getFacadeAccessor() {
        return 'crm';
    }
}

//Dependency Injection
