<?php

class couponShare{
    private $Main,$Curls;
     function __construct()
    {
        $this->Main=new Main;
        $this->Curls=new Curls;
        $this->Main->SetTitle("Coupon Share");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/User/Profile.css?v='.VERSION.'">
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/ProfessionalDashboard/Share/ShareCoupon.js?v='.VERSION.'"></script>
        <script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>';
       
        


        $Header='ProfessionalDashboard/Layout/Header.phtml';
        $Footer='ProfessionalDashboard/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);

        $this->Main->CreateViewHeaderFooterSideMenuProfessional("ProfessionalDashboard/Share/Table.phtml");
    }
}
