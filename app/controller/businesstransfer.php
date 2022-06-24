<?php

class businessTransfer{
    private $Main,$Curls;
     function __construct()
    {
        $this->Main=new Main;
        $this->Curls=new Curls;
        $this->Main->SetTitle("Business Transfer");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/User/Profile.css?v='.VERSION.'">';
        
        $Js='<script type="module" src="'.VIEW_PATH.'js/Admin/BusinessUser/BusinessTransfer.js?v='.VERSION.'"></script>
        ';
       
        


        $Header='Layout/Header.phtml';
        $Footer='Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);

        $this->Main->CreateViewHeaderFooterSideMenuAdmin("BusinessUser/BusinessTransfer.phtml");
    }
}
