<?php

class supportAdminList{
    private $Main,$GetData;
     function __construct()
    {
        $this->Main=new Main;
        $this->GetData=new GetData;
        $this->Main->SetTitle("Support Admin List");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/Forum/Forum.css?v='.VERSION.'">
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">
        ';

        $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/Support/SupportAdminList.js?v='.VERSION.'"></script>';
        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $type=$this->GetData->GetTypeOnline();
    
      
 
        $Header='Layout/Header.phtml';
        $Footer='Layout/Footer.phtml';
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        $this->Main->CreateViewHeaderFooterSideMenuAdminUserView("Support/SupportList.phtml");
  

       
        
      
       
    }
}
