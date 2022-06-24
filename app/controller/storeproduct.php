<?php

class storeProduct
{
    private $Main, $Curls,$GetData;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->GetData = new GetData;

        $this->Main->SetTitle("Product List");
        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css">';

        $Js = '<script type="module" src="' . VIEW_PATH . 'js/WebSite/List/Product.js"></script>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>';

        $Header = 'WebSite/Layout/Header.phtml';
        $Footer = 'WebSite/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);


        $url = explode("/", $_SERVER['REQUEST_URI']);
        $display_name_slug = $url[count($url) - 1];
        $data = [];
        $data1 = $this->Curls->curl("product/getTop", ["display_name_slug" => $display_name_slug]);
        if ($data1->status == "true") {
            $data = array_merge($data, $data1->data->data);
            /////set static product load
            $ids = [];
            foreach ($data as $ddd) {
                array_push($ids, $ddd->id);
            }

            $idNotIn = implode(",", $ids);
        }

        $data2 = $this->Curls->curl("product/get", [
            "trash" => "0",
            "admin_confirm" => "1",
            "display_name_slug" => $display_name_slug,
            "idNotIn" => $idNotIn,

            "category_search"=>"true",
        ]);
        $haveMore = false;
        if ($data2->status == "true") {
            $total = $data2->data->total;

            if ($total > '30') {
                $haveMore = true;
            }
            $data = array_merge($data, $data2->data->data);
        }

        $bigBanner=$this->GetData->GetBigBanner("StoreProduct");

        $this->Main->CreateViewHeaderFooter(
            "WebSite/ListsP.phtml",
            [
                "data" => $data,
                "idNotIn" => $idNotIn,
                "haveMore" => $haveMore,
                "display_name_slug"=>$display_name_slug,
                "url_product" => "ProductDetail",
                "type_shows" => "product",
                "title_page" => "Product List",
                "category_search" => "true",
                "have_price"=>"1",
                "have_rating"=>"1",
                "bigBanner"=>$bigBanner->data->data,

            ]
        );
    }
}
