<?php namespace Modules\CRM\Facades;

use App\Publisher;
use Illuminate\Support\Facades\Facade;
use Modules\CRM\Services\PublisherService;

class PublisherFacade extends Facade {
    protected static function getFacadeAccessor() {
        return PublisherService::class;
    }
}

//Dependency Injection
