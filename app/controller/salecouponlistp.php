<?php

class saleCouponListP{
    private $Main;
     function __construct()
    {
        $this->Main=new Main;
        $this->Main->SetTitle("Sale List");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/Forum/Forum.css?v='.VERSION.'">
        ';

        $Js='
        <script type="module" src="'.VIEW_PATH.'js/ProfessionalDashboard/Tables/CouponShopList.js?v='.VERSION.'"></script>';
       
    
        $Header='ProfessionalDashboard/Layout/Header.phtml';
        $Footer='ProfessionalDashboard/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenuProfessional("BusinessDashboard/Deals/DealsShopList.phtml");
    
       
    }
}



?>