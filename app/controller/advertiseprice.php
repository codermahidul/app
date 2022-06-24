<?php
class advertisePrice
{
    private $Main,$Curls;
    function __construct()
   {
       $this->Main=new Main;
       $this->Curls=new Curls;
       $this->Main->AddMetaNoIndex();
       $this->Main->SetTitle("Advertise Price");
       $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css?v='.VERSION.'">
       <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">';

       $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
       <script type="module" src="'.VIEW_PATH.'js/Admin/Setting/AdvertisePrice.js?v='.VERSION.'"></script>';
      
   
       $Header='Layout/Header.phtml';
       $Footer='Layout/Footer.phtml';

       $this->Main->SetJs($Js);
       $this->Main->SetCss($Css);
       $this->Main->SetHeaders($Header);
       $this->Main->SetFooter($Footer);
       
       $section=$this->Curls->curl("Section/get",["show_list"=>"1"]);
       $AdListPrice=$this->Curls->curl("Section/getAdListPrice",[],true);
  
       $this->Main->CreateViewHeaderFooterSideMenuAdmin("Setting/AdvertisePrice.phtml",true,
    [
        "section"=>$section->data->data,
        "AdListPrice"=>$AdListPrice->data->data,
    ]);
   
      
   }
}

?>