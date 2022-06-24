<?php

class myDiscountAdmin{
    private $Main;
    function __construct()
   {
       $this->Main=new Main;
       $this->Main->SetTitle("My Coupon List");
       $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css?v='.VERSION.'">">
       <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">
 
       <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">';

       $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
       <script type="module" src="'.VIEW_PATH.'js/Admin/Tables/MyDiscount.js?v='.VERSION.'">"></script>';
      
   
       $Header='Layout/Header.phtml';
       $Footer='Layout/Footer.phtml';

       $this->Main->SetJs($Js);
       $this->Main->SetCss($Css);
       $this->Main->SetHeaders($Header);
       $this->Main->SetFooter($Footer);
       
       $this->Main->CreateViewHeaderFooterSideMenuAdmin("Tables/MyDiscountAdmin.phtml");
    
      
   }
}
