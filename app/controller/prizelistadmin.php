<?php

class prizeListAdmin{
    private $Main;
     function __construct()
    {
        $this->Main=new Main;
        $this->Main->SetTitle("Prize List");
        $this->Main->AddMetaNoIndex();

        
        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css">
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/Admin/Confirm/Prize.js"></script>';
       
    
        $Header='Layout/Header.phtml';
        $Footer='Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenuAdmin("Confirm/PrizeListAdmin.phtml",["have_home_show"=>"false"]);
    
       
    }
}



?>