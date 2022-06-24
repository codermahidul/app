<?php

class applyProjects{
    private $Main;
     function __construct()
    {
        $this->Main=new Main;
        $this->Main->AddMetaNoIndex();
        $this->Main->SetTitle("Apply Project List");
        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/Project/Project.css">
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">
  
        <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/UserDashboard/WishList/ApplyProjectList.js"></script>';
       
    
        $Header='UserDashboard/Layout/Header.phtml';
        $Footer='UserDashboard/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenu("UserDashboard/WishList/ApplyProjectList.phtml");
       include_once VIEW_PATH."UserDashboard/Common/Modal/Category.phtml";
       include_once VIEW_PATH."UserDashboard/Common/Modal/Remove.phtml";
       
    }
}



?>