<?php

class lotteryAction
{
    private $Curls;
    function __construct()
    {
        $this->Curls = new Curls;
    }


    public function newLottery()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Lottery/addNewLottery", $data, false);
    }


    public function getWinner()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("Lottery/getWinnerLottery", $data, false);
    }


}
