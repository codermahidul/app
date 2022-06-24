<?php

class support
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

        $data['description'] = $_POST['description'];
        $data['topic'] = $_POST['topic'];
        $data['priority'] = $_POST['priority'];
   
        return $data;
    }

    private function GetItemTxt(){
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        $data['description'] = $_POST['description'];
        $data['support_id'] = $_POST['support_id'];
        
   
        return $data;
    }

    public function addNew()
    {

       $data=$this->GetItem();
       echo $this->GetData->HandelToken("Support/add", $data, false);

    }

    public function addNewTicket()
    {

       $data=$this->GetItemTxt();
       echo $this->GetData->HandelToken("Support/addTicket", $data, false);

    }
    
    public function addNewTicketAdmin()
    {

       $data=$this->GetItemTxt();
       echo $this->GetData->HandelToken("Support/addTicketAdmin", $data, false);

    }
    public function getData()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Support/getMyTicket", $data, false);
    }

    public function updateDeals()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Support/update", $data, false);
    }

    public function remove()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Support/remove", $data, false);
    }

    public function getTicket()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Support/getMyTicket",$data,false);
    }
    
    public function getTicketAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Support/getTicket",$data,false);
    }

    public function accept()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Support/accept", $data, false);
    }
  
}
