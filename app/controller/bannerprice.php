<?php

class bannerPrice{
    private $Main;
    function __construct()
    {
        $this->Main=new Main;
        $this->Main->AddMetaNoIndex();
        $this->Main->SetTitle("banner Price ");
        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css?v='.VERSION.'">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/Admin/Setting/BannerPrice.js?v='.VERSION.'"></script>';
       
    
        $Header='Layout/Header.phtml';
        $Footer='Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenuAdmin("Setting/BannerPrice.phtml");
     
       
    }
}



?>