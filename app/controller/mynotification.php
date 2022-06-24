<?php

class mynotification{
    private $Main,$GetData;
     function __construct()
    {
        $this->Main=new Main;
        $this->GetData=new GetData;
        $this->Main->SetTitle("My Notification");
        $this->Main->AddMetaNoIndex();

        $Css='
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">
  
        <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/UserDashboard/Notification/Notification.js"></script>';
       
        $type=$this->GetData->GetTypeOnline();

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);

        if($type=='user'){
            $Header='UserDashboard/Layout/Header.phtml';
            $Footer='UserDashboard/Layout/Footer.phtml';
    
         
            $this->Main->SetHeaders($Header);
            $this->Main->SetFooter($Footer);
            
           $this->Main->CreateViewHeaderFooterSideMenu("UserDashboard/Notification/NotificationList.phtml",true,[
            "notes_type"=>"user",
           ]);
        }

        if($type=='userBusiness'){
            $Header='BusinessDashboard/Layout/Header.phtml';
            $Footer='BusinessDashboard/Layout/Footer.phtml';
    
         
            $this->Main->SetHeaders($Header);
            $this->Main->SetFooter($Footer);
            
           $this->Main->CreateViewHeaderFooterSideMenuBusiness("UserDashboard/Notification/NotificationList.phtml",true,[
            "notes_type"=>"businessUser",
           ]);
        }


        if($type=='userProfessional'){
            $Header='ProfessionalDashboard/Layout/Header.phtml';
            $Footer='ProfessionalDashboard/Layout/Footer.phtml';
    
         
            $this->Main->SetHeaders($Header);
            $this->Main->SetFooter($Footer);
            
           $this->Main->CreateViewHeaderFooterSideMenuProfessional("UserDashboard/Notification/NotificationList.phtml",true,[
            "notes_type"=>"professionalUser",
           ]);
        }
     
       include_once VIEW_PATH."UserDashboard/Common/Modal/Category.phtml";
       include_once VIEW_PATH."UserDashboard/Common/Modal/Remove.phtml";
       
    }
}



?>