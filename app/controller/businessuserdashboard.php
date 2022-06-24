<?php

class businessUserDashboard
{
    private $Main,$Curl;

    function __construct()
    {
        $this->Main=new Main;
        $this->Curl=new Curls;
        $this->Main->SetTitle("My Dashboard");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/Home/Home.css?v='.VERSION.'">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>';
        $Header='BusinessDashboard/Layout/Header.phtml';
        $Footer='BusinessDashboard/Layout/Footer.phtml';

        $Js='<script type="module" src="'.VIEW_PATH.'js/BusinessDashboard/Home.js?v='.VERSION.'"></script>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
        ';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        

        $info=$this->Curl->curl_with_token_business("userBusiness/getUserOnlineInfo",[],true);
        if($info->status=='true')
        $info=$info->data[0];

        $this->Main->CreateViewHeaderFooterSideMenuBusiness("BusinessDashboard/Home.phtml",true,[
            "info"=>$info
       ]);
    }

}

?>