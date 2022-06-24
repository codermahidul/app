<?php
class priceSetting
{
    private $Main,$Curls;
    function __construct()
   {
       $this->Main=new Main;
       $this->Curls=new Curls;
       $this->Main->SetTitle("Price Setting");
       $this->Main->AddMetaNoIndex();

       $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css?v="'.VERSION.'">';

       $Js='<script type="module" src="'.VIEW_PATH.'js/Admin/Setting/PriceSetting.js?v="'.VERSION.'></script>';
      
   
       $Header='Layout/Header.phtml';
       $Footer='Layout/Footer.phtml';

       $this->Main->SetJs($Js);
       $this->Main->SetCss($Css);
       $this->Main->SetHeaders($Header);
       $this->Main->SetFooter($Footer);
       
       $data=$this->Curls->curl("Fetch/GetSetting",[]);
      
       $this->Main->CreateViewHeaderFooterSideMenuAdmin("Setting/PriceSetting.phtml",true,
    [
        "data"=>$data->data,
    ]);
   
      
   }
}
