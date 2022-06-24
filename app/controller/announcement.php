<?php
class Announcement
{
    private $Main,$Curls;
    function __construct()
   {
       $this->Main=new Main;
       $this->Curls=new Curls;
       $this->Main->SetTitle("Announcement");
       $this->Main->AddMetaNoIndex();

       $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css?v='.VERSION.'">
       <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">';

       $Js='<script type="module" src="'.VIEW_PATH.'js/Admin/Setting/Announcement.js?v='.VERSION.'"></script>';
      
   
       $Header='Layout/Header.phtml';
       $Footer='Layout/Footer.phtml';

       $this->Main->SetJs($Js);
       $this->Main->SetCss($Css);
       $this->Main->SetHeaders($Header);
       $this->Main->SetFooter($Footer);
       
       
      
       $this->Main->CreateViewHeaderFooterSideMenuAdmin("Setting/Announcement.phtml",true,
    [
     
    ]);
   
      
   }
}
