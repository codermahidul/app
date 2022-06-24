<?php
class sliders
{
    private $Main;
    function __construct()
   {
       $this->Main=new Main;
       $this->Main->SetTitle("Sliders");
       $this->Main->AddMetaNoIndex();

       $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css">
       <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">';

       $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
       <script type="module" src="'.VIEW_PATH.'js/Admin/Setting/Sliders.js"></script>';
      
   
       $Header='Layout/Header.phtml';
       $Footer='Layout/Footer.phtml';

       $this->Main->SetJs($Js);
       $this->Main->SetCss($Css);
       $this->Main->SetHeaders($Header);
       $this->Main->SetFooter($Footer);
       
      $this->Main->CreateViewHeaderFooterSideMenuAdmin("Setting/Sliders.phtml");
   
      
   }
}

?>