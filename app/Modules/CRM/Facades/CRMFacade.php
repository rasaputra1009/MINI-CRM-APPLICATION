<?php namespace Modules\Crm\Facades;

use Illuminate\Support\Facades\Facade;

class CRMFacade extends Facade {
    protected static function getFacadeAccessor() {
        return 'crm';
    }
}