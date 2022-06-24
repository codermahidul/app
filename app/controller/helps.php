<?php

class helps
{
    private $Main, $Curls;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls = new Curls;

        $this->Main->SetTitle("Help List");
        $this->Main->AddMetaDescription("Help List.");
        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v='.VERSION.'">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>';

        $Js = '<script type="module" src="' . VIEW_PATH . 'js/WebSite/List/Helps.js?v='.VERSION.'"></script>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>';
        
        $Header = 'WebSite/Layout/Header.phtml';
        $Footer = 'WebSite/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);


        $data = [];
      

        $data2 = $this->Curls->curl("help/get", []);
        $haveMore = false;
        if ($data2->status == "true") {
            $total = $data2->data->total;

            if ($total > '30') {
                $haveMore = true;
            }
            $data = array_merge($data, $data2->data->data);
        }
 
        $category=$this->Curls->curl("category/get",["type"=>"faq","number"=>"10000"], true);
        $category=$category->data->data;
   
        $this->Main->CreateViewHeaderFooter(
            "WebSite/Helps.phtml",
            [
                "data" => $data,
                "haveMore" => $haveMore,
                "title_page"=>"Help List",
                "category"=>$category,
            ]
        );
    }
}
