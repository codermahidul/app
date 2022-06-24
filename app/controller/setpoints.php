<?php
class setPoints
{
    private $Main,$Curls;
    function __construct()
   {
       $this->Main=new Main;
       $this->Curls=new Curls;
       $this->Main->SetTitle("Set Points");
       $this->Main->AddMetaNoIndex();

       $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css">';

       $Js='<script type="module" src="'.VIEW_PATH.'js/Admin/Setting/SetPoint.js"></script>';
      
   
       $Header='Layout/Header.phtml';
       $Footer='Layout/Footer.phtml';

       $this->Main->SetJs($Js);
       $this->Main->SetCss($Css);
       $this->Main->SetHeaders($Header);
       $this->Main->SetFooter($Footer);
       
       $data=$this->Curls->curl("point/get",[]);
      
       $this->Main->CreateViewHeaderFooterSideMenuAdmin("Setting/SetPoints.phtml",true,
    [
        "data"=>$data->data,
    ]);
   
      
   }
}
