<?php

class sponsorship {
    private $Curls,$GetData;
     function __construct()
    {
        $this->Curls=new Curls;
        $this->GetData=new GetData;
    }




    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("Sponsorship/get",$data,false);
    }
    
    public function new()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Sponsorship/add",$data,false);
    }
    

    public function newRequest()
    {
        $type=$this->GetData->GetTypeOnline();
        if($type=="admin" || $type=="team" || $type=='')
        {
            echo json_encode(["status" => "false", "data" =>[], "err" => "Please login first"]);
            return false;
        }
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Sponsorship/addRequest",$data,false);
    }

    
    
    public function getMyRequest()
    {
      
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Sponsorship/getMyRequest",$data,false);
    }
    
    public function updateRequest()
    {
      
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Sponsorship/updateRequest",$data,false);
    }

    public function removeRequest()
    {
      
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Sponsorship/DeleteRequest",$data,false);
    }
    
    public function update()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Sponsorship/update", $data, false);
    }

    public function getGallery()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("Sponsorship/getGalleryImage", $data, false);
    }


    public function updateImageGallery()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (count($_FILES) > 0) {
            for ($i = 0; $i < count($_FILES); $i++) {
                $cfile = curl_file_create($_FILES['img' . $i]['tmp_name'], $_FILES['img' . $i]['type'], basename($_FILES['img' . $i]['name']));
                $data['img' . $i] = ($cfile);
            }
        } else
            $data['img'] = '';

        $data['idSearch'] = $_POST['idSearch'];

        if (isset($_POST['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("Sponsorship/addImageGallery", $data, false);
    }

    public function deleteImageGallery()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("Sponsorship/removeImageGallery", $data, false);
    }

    public function remove()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Sponsorship/remove", $data, false);
    }

    
}
