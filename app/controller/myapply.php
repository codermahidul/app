<?php

class myApply{
    private $Main,$Curls;
     function __construct()
    {
        $this->Main=new Main;
        $this->Curls=new Curls;
        $this->Main->SetTitle("My apply");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/User/Profile.css?v='.VERSION.'">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/ProfessionalDashboard/Job/JobResume.js?v='.VERSION.'"></script>
';
       
        


        $Header='ProfessionalDashboard/Layout/Header.phtml';
        $Footer='ProfessionalDashboard/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);

        $this->Main->CreateViewHeaderFooterSideMenuProfessional("ProfessionalDashboard/Job/JobResume.phtml");
    }
}
