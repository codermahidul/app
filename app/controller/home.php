<?php



class Home

{
    private $Main, $Curls;


    function __construct()

    {

        $this->Main = new Main;

        $this->Curls = new Curls;

        $this->Main->SetTitle("Hairizer");

        $this->Main->AddMetaDescription("Hairizer Website");

        

        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Home/Home.css?v='.VERSION.'">

        <link rel="stylesheet" href="' . VIEW_PATH . 'css/owl.carousel.min.css?v='.VERSION.'">

        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>

        ';



        $Js = '

        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

        <script type="module" src="' . VIEW_PATH . 'js/WebSite/Home.js?v='.VERSION.'"></script>

        <script type="module" src="' . VIEW_PATH . 'js/owl.carousel.min.js?v='.VERSION.'"></script>';

        

        $Header = 'WebSite/Layout/Header.phtml';

        $Footer = 'WebSite/Layout/Footer.phtml';



        $this->Main->SetCss($Css);

        $this->Main->SetJs($Js);

        $this->Main->SetHeaders($Header);

        $this->Main->SetFooter($Footer);

        $slider = $this->Curls->curl("slider/get", []);

        $products = $this->Curls->curl("product/getHome", ["admin_confirm"=>"1","trash"=>"0"]);

        $prizes = $this->Curls->curl("prize/getHome", ["admin_confirm"=>"1","trash"=>"0"]);

        $coupons = $this->Curls->curl("coupon/getHome", ["admin_confirm"=>"1","trash"=>"0"]);

        $deals = $this->Curls->curl("deals/getHome", ["admin_confirm"=>"1","trash"=>"0"]);

        $jobs = $this->Curls->curl("job/getHome", ["admin_confirm"=>"1","trash"=>"0"]);

        $programs = $this->Curls->curl("program/getHome", ["admin_confirm"=>"1","trash"=>"0"]);

        $users = $this->Curls->curl("user/getHome", ["admin_confirm"=>"1","trash"=>"0","number"=>"5"]);

        $businessUsers = $this->Curls->curl("userBusiness/getHome", ["admin_confirm"=>"1","trash"=>"0"]);







   

        $this->Main->CreateViewHeaderFooter("WebSite/Home.phtml", [

            "slider" => $slider,

            "products" => $products,

            "prizes" => $prizes,

            "coupons" => $coupons,

            "deals" => $deals,

            "jobs" => $jobs,

            "programs" => $programs,

            "users" => $users,

            "businessUsers" => $businessUsers,

            "url_product"=>"ProductDetail",

            "url_prize"=>"PrizeDetail",

            "url_coupon"=>"CouponDetail",

            "url_deals"=>"DealsDetail",

        ]);

    }

}

