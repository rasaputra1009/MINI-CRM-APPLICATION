<?php namespace Modules\Example\Facades;

use Illuminate\Support\Facades\Facade;

class ExampleFacade extends Facade {
    protected static function getFacadeAccessor() {
        return 'example';
    }
}