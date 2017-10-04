<?php namespace Modules\Example\ServiceProviders;

use Modules\Example\Services\ExampleService;
use Illuminate\Support\ServiceProvider;

class ExampleServiceProvider extends ServiceProvider {

	/**
	 * Indicates if loading of the provider is deferred.
	 *
	 * @var bool
	 */
	protected $defer = true;

	/**
	 * Register the service provider.
	 *
	 * @return void
	 */
	public function register()
	{
        $this->registerConfig();
        $this->registerRepository();
        $this->registerService();
	}

    private function registerService()
    {
        $this->app->singleton('example', 'Modules\Example\Services\ExampleService');
    }

    private function registerRepository()
    {
        $this->app->when('Modules\Example\Services\ExampleService')
                  ->needs('App\Data\CMRepository')
                  ->give('Modules\Example\Repository\ExampleRepository');
    }

    private  function registerConfig()
    {
        $this->mergeConfigFrom(__DIR__ . '/../Config/config.php', 'example');
    }

	/**
	 * Get the services provided by the provider.
	 *
	 * @return array
	 */
	public function provides()
	{
		return ['example', 'App\Data\CMRepository'];
	}

}
