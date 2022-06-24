<?php

class help {
    private $Curls;
     function __construct()
    {
        $this->Curls=new Curls;
    }

    private function GetItem()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        $data['title'] = $_POST['title'];
        $data['descriptions'] = $_POST['descriptions'];
        $data['help_link'] = $_POST['help_link'];
        $data['category_id'] = $_POST['category_id'];
        $data['categorys'] = $_POST['categorys'];
      
        return $data;
    }

    public function addNew()
    {
        $data=$this->GetItem();
        echo $this->Curls->curl_with_token_admin("help/addNewHelp",$data,false);
    }

    
    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("help/get",$data,false);
    }

    public function updateHelp()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("help/updateHelp",$data,false);
    }

    public function remove()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("help/removeHelp",$data,false);
    }
    
    
    public function deleteImage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("help/removeImage", $data, false);
    }

    public function updateImage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        $data['idSearch'] = $_POST['idSearch'];
        echo $this->Curls->curl_with_token_admin("help/updateImage", $data, false);
    }
}
?>