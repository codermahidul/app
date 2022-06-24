<?php

class activateAccount
{
    private $Main,$Curls,$GetData;

    function __construct()
    {
        $this->Main=new Main;
        $this->Curls=new Curls;
        $this->GetData=new GetData;

        $this->Main->SetTitle("Activate Account");
        $this->Main->AddMetaNoIndex();
        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Auth/Auth.css">';
        $Js='';
        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);

        $url = explode("/", $_SERVER['REQUEST_URI']);
        $number_url_param = count($url);

        $refid = $url[$number_url_param - 1];
        $datas=$this->Curls->curl("userBusiness/get",["refid"=>$refid]);
        $txt="";
        $status="";
        if($datas->data->total<=0)
        {
            $txt="There is no such user ";
            $status="danger";
        }
        else
        {
            $this->Curls->curl("userBusiness/verifyUser",["idSearch"=>$datas->data->data[0]->id]);
            $txt="Your email account has been verified ";
            $status="success";
        }

       $this->Main->CreateView("ActivateAccount.phtml",["txt"=>$txt,"status"=>$status]);
    }

 
}
