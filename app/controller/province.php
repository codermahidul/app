<?php

class province {
    private $Curls;
     function __construct()
    {
        $this->Curls=new Curls;
    }

    public function addNew()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("province/addNew",$data,false);
    }

    
    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("province/get",$data,false);
    }

    public function updateProvince()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("province/update",$data,false);
    }

    public function remove()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("province/remove",$data,false);
    }
    
}
?>