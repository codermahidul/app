<?php

class team {
    private $Curls,$GetData;
     function __construct()
    {
        $this->Curls=new Curls;
        $this->GetData=new GetData;
    }

    public function addTeam()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("team/AddNew",$data,false);
    }

    
    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("team/get",$data,false);
    }

    public function getTeamAdmin()
    {
        
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("team/getInfo",$data,false);
    }
    
    public function getOnlineTeamData()
    {
        
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("team/getMyInfo",$data,false);
    }

    public function updateTeamAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("team/updateTeam",$data,false);
    }
    
    public function updateMyInfo()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("team/updateMe",$data,false);
    }
    public function updateImageAdmin()
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
        echo $this->GetData->HandelToken("team/updateImage", $data, false);
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

        echo $this->GetData->HandelToken("team/updateImage", $data, false);
    }

    public function deleteImage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Team/removeImage", $data, false);
    }

    public function deleteImageAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->GetData->HandelToken("Team/removeImage", $data, false);
    }

    public function getGallery()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("team/getGalleryImage", $data, false);
    }

    public function updateImageGalleryAdmin()
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
        echo $this->GetData->HandelToken("team/addImageGallery", $data, false);
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
        echo $this->GetData->HandelToken("team/addImageGallery", $data, false);
    }

    public function deleteImageGalleryAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
  
        echo $this->GetData->HandelToken("team/removeImageGallery", $data, false);
    }

    public function deleteImageGallery()
    {
        $data = json_decode(file_get_contents('php://input'), true);
   
        echo $this->GetData->HandelToken("team/removeImageGallery", $data, false);
    }

    public function removeAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->GetData->HandelToken("team/removeTeam", $data, false);
    }

    public function addBooking()
    {
        $data = json_decode(file_get_contents('php://input'), true);
  
        echo $this->GetData->HandelToken("booking/add", $data, false);
    }

    public function getMyBooking()
    {
        $data = json_decode(file_get_contents('php://input'), true);
  
        echo $this->GetData->HandelToken("booking/getMyBook", $data, false);
    }
    
    public function editBooking()
    {
        $data = json_decode(file_get_contents('php://input'), true);
  
        echo $this->GetData->HandelToken("booking/update", $data, false);
    }
    
    public function removeBooking()
    {
        $data = json_decode(file_get_contents('php://input'), true);
  
        echo $this->GetData->HandelToken("booking/remove", $data, false);
    }

    public function getBooking()
    {
        $data = json_decode(file_get_contents('php://input'), true);
  
        echo $this->GetData->HandelToken("booking/get", $data, false);
    }
}
?>