<?php namespace Modules\CRM\ServiceProviders;

use Modules\CRM\Services\PublisherService;
use Illuminate\Support\ServiceProvider;

class PublisherServiceProvider extends ServiceProvider {

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
        $this->app->singleton(PublisherService::class, 'Modules\CRM\Services\PublisherService');
		$this->app->singleton(UserService::class, 'Modules\CRM\Services\UserService');
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
