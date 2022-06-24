<?php

class categorylist{
    private $Main;
    function __construct()
    {
        $this->Main=new Main;
        $this->Main->SetTitle("Category List");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css?v='.VERSION.'">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/Admin/Setting/Category.js?v='.VERSION.'"></script>';
       
    
        $Header='Layout/Header.phtml';
        $Footer='Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenuAdmin("Setting/CategoryList.phtml");
     
       
    }
}



?>