<?php
class logoutBusinessUser
{
    private $Main,$GetData,$Google,$Facebook;
    function __construct()
    {
       
        $this->GetData=new GetData;
        $this->Google=new Google();
        $this->Facebook=new Facebook();


        $type=$this->GetData->GetTypeOnline();
        if($type=="userBusiness")
        {
            setcookie("bussiness_token",'', time() - 3600, "/");
        }
        if($type=="userProfessional")
        {
            setcookie("professional_token",'', time() - 3600, "/");
        }
        $this->Main=new Main;
        $this->Main->AddMetaNoIndex();

        $this->Main->SetTitle(" login");
        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Auth/Auth.css?v='.VERSION.'">';
        $Js='<script type="module" src="'.VIEW_PATH.'js/Auth/Login.js?v='.VERSION.'"></script>';
        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
       $this->Main->CreateView("Login.html",[
        "google"=>$this->Google->getGoogleAuthAddress(),
        "facebook"=>$this->Facebook->getFacebookAuthAddress(),
    ]);
       
    }
}
