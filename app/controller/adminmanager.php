<?php

class adminManager{
    private $Main;
    function __construct()
    {
        $this->Main=new Main;
        $this->Main->AddMetaNoIndex();
        $this->Main->SetTitle("Admin Manager List");
        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/Admin/Setting/AdminManager.js"></script>';
       
    
        $Header='Layout/Header.phtml';
        $Footer='Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenuAdmin("Setting/AdminList.phtml");
     
       
    }
}



?>