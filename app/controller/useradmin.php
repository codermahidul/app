<?php

class useradmin {
    private $Curls;
    function __construct()
    {
        $this->Curls=new Curls;
    }


    public function login()
    {
        $response =$this->Curls->curl("userAdmin/login",$_POST,true);
        
        if($response->status=="true")
        {
            setcookie("tokeAdmin", $response->data, time() + (86400 * 365), "/");
           // setcookie("token", $response->data, time() + (86400 * 365), "/", URL_Domain, false, true); // 86400 = 1 day
            echo json_encode(["status"=>'true',"data"=>"","err"=>""]);
        }
        else
        {
            echo json_encode($response);
        }
        
    }

    public function addnewadmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("UserAdmin/addAdmin",$data,false);
    }

    public function getdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("UserAdmin/get",$data,false);
    }

    public function updateadmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("UserAdmin/updateAdmin",$data,false);
    }

    
    public function setpermissionadmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("UserAdmin/SetPermissionAdmin",$data,false);
    }

    public function getpermissionadmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("UserAdmin/getPermissionAdmin",$data,false);
    }
}


?>