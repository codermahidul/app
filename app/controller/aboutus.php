<?php

class aboutUs{
    private $Main;
    function __construct()
    {
        $this->Main=new Main;
        $this->Main->SetTitle("about us");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css?v='.VERSION.'">
        ';

        $Js='<script src="https://cdn.ckeditor.com/4.16.2/standard/ckeditor.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/Admin/Setting/AboutUs.js?v='.VERSION.'"></script>';
       
    
        $Header='Layout/Header.phtml';
        $Footer='Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenuAdmin("Setting/AboutUs.phtml");
     
       
    }
}



?>