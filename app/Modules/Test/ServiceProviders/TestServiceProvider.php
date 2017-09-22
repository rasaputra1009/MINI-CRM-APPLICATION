<?php

namespace Modules\Test\ServiceProviders;

use Illuminate\Support\ServiceProvider;

class TestServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = true;

    /**
     * Register the service provider.
     */
    public function register()
    {
        $this->registerConfig();
        $this->registerRepository();
        $this->registerService();
    }

    private function registerService()
    {
        $this->app->singleton('test', 'Modules\Test\Services\TestService');
    }

    private function registerRepository()
    {
        $this->app->when('Modules\Test\Services\TestService')
                  ->needs('App\Data\CMRepository')
                  ->give('Modules\Test\Repository\TestRepository');
    }

    private function registerConfig()
    {
        $this->mergeConfigFrom(__DIR__.'/../Config/config.php', 'test');
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['test', 'App\Data\CMRepository'];
    }
}
