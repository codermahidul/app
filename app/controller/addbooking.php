<?php

class addBooking{
    private $Main;
     function __construct()
    {
        $this->Main=new Main;
        $this->Main->SetTitle("New Booking");
        $this->Main->AddMetaNoIndex();
        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/Forum/Forum.css?v='.VERSION.'">
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
        <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/TeamDashboard/Booking/Add.js?v='.VERSION.'"></script>';
       
    
        $Header='TeamDashboard/Layout/Header.phtml';
        $Footer='TeamDashboard/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenuTeam("TeamDashboard/Booking/Add.phtml",true,[
           "listHref"=>"InterviewBooking",
           "list"=>"Interview Booking",
       ]);
    
       
    }
}
