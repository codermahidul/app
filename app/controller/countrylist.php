<?php

class countryList{
    private $Main;
    function __construct()
    {
        $this->Main=new Main;
        $this->Main->SetTitle("Country List");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/Admin/Country/Country.js"></script>';
       
    
        $Header='Layout/Header.phtml';
        $Footer='Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenuAdmin("Country/CountryList.phtml");
     
       
    }
}



?>