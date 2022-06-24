
<?php

class homePageSettingAction
{
    private  $Curls;

    function __construct()
    {
        $this->Curls=new Curls;
      
    }

    public function updateinfo()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("formulaPage/updateFormulaPage",$data,false);
    }

    public function getinfo()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("formulaPage/get",$data,false);
    }

    public function addLink()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("formulaPage/AddLinkFormulaPage",$data,false);
    }

    public function updateimagegalery()
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
        echo $this->Curls->curl_with_token_admin("formulaPage/addImageGalery", $data, false);
    }
    
    public function deleteimagegalery()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("formulaPage/removeImageGalery", $data, false);
    }
    
    public function deleteLink()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("formulaPage/removeFormulaPageLink",$data,false);
    }
}
