<?php

class job
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

        $data['title'] = $_POST['title'];
        $data['description'] = $_POST['description'];
        $data['level'] = $_POST['level'];
        $data['type'] = $_POST['type'];
        $data['gender'] = $_POST['gender'];
        $data['salary'] = $_POST['salary'];
        $data['exprience'] = $_POST['exprience'];
        $data['benefit'] = $_POST['benefit'];
        

        $data['online'] = $_POST['online'];
        $data['country_id'] = $_POST['country_id'];
        $data['province_id'] = $_POST['province_id'];
        $data['city_id'] = $_POST['city_id'];
        
        $data['category_id'] = $_POST['category_id'];
        $data['categories'] = $_POST['categories'];

        return $data;
    }

    public function addNew()
    {

       $data=$this->GetItem();
       echo $this->GetData->HandelToken("Job/addJob", $data, false);

    }

    public function getData()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Job/getMyJob", $data, false);
    }

    public function updateJob()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Job/update", $data, false);
    }

    public function remove()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Job/remove", $data, false);
    }

    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("Job/get",$data,false);
    }

    public function deleteImage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Job/removeImage", $data, false);
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
        echo $this->GetData->HandelToken("Job/updateImage", $data, false);
    }

    public function getDataAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Job/getMyJobAdmin", $data, false);
    }

    public function newJobAdmin()
    {

        $data=$this->GetItem();

        $data['send_admin']='1';
        $data['admin_confirm']='1';
        
        if (isset($_POST['for_user'])) {
            $data['is_admin'] = '1';
            $data['user_business_id']=$_POST['user_business_id'];
        }

       echo $this->GetData->HandelToken("Job/addAdmin", $data, false);
    }

    public function addNewSub()
    {

        $data=$this->GetItem();


        
    
        if (isset($_COOKIE['bussinessNumber'])) {
            $data['user_business_id'] = $_COOKIE['bussinessNumber'];
            echo $this->GetData->HandelToken("Job/addJobSub", $data, false);
        }

    }
    public function confirmJob()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Job/confirm",$data,false);
    }

    public function updateJobAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if(isset($data['for_user']))
        {
            $data['is_admin']='1';  
            if(isset($data['for_remove']))
            {
                $data['for_remove']='1';
            } 
        }
        echo $this->GetData->HandelToken("Job/update", $data, false);
    }
    

 

    public function removeAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if(isset($data['for_user']))
        {
            $data['is_admin']='1';  
        }
        echo $this->GetData->HandelToken("Job/remove", $data, false);
    }

    public function deleteImageAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->GetData->HandelToken("Job/removeImage", $data, false);
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
        echo $this->GetData->HandelToken("Job/updateImage", $data, false);
    }
 
    public function apply()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("JobApply/Apply", $data, false);
    }

    public function changeStatus()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("JobApply/update", $data, false);
    }
  
    
}
