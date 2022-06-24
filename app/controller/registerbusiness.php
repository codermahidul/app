<?php

class registerBusiness
{
    private $Main,$Google,$Facebook;

    function __construct()
    {
        $this->Main=new Main;
        $this->Google=new Google();
        $this->Facebook=new Facebook();
        $this->Main->SetTitle("Register Business Account");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Auth/Auth.css?v='.VERSION.'">';
        $Js='<script type="module" src="'.VIEW_PATH.'js/Auth/Register.js?v='.VERSION.'"></script>';
        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);

       $this->Main->CreateView("Register.html",[
        "google"=>$this->Google->getGoogleAuthAddress(),
        "facebook"=>$this->Facebook->getFacebookAuthAddress(),
    ]);
    }

 
}

?>