<?php

class discount
{
    private $Curls;
    function __construct()
    {
        $this->Curls = new Curls;
    }

    public function newDiscount()
    {

        $data = json_decode(file_get_contents('php://input'), true);        
    
        echo $this->Curls->curl_with_token_admin("Discount/add", $data, false);

    }

    public function getData()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Discount/getMyDiscount", $data, false);
    }

    public function updateDiscount()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Discount/update", $data, false);
    }

    public function remove()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Discount/remove", $data, false);
    }

    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("Discount/get",$data,false);
    }

    public function copyDiscount()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Discount/Copy", $data, false);
    }

}
