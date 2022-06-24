<?php

class allBooking{
    private $Main;
     function __construct()
    {
        $this->Main=new Main;
        $this->Main->SetTitle("All Booking");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/Forum/Forum.css?v='.VERSION.'">
        <link rel="stylesheet" href="'.VIEW_PATH.'calender/main.min.css">
        ';

        $Js='<script  src="'.VIEW_PATH.'calender/main.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.0/moment.min.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/TeamDashboard/Booking/Booking.js?v='.VERSION.'"></script>
        ';

    
        $Header='TeamDashboard/Layout/Header.phtml';
        $Footer='TeamDashboard/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);

        $this->Main->CreateViewHeaderFooterSideMenuTeam("TeamDashboard/Booking/AllBooking.phtml",true,[
            "Href"=>"AddBooking",
            "BtnTitle"=>"Add Booking",
        ]);
  
    
       
    }
}



?>