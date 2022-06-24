<?php 

class contactWithUs{

    private $Main, $Curls, $GetData;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->GetData = new GetData;

        $this->Main->SetTitle('ContactWithUs');
        $this->Main->AddMetaNoIndex();

        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v='.VERSION.'">
     
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>';
        $Header = 'WebSite/Layout/Header.phtml';
        $Footer = 'WebSite/Layout/Footer.phtml';

        $Js = '
        <script type="module" src="' . VIEW_PATH . 'js/WebSite/List/ContactUs.js?v='.VERSION.'"></script>
        ';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);

        $this->Main->CreateViewHeaderFooter("WebSite/ContactWithUs.phtml", [
           
        ]);
    }
}


?>