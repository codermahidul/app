<?php
class businessLogin
{
    private $Main;
    function __construct()
    {
        $this->Main=new Main;
        $this->Main->AddMetaNoIndex();

        $this->Main->SetTitle("Business login");
        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Auth/Auth.css?v='.VERSION.'">';
        $Js='<script type="module" src="'.VIEW_PATH.'js/Auth/Login.js?v='.VERSION.'"></script>';
        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
       $this->Main->CreateView("Login.html");
       
    }
}

?>