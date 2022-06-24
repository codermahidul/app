<?php
class forgotPassword
{
    private $Main;
    function __construct()
    {
        $this->Main=new Main;
        $this->Main->AddMetaNoIndex();

        $this->Main->SetTitle("Frogot Password");
        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Auth/Auth.css">';
        $Js='<script type="module" src="'.VIEW_PATH.'js/Auth/FrogotPassword.js"></script>';
        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
       $this->Main->CreateView("FrogotPassword.html");
       
    }
}

?>