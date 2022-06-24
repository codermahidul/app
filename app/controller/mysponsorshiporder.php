<?php

class mySponsorShipOrder{
    private $Main,$GetData;
     function __construct()
    {
        $this->Main=new Main;
        $this->GetData=new GetData;
        $this->Main->SetTitle("My SponsorShip Order");
        $this->Main->AddMetaNoIndex();
        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/Forum/Forum.css?v='.VERSION.'">
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
        <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/Sponsorship/SponsorshipList.js?v='.VERSION.'"></script>';
       
    
     

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
 
        
        $type=$this->GetData->GetTypeOnline();
        switch($type)
        {
            case "userBusiness":{
                $Header='BusinessDashboard/Layout/Header.phtml';
                $Footer='BusinessDashboard/Layout/Footer.phtml';
                $this->Main->SetHeaders($Header);
                $this->Main->SetFooter($Footer);
                $this->Main->CreateViewHeaderFooterSideMenuBusiness("Sponsorship/Sponsorship.phtml",true,[
                    
                ]);
                break;
            }

            case "user":{
                $Header='UserDashboard/Layout/Header.phtml';
                $Footer='UserDashboard/Layout/Footer.phtml';
                $this->Main->SetHeaders($Header);
                $this->Main->SetFooter($Footer);
                $this->Main->CreateViewHeaderFooterSideMenu("Sponsorship/Sponsorship.phtml",true,[
                    
                ]);
                break;
            }

            case "userProfessional":{
                $Header='ProfessionalDashboard/Layout/Header.phtml';
                $Footer='ProfessionalDashboard/Layout/Footer.phtml';
                $this->Main->SetHeaders($Header);
                $this->Main->SetFooter($Footer);
                $this->Main->CreateViewHeaderFooterSideMenuProfessional("Sponsorship/Sponsorship.phtml",true,[
                    
                ]);
                break;
            }
        }
   
    
       
    }
}
