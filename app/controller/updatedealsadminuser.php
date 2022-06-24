<?php

class updateDealsAdminUser{
    private $Main;
     function __construct()
    {
        $this->Main=new Main;
        $this->Main->SetTitle("Update Deals");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/Forum/Forum.css?v='.VERSION.'">
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
        <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/Admin/Tables/EditDealsUser.js?v='.VERSION.'"></script>';
       
    
        $Header='Layout/Header.phtml';
        $Footer='Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
               
        $url=explode("/",$_SERVER['REQUEST_URI']);
        $id=$url[count($url)-1];
        $this->Main->CreateViewHeaderFooterSideMenuAdminUserView("BusinessDashboard/Deals/Edit.phtml",true,[
           "listHref"=>"UserDealsList/".$id,
           "list"=>"Deals List",
        ]);
    
       
    }
}
