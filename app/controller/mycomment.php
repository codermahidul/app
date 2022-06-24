<?php

class mycomment{
    private $Main;
     function __construct()
    {
        $this->Main=new Main;
        $this->Main->SetTitle("My Comment");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/Project/Project.css">
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">
  
        <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/UserDashboard/WishList/MyComment.js"></script>';
       
    
        $Header='UserDashboard/Layout/Header.phtml';
        $Footer='UserDashboard/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenu("UserDashboard/WishList/MyComment.phtml");
       include_once VIEW_PATH."UserDashboard/Common/Modal/Category.phtml";
       include_once VIEW_PATH."UserDashboard/Common/Modal/Remove.phtml";
       
    }
}



?>