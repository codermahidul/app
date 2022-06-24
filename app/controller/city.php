<?php

class city {
    private $Curls;
     function __construct()
    {
        $this->Curls=new Curls;
    }

    public function addNew()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("city/addNew",$data,false);
    }

    
    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("city/get",$data,false);
    }

    public function updateCity()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("city/update",$data,false);
    }

    public function remove()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("city/remove",$data,false);
    }
    
}
?>