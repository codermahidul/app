<?php

class teamProfile{
    private $Main;
     function __construct()
    {
        $this->Main=new Main;
        $this->Main->SetTitle("My Profile");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/User/Profile.css?v='.VERSION.'">
        <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'tokeniz/tokenize2.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/TeamDashboard/Profile/Profile.js?v='.VERSION.'"></script>';
       
        $Header='TeamDashboard/Layout/Header.phtml';
        $Footer='TeamDashboard/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenuTeam("TeamDashboard/Profile/Profile.phtml");
    }
}



?>