<?php

class dealsLinkCode
{
    private $Main;
    function __construct()
   {
       $this->Main=new Main;
       $this->Main->SetTitle("Deals List");
       $this->Main->AddMetaNoIndex();

       $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/Forum/Forum.css?v='.VERSION.'">
       <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
       <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
       <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">';

       $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
       <script type="module" src="'.VIEW_PATH.'js/BusinessDashboard/Deals/DealsLinkCode.js?v='.VERSION.'"></script>';
      
   
       $Header='BusinessDashboard/Layout/Header.phtml';
       $Footer='BusinessDashboard/Layout/Footer.phtml';

       $this->Main->SetJs($Js);
       $this->Main->SetCss($Css);
       $this->Main->SetHeaders($Header);
       $this->Main->SetFooter($Footer);
       
      $this->Main->CreateViewHeaderFooterSideMenuBusiness("BusinessDashboard/Deals/DealsLinkCode.phtml",true,[
        "listHref"=>"DealsList",
        "list"=>"Deals List",
        "page_name"=>"Deals link or code",
      ]);
   
      
   }
}
