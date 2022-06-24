<?php

class editHelp{
    private $Main;
    function __construct()
    {
        $this->Main=new Main;
        $this->Main->SetTitle("Edit Help");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css?v='.VERSION.'">
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/Admin/Setting/EditHelp.js?v='.VERSION.'"></script>
        <script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>';
       
    
        $Header='Layout/Header.phtml';
        $Footer='Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenuAdmin("Setting/EditHelp.phtml",true,[
           "pageTitle"=>"Edit Help",
           "listHref"=>"HelpList",
           "list"=>"Help List",
       ]);
     
       
    }
}



?>