<?php

class MyInbox{
    private $Main,$GetData;
     function __construct()
    {
        $this->Main=new Main;
        $this->GetData=new GetData;
        $this->Main->SetTitle("My Inbox");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/Forum/Forum.css?v='.VERSION.'">
        ';

        $Js='
        <script type="module" src="'.VIEW_PATH.'js/Message/Inbox.js?v='.VERSION.'"></script>';
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
                $this->Main->CreateViewHeaderFooterSideMenuBusiness("Message/Inbox.phtml");
            
                break;
            }

            case "userProfessional":{
                $Header='ProfessionalDashboard/Layout/Header.phtml';
                $Footer='ProfessionalDashboard/Layout/Footer.phtml';
                $this->Main->SetHeaders($Header);
                $this->Main->SetFooter($Footer);
                $this->Main->CreateViewHeaderFooterSideMenuProfessional("Message/Inbox.phtml");
            
                break;
            }

            case "user":{
                $Header='UserDashboard/Layout/Header.phtml';
                $Footer='UserDashboard/Layout/Footer.phtml';
                $this->Main->SetHeaders($Header);
                $this->Main->SetFooter($Footer);
                $this->Main->CreateViewHeaderFooterSideMenu("Message/Inbox.phtml");
            
                break;
            }
        }
      
       
    }
}
