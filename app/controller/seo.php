<?php
class seo
{
    private $Main,$Curls;
    function __construct()
   {
       $this->Main=new Main;
       $this->Curls=new Curls;
       $this->Main->SetTitle("Set Seo");
       $this->Main->AddMetaNoIndex();

       $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css?v='.VERSION.'">';

       $Js='<script type="module" src="'.VIEW_PATH.'js/Admin/Setting/Seo.js?v='.VERSION.'"></script>';
      
   
       $Header='Layout/Header.phtml';
       $Footer='Layout/Footer.phtml';

       $this->Main->SetJs($Js);
       $this->Main->SetCss($Css);
       $this->Main->SetHeaders($Header);
       $this->Main->SetFooter($Footer);
       
       $data=$this->Curls->curl("seo/get",[]);
      
       $this->Main->CreateViewHeaderFooterSideMenuAdmin("Setting/Seo.phtml",true,
    [
        "data"=>$data->data,
    ]);
   
      
   }
}
