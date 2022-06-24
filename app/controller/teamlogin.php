<?php
class teamLogin
{
    private $Main;
    function __construct()
    {
        $this->Main=new Main;
        $this->Main->SetTitle(" login");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Auth/Auth.css">';
        $Js='<script type="module" src="'.VIEW_PATH.'js/Auth/Login.js"></script>';
        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
       $this->Main->CreateView("Login.html");
       
    }
}

?>