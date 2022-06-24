<?php

class proof {
    private $Curls;
     function __construct()
    {
        $this->Curls=new Curls;
    }

    public function addnew()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("proof/addNewProof",$data,false);
    }

    
    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("proof/get",$data,false);
    }

    public function updateproof()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("proof/updateProf",$data,false);
    }

    public function remove()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("proof/removeProf",$data,false);
    }
    
    public function deleteImage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("proof/removeImage", $data, false);
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
        if (isset($_POST['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("proof/updateImage", $data, false);
    }
}
?>