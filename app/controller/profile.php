<?php

class Profile{
    private $Main;
     function __construct()
    {
        $this->Main=new Main;
        $this->Main->SetTitle("My Profile");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/User/Profile.css?v='.VERSION.'">
        <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/UserDashboard/user/profile/Profile.js?v='.VERSION.'"></script>
        <script type="module" src="'.VIEW_PATH.'tokeniz/tokenize2.js"></script>';
       
        $Header='UserDashboard/Layout/Header.phtml';
        $Footer='UserDashboard/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenu("UserDashboard/User/Profile.phtml");
    }
}



?>