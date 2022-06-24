<?php

class program {
    private $Curls;
     function __construct()
    {
        $this->Curls=new Curls;
    }


    public function getGuestList()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("program/getGuest",$data,false);
    }

    
    public function getDataAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("program/getMyProgramAdmin",$data,false);
    }

    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("program/get",$data,false);
    }
    
    public function newProgramAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cFile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cFile);
        } else
            $data['img'] = '';

        $data['title'] = $_POST['title'];
        $data['type'] = $_POST['type'];
       // $data['program_award_section'] = $_POST['program_award_section'];
        $data['video_link'] = $_POST['video_link'];
        $data['photographer_name'] = $_POST['photographer_name'];
        $data['tags'] = $_POST['tags'];
        $data['description'] = $_POST['description'];
        $data['category_id'] = $_POST['category_id'];
        $data['program_link'] = $_POST['program_link'];
        $data['program_role'] = $_POST['program_role'];
        $data['program_guest'] = $_POST['program_guest'];

        $data['country_id'] = $_POST['country_id'];
        $data['province_id'] = $_POST['province_id'];
        $data['city_id'] = $_POST['city_id'];

        echo $this->Curls->curl_with_token_admin("program/addProgram", $data, false);
    }
    

    public function updateProgramAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("program/updateProgram", $data, false);
    }

    public function getGallery()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("program/getGalleryImage", $data, false);
    }

    public function deleteImageAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("Program/removeImageProgram", $data, false);
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
        echo $this->Curls->curl_with_token_admin("Program/updateImageProgram", $data, false);
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
        echo $this->Curls->curl_with_token_admin("program/addImageGallery", $data, false);
    }

    public function deleteImageGalleryAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("Program/removeImageGallery", $data, false);
    }

    public function removeAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("Program/removeProgram", $data, false);
    }

    public function addNewComment()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token("ProgramComment/addNewComment",$data,false);
    }
  
    public function addReplyComment()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token("ProgramComment/addNewReplyComment",$data,false);
    }
    
    public function addReplyCommentBusiness()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_business("ProgramComment/addBusinessReplyComment",$data,false);
    }

    public function getComment()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("ProgramComment/get",$data,false);
    }
    

    public function addNewCommentLike()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if($data['creator_type']=="user")
        echo $this->Curls->curl_with_token("ProgramComment/addNewLikeComment",$data,false);
        if($data['creator_type']=="business")
        echo $this->Curls->curl_with_token_business("ProgramComment/addNewLikeComment",$data,false);
    }

    public function removeCommentLike()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if($data['creator_type']=="user")
        echo $this->Curls->curl_with_token("ProgramComment/RemoveLikeComment",$data,false);
        if($data['creator_type']=="business")
        echo $this->Curls->curl_with_token_business("ProgramComment/RemoveLikeComment",$data,false);
    }
}
?>