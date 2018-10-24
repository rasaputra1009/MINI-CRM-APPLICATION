<?php

namespace Modules\Test\Services;

use App\Data\CMRepository;
use Modules\Test\Repository\TestRepository;

class TestService
{
    private $repository = null;

    /**
     * @param CMRepository|TestRepository $CMRepository
     */
    public function __construct(CMRepository $CMRepository)
    {
        $this->repository = $CMRepository;
    }
}
