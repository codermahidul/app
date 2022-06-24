<?php

class claim
{
    private $Curls,$GetData;
    function __construct()
    {
        $this->Curls = new Curls;
        $this->GetData= new GetData;
    }

    private function GetItem(){
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        $data['email'] = $_POST['email'];
        $data['description'] = $_POST['description'];
        $data['items_type'] = $_POST['items_type'];
        $data['items_id'] = $_POST['items_id'];
   
        return $data;
    }

    public function addNew()
    {

       $data=$this->GetItem();
       echo $this->GetData->HandelToken("claim/add", $data, false);

    }

    public function getData()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("claim/getMyClaim", $data, false);
    }

    public function updateDeals()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("claim/update", $data, false);
    }

    public function remove()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("claim/remove", $data, false);
    }

    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("claim/get",$data,false);
    }
    
    public function accept()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("claim/accept", $data, false);
    }
  
}
