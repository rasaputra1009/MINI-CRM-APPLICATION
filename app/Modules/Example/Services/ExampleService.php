<?php namespace Modules\Example\Services;

use App\Data\CMRepository;
use Modules\Example\Repository\ExampleRepository;

class ExampleService {
    private $repository = null;

    /**
     * @param CMRepository|ExampleRepository $CMRepository
     */
    public function __construct(CMRepository $CMRepository)
    {
        $this->repository = $CMRepository;
    }
}