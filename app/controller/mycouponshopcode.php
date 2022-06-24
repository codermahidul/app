<?php

class MyCouponShopCode{
    private $Main,$GetData;
     function __construct()
    {
        $this->Main=new Main;
        $this->GetData=new GetData;

        $this->Main->SetTitle("Card");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v='.VERSION.'">
        ';

        $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
       ';
       
     
        $Header='UserDashboard/Layout/Header.phtml';
        $Footer='UserDashboard/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);

     

        $urlS=explode("/",$_SERVER['REQUEST_URI']);
        $idSearch=$urlS[count($urlS)-1];

        $url="";
        $title="";
        $code="";
        $expire="";
        $description="";

        $data=$this->GetData->HandelToken("coupon/getShopCode",["idSearch"=>$idSearch],true);
   
        if($data->data->total>0)
        {
            $d=$data->data->data;
            $d=$d[0];
       

          $url=URL_Domain."ShowCouponShopCodeForBusiness/".$idSearch;
          $title=$d->title;
          $code=$d->link_code;
          $expire=$d->expire;
          $description=$d->description;
        }
        
        $this->Main->CreateViewWithDataAuth("UserDashboard/Deals/MyShopCode.phtml",true,[
            "url"=>urlencode($url),
            "title"=>$title,
            "code"=>$code,
            "expire"=>$expire,
            "description"=>$description,
        ]);
    
       
    }
}



?>