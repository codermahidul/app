<?php

class slider {
    private $Curls;
     function __construct()
    {
        $this->Curls=new Curls;
    }

    public function addnew()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (count($_FILES) > 0) {
            for ($i = 0; $i < count($_FILES); $i++) {
                $cfile = curl_file_create($_FILES['img' . $i]['tmp_name'], $_FILES['img' . $i]['type'], basename($_FILES['img' . $i]['name']));
                $data['img' . $i] = ($cfile);
            }
        } else
            $data['img'] = '';

        echo $this->Curls->curl_with_token_admin("slider/addSlider",$data,false);
    }

    
    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("slider/get",$data,false);
    }



    public function deleteimage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("slider/removeImage",$data,false);
    }
    
}
?>