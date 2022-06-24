<?php

class prizes
{
    private $Main, $Curls;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls = new Curls;

        $this->Main->SetTitle("Prize List");
        $this->Main->AddMetaDescription("Hairizer Prize List");
        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v='.VERSION.'">';

        $Js = '<script type="module" src="' . VIEW_PATH . 'js/WebSite/List/Prize.js?v='.VERSION.'"></script>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>';
        
        $Header = 'WebSite/Layout/Header.phtml';
        $Footer = 'WebSite/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);


        $data = [];
      
        $data1 = $this->Curls->curl("prize/getTop", ["payment"=>"1","trash" => "0", "admin_confirm" => "1"]);
        if ($data1->status == "true") {
            $data = array_merge($data, $data1->data->data);
            /////set static prize load
            $ids = [];
            foreach ($data as $ddd) {
                array_push($ids, $ddd->id);
            }

            $idNotIn = implode(",", $ids);
        }

        $data2 = $this->Curls->curl("prize/get", ["trash" => "0", "admin_confirm" => "1","idNotIn" => $idNotIn]);
        $haveMore = false;
        if ($data2->status == "true") {
            $total = $data2->data->total;

            if ($total > '30') {
                $haveMore = true;
            }
            $data = array_merge($data, $data2->data->data);
        }
 
        $bigBanner=$this->Curls->curl("BannerOrder/getRand",["section_name"=>"prize",""]);

        $this->Main->CreateViewHeaderFooter(
            "WebSite/ListsNWithoutSearch.phtml",
            [
                "data" => $data,
                "idNotIn" => $idNotIn,
                "haveMore" => $haveMore,
                "url_prize" => "PrizeDetail",
                "type_shows"=>"prize",
                "title_page"=>"Prize List",
                "category_search"=>"false",
                "total"=>$total,
                "bigBanner"=>$bigBanner->data->data,
            ]
        );
    }
}
