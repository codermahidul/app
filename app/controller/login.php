<?php
class login
{
    private $Main,$Google,$Facebook;
    function __construct()
    {
        $this->Main=new Main;
        $this->Google=new Google();
        $this->Facebook=new Facebook();

        $this->Main->SetTitle("Login");
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

?>