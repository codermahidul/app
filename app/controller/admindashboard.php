<?php

class adminDashboard
{
    private $Main;

    function __construct()
    {
        $this->Main=new Main;
        $this->Main->AddMetaNoIndex();
        $this->Main->SetTitle("Admin Dashboard");
        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Home/Home.css">';
        $Header='Layout/Header.phtml';
        $Footer='Layout/Footer.phtml';

        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenuAdmin("Home.phtml");
    }

}

?>