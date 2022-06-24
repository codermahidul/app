<?php

class about
{
    private $Main, $Curls;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls = new Curls;

        $this->Main->SetTitle("About us");
        $this->Main->AddMetaNoIndex();
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


      

        $data = $this->Curls->curl("Fetch/GetDataPage", []);
       
    
        $this->Main->CreateViewHeaderFooter(
            "WebSite/About.phtml",
            [
                "data" => $data->data,
            ]
        );
    }
}
