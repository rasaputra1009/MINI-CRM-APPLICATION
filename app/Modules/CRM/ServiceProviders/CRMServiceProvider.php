<?php namespace Modules\Crm\ServiceProviders;

use Modules\Crm\Services\CrmService;
use Illuminate\Support\ServiceProvider;

class CRMServiceProvider extends ServiceProvider {

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
        $this->app->singleton('crm', 'Modules\Crm\Services\CrmService');
    }

    private function registerRepository()
    {
        $this->app->when('Modules\Crm\Services\CrmService')
                  ->needs('App\Data\CMRepository')
                  ->give('Modules\Crm\Repository\CrmRepository');
    }

    private  function registerConfig()
    {
        $this->mergeConfigFrom(__DIR__ . '/../Config/config.php', 'crm');
    }

	/**
	 * Get the services provided by the provider.
	 *
	 * @return array
	 */
	public function provides()
	{
		return ['crm', 'App\Data\CMRepository'];
	}

}
