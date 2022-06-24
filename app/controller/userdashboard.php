<?php

class UserDashboard
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

        $Header='UserDashboard/Layout/Header.phtml';
        $Footer='UserDashboard/Layout/Footer.phtml';

        $Js='<script type="module" src="'.VIEW_PATH.'js/UserDashboard/Home.js?v='.VERSION.'"></script>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
        ';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
        $winner= $this->Curls->curl("Lottery/getWinnerLottery", ["number"=>"3"]);
        $products= $this->Curls->curl("product/get", ["number"=>"10","trash"=>"0","admin_confirm"=>"1"]);
        $coupons= $this->Curls->curl("coupon/get", ["number"=>"10","trash"=>"0","admin_confirm"=>"1"]);
        $deals= $this->Curls->curl("deals/get", ["number"=>"10","trash"=>"0","admin_confirm"=>"1"]);
        $jobs= $this->Curls->curl("job/get", ["number"=>"10","trash"=>"0","admin_confirm"=>"1"]);


        $this->Main->CreateViewHeaderFooterSideMenu("UserDashboard/Home.phtml",true,[
           "winner"=>$winner,
           "product"=>$products,
           "coupon"=>$coupons,
           "deals"=>$deals,
           "jobs"=>$jobs,
           "url_product"=>"ProductDetail",
           "url_coupon"=>"CouponDetail",
           "url_deals"=>"DealsDetail",
           "url_job"=>"JobDetail",

       ]);
    }

}

?>