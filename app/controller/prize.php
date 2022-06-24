<?php

class prize
{
    private $Curls,$GetData;
    function __construct()
    {
        $this->Curls = new Curls;
        $this->GetData=new GetData;
    }

    public function newPrize()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        $data['title'] = $_POST['title'];
        $data['description'] = $_POST['description'];
        $data['jvalues'] = $_POST['jvalues'];
        $data['jnumber'] = $_POST['jnumber'];


        echo $this->Curls->curl_with_token_business("prize/addprize", $data, false);
    }

    public function getData()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_business("prize/getMyprize", $data, false);
    }

    public function updatePrize()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("prize/updatePrize", $data, false);
    }

    public function remove()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("prize/removePrize", $data, false);
    }

    public function deleteImage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("prize/removeImagePrize", $data, false);
    }

    public function updateimage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        $data['idSearch'] = $_POST['idSearch'];
        echo $this->GetData->HandelToken("prize/updateImagePrize", $data, false);
    }

    public function getGallery()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("prize/getGalleryImage", $data, false);
    }

    public function updateimagegallery()
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
        echo $this->Curls->curl_with_token_business("prize/addImageGallery", $data, false);
    }

    public function deleteimagegallery()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_business("prize/removeImageGallery", $data, false);
    }

    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("prize/get", $data, false);
    }

    public function confirmprize()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("prize/confirmPrize", $data, false);
    }

    public function newPrizeSub()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        $data['title'] = $_POST['title'];
        $data['description'] = $_POST['description'];
        $data['jvalues'] = $_POST['jvalues'];
        $data['jnumber'] = $_POST['jnumber'];
        if (isset($_COOKIE['bussinessNumber'])) {
            $data['user_business_id'] = $_COOKIE['bussinessNumber'];
            echo $this->GetData->HandelToken("prize/addPrizeSub", $data, false);
        }
    }

    public function newPrizeAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        $data['title'] = $_POST['title'];
        $data['description'] = $_POST['description'];
        $data['jvalues'] = $_POST['jvalues'];
        $data['jnumber'] = $_POST['jnumber'];
        if (isset($_POST['for_user'])) {
            $data['is_admin'] = '1';
            $data['user_business_id']=$_POST['user_business_id'];
        }
        echo $this->Curls->curl_with_token_admin("prize/addPrizeAdmin", $data, false);
    }

    public function getDataAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("prize/getMyPrizeAdmin", $data, false);
    }

    public function updatePrizeAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
            if (isset($data['for_remove'])) {
                $data['for_remove'] = '1';
            }
        }
        echo $this->Curls->curl_with_token_admin("prize/updatePrize", $data, false);
    }


    public function deleteImageAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("prize/removeImageprize", $data, false);
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
        echo $this->Curls->curl_with_token_admin("prize/updateImagePrize", $data, false);
    }
    public function updateimagegalleryadmin()
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
        echo $this->Curls->curl_with_token_admin("prize/addImageGallery", $data, false);
    }

    public function deleteimagegallery_admin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("prize/removeImageGallery", $data, false);
    }

    public function removeAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("prize/removePrize", $data, false);
    }

    public function addPrizeDateAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("prize/addPrizeDate", $data, false);
    }

    
    public function getPrizeDateAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("prize/getPrizeDate", $data, false);
    }


    public function deletePrizeDate()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("prize/RemovePrizeDate", $data, false);
    }
}
