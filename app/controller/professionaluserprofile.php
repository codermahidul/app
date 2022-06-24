<?php

class professionalUserProfile
{
    private $Main,$Curl;

    function __construct()
    {
        $this->Main=new Main;
        $this->Curl=new Curls;
        $this->Main->SetTitle("Professional User ");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/Home/Home.css?v='.VERSION.'">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
        <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">';
        $Header='ProfessionalDashboard/Layout/Header.phtml';
        $Footer='ProfessionalDashboard/Layout/Footer.phtml';

        $Js='<script type="module" src="'.VIEW_PATH.'js/ProfessionalDashboard/Profile/Profile.js?v='.VERSION.'"></script>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
        <script type="module" src="'.VIEW_PATH.'tokeniz/tokenize2.js"></script>
        ';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        

        $info=$this->Curl->curl_with_token_professional("userBusiness/getUserOnlineInfo",[],true);
        if($info->status=='true')
        $info=$info->data[0];

        $this->Main->CreateViewHeaderFooterSideMenuProfessional("ProfessionalDashboard/User/Profile.phtml",true,[
            "info"=>$info
       ]);
    }

}

?>