<?php

class Winners
{
    private $Main, $Curls,$GetData;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->GetData = new GetData;
        
        $this->Main->SetTitle("Winners List");
        $this->Main->AddMetaDescription("Winners List.");
        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v='.VERSION.'">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>';

        $Js = '<script type="module" src="' . VIEW_PATH . 'js/WebSite/List/Winner.js?v='.VERSION.'"></script>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>';
        
        $Header = 'WebSite/Layout/Header.phtml';
        $Footer = 'WebSite/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);


        $data = [];
      

        $data2 = $this->Curls->curl("Lottery/getWinnerLottery", []);
        $haveMore = false;
        if ($data2->status == "true") {
            $total = $data2->data->total;

            if ($total > '30') {
                $haveMore = true;
            }
            $data = array_merge($data, $data2->data->data);
        }
 
        $bigBanner=$this->GetData->GetBigBanner("winner");
        $this->Main->CreateViewHeaderFooter(
            "WebSite/ListsNWithoutSearch.phtml",
            [
                "data" => $data,
                "idNotIn" => "",
                "haveMore" => $haveMore,
                "url" => "PrizeDetail",
                "type_shows"=>"winner",
                "title_page"=>"Winner List",
                "category_search"=>"false",
                "bigBanner"=>$bigBanner->data->data,
            ]
        );
    }
}
