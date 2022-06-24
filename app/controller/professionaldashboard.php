<?php

class professionalDashboard
{
    private $Main,$Curls;

    function __construct()
    {
        $this->Main=new Main;
        $this->Curls=new Curls;
        $this->Main->SetTitle("My Dashboard");
        $this->Main->AddMetaNoIndex();

        $Css='
        <link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/Home/Home.css?v='.VERSION.'">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
        ';

        $Header='ProfessionalDashboard/Layout/Header.phtml';
        $Footer='ProfessionalDashboard/Layout/Footer.phtml';

        $Js='<script type="module" src="'.VIEW_PATH.'js/UserDashboard/Home.js?v='.VERSION.'"></script>
        <script type="module" src="'.VIEW_PATH.'js/ProfessionalDashboard/Home.js?v='.VERSION.'"></script>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
        ';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
  
        $winner= $this->Curls->curl("Lottery/getWinnerLottery", ["number"=>"3"]);
        $products= $this->Curls->curl("product/get", ["number"=>"10","trash"=>"0","admin_confirm"=>"1"]);
        $coupons= $this->Curls->curl("coupon/get", ["number"=>"10","trash"=>"0","admin_confirm"=>"1"]);
        $business=$this->Curls->curl_with_token_professional("BusinessWorked/getMyWorks",["status"=>"1","number"=>"1000"]);



        $this->Main->CreateViewHeaderFooterSideMenuProfessional("ProfessionalDashboard/Home.phtml",true,[
           "winner"=>$winner,
           "product"=>$products,
           "coupon"=>$coupons,
           "business"=>$business,
           "url_product"=>"ProductDetail",
           "url_coupon"=>"CouponDetail",

       ]);
    }

}

?>