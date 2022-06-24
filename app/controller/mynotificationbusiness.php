<?php

class mynotificationbusiness{
    private $Main;
     function __construct()
    {
        $this->Main=new Main;
        $this->Main->SetTitle("My Notification");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/Project/Project.css">
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">
  
        <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/UserDashboard/Notification/Notification.js"></script>';
       
    
        $Header='BusinessDashboard/Layout/Header.phtml';
        $Footer='BusinessDashboard/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenuBusiness("UserDashboard/Notification/NotificationList.phtml",true,
    [
        "notes_type"=>"businessUser",
    ]);
       include_once VIEW_PATH."UserDashboard/Common/Modal/Category.phtml";
       include_once VIEW_PATH."UserDashboard/Common/Modal/Remove.phtml";
       
    }
}



?>