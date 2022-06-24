<?php

class showCouponShopCodeForBusiness{
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

        $title="";
        $code="";
        $expire="";
        $description="";
        $image="";
        $imageBuyer="<span>No Image</span>";
        $BuyerName="";
        $product_title="";

        $data=$this->GetData->HandelToken("Coupon/getMyShopCodeCoupon",["idSearch"=>$idSearch],true);
   
        if($data->data->total>0)
        {
            $d=$data->data->data;
            $d=$d[0];
       
          $BuyerName=$d->buyer_display_name;  
          $title=$d->title;
          $code=$d->link_code;
          $expire=$d->expire;
          $description=$d->description;
          $product_title=$d->product_title;

          if ($d->deals_file_url !== '' && $d->deals_file_url !== null) {
                $image = URL_PATH . $d->deals_file_url . "/small" . "/" . $d->deals_file_name;
                $image = "<img class='sm-img-table' src='" . $image . "'>";
            }
            
            if ($d->buyer_file_url !== '' && $d->buyer_file_url !== null) {
                $imageBuyer = URL_PATH . $d->buyer_file_url . "/small" . "/" . $d->buyer_file_name;
                $imageBuyer = "<img class='sm-img-table' src='" . $image . "'>";
            }
        }
        
        $this->Main->CreateViewWithDataAuth("BusinessDashboard/Deals/ShopCodeBusiness.phtml",true,[
            "title"=>$title,
            "image"=>$image,
            "imageBuyer"=>$imageBuyer,
            "code"=>$code,
            "expire"=>$expire,
            "description"=>$description,
            "BuyerName"=>$BuyerName,
            "product_title"=>$product_title,
        ]);
    
       
    }
}
