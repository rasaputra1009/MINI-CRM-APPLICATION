<?php namespace Modules\CRM\ServiceProviders;

use Modules\CRM\Services\CRMService;
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
        $this->app->singleton('crm', 'Modules\CRM\Services\CRMService');
    }

    private function registerRepository()
    {
        // $this->app->when('Modules\CRM\Services\CRMService')
        //           ->needs('App\Data\CMRepository')
        //           ->give('Modules\CRM\Repository\CRMRepository');
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
