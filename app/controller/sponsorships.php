<?php

class sponsorships
{
    private $Main, $Curls, $GetData;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->GetData = new GetData;

        $this->Main->SetTitle('Sponsorships');
        $this->Main->AddMetaNoIndex();

        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v='.VERSION.'">
        <link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Sponsor/Sponsorship.css?v='.VERSION.'">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>';
        $Header = 'WebSite/Layout/Header.phtml';
        $Footer = 'WebSite/Layout/Footer.phtml';

        $Js = '
        <script type="module" src="' . VIEW_PATH . 'js/WebSite/Sponsor/Sponsorships.js?v='.VERSION.'"></script>
        <script type="module" src="' . VIEW_PATH . 'js/functions/MouseDrag.js?v='.VERSION.'"></script>
        
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
        ';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);


      
        $dataType=$this->GetData->GetUserInfoLogged();
        $logged=$dataType['logged'];
        $user_online_id=$dataType['user_online_id'];
        $type_creator=$dataType['type_creator'];

        $proof = $this->GetData->GetProof("sponsorship");

  
        $this->Main->CreateViewHeaderFooter("WebSite/Sponsorships.phtml", [
          
            "logged" => $logged,
            "proof"=>$proof->data,
            "user_online_id" => $user_online_id,
            "type_creator" => $type_creator,
        ]);
    }
}
