<?php

class country {
    private $Curls;
     function __construct()
    {
        $this->Curls=new Curls;
    }

    public function addNew()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("country/addNewCountry",$data,false);
    }

    
    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("country/get",$data,false);
    }

    public function updateCountry()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("country/update",$data,false);
    }

    public function remove()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("country/remove",$data,false);
    }
    
    
    public function searchCity()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("country/SearchAll",$data,false);
    }
}
?>