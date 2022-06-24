<?php

class networks
{

    private $Main, $Curls,$GetData;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->GetData = new GetData;

        $this->Main->SetTitle("Networks");
        $this->Main->AddMetaDescription("Networks List.");
        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v='.VERSION.'">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>';

        $Js = '<script type="module" src="' . VIEW_PATH . 'js/WebSite/List/Store.js?v='.VERSION.'"></script>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>';
        
        $Header = 'WebSite/Layout/Header.phtml';
        $Footer = 'WebSite/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);


        $data = [];
        $data1 = $this->Curls->curl("UserBusiness/getTop", ["payment"=>"1","trash" => "0"]);
        if ($data1->status == "true") {
            $data = array_merge($data, $data1->data->data);
            /////set static UserBusiness load
            $ids = [];
            foreach ($data as $ddd) {
                array_push($ids, $ddd->id);
            }

            $idNotIn = implode(",", $ids);
        }

        $data2 = $this->Curls->curl("UserBusiness/get", [ "idNotIn" => $idNotIn]);
        $haveMore = false;
        if ($data2->status == "true") {
            $total = $data2->data->total;

            if ($total > '30') {
                $haveMore = true;
            }
            $data = array_merge($data, $data2->data->data);
        }

        $bigBanner=$this->GetData->GetBigBanner("network");

        $this->Main->CreateViewHeaderFooter(
            "WebSite/ListsN.phtml",
            [
                "data" => $data,
                "idNotIn" => $idNotIn,
                "haveMore" => $haveMore,
                "url" => "",
                "type_shows"=>"user",
                "title_page"=>"Businesses List",
                "category_search"=>"false",
                "total"=>($total+$data1->data->total),
                "bigBanner"=>$bigBanner->data->data,
                "user_type"=>"1",
            ]
        );
    }
}
