<?php

class coupons
{
    private $Main, $Curls,$GetData;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->GetData = new GetData;

        $this->Main->SetTitle("Coupons List");
        $this->Main->AddMetaDescription("Hairizer Coupon List");
        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v='.VERSION.'">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
        <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">';

        $Js = '<script type="module" src="' . VIEW_PATH . 'js/WebSite/List/Coupon.js?v='.VERSION.'"></script>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>';
        
        $Header = 'WebSite/Layout/Header.phtml';
        $Footer = 'WebSite/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);


        $data = [];
      
        $city_id="";
        if(isset($_COOKIE['rate_cityChoose'])){
            $city_id=$_COOKIE['rate_cityChoose'];
        }

        $pr1=["payment"=>"1","trash" => "0", "admin_confirm" => "1"];
        if($city_id !=="")
        {
            $pr1['city_id']=$city_id;
        }
        $data1 = $this->Curls->curl("coupon/getTop",$pr1);
        if ($data1->status == "true") {
            $data = array_merge($data, $data1->data->data);
            /////set static coupon load
            $ids = [];
            foreach ($data as $ddd) {
                array_push($ids, $ddd->id);
            }

            $idNotIn = implode(",", $ids);
        }

        $pr2= ["trash" => "0", "admin_confirm" => "1","idNotIn" => $idNotIn];
        if($city_id !=="")
        {
            $pr2['city_id']=$city_id;
        }
        $data2 = $this->Curls->curl("coupon/get",$pr2);
        $haveMore = false;
        if ($data2->status == "true") {
            $total = $data2->data->total;

            if ($total > '30') {
                $haveMore = true;
            }
            $data = array_merge($data, $data2->data->data);
        }
 
        $bigBanner=$this->GetData->GetBigBanner("coupon");

        $this->Main->CreateViewHeaderFooter(
            "WebSite/ListsN.phtml",
            [
                "data" => $data,
                "idNotIn" => $idNotIn,
                "haveMore" => $haveMore,
                "url_coupon" => "CouponDetail",
                "type_shows"=>"coupon",
                "title_page"=>"Coupon List",
                "category_search"=>"false",
                "category_search_more"=>"true",
                "total"=>$total,
                "bigBanner"=>$bigBanner->data->data,
                "city_search"=>"true",
            ]
        );
    }
}
