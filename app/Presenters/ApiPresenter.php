<?php
namespace App\Presenters;

use Hemp\Presenter\Presenter;

class ApiPresenter extends Presenter
{
    public function getBaggageAttribute()
    {
        return (bool)$this->model->baggage;
    }

    public function getFinishedAttribute()
    {
        return (bool)$this->model->finished;
    }

    public function getFinishingAttribute()
    {
        return false;
    }

    public function getDeletingAttribute()
    {
        return false;
    }


}