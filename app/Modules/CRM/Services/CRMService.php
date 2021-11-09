<?php namespace Modules\Crm\Services;

use App\Data\CMRepository;
use Modules\Crm\Repository\CrmRepository;

class CRMService {
    private $repository = null;

    /**
     * @param CMRepository|CrmRepository $CMRepository
     */
    public function __construct(CMRepository $CMRepository)
    {
        $this->repository = $CMRepository;
    }
}