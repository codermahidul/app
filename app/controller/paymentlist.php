<?php

class paymentList
{
    private $Main, $GetData, $type_online;
    function __construct()
    {
        $this->Main = new Main;
        $this->GetData = new GetData;
        $this->type_online = $this->GetData->GetTypeOnline();

        $this->Main->SetTitle("My Payments");
        $this->Main->AddMetaNoIndex();

        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/UserDashboard/Forum/Forum.css?v=' . VERSION . '">
        <link rel="stylesheet" href="' . VIEW_PATH . 'css/fileinput/fileinput.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
        <link rel="stylesheet" href="' . VIEW_PATH . 'tokeniz/tokenize2.css">';

        $Js = '<script type="module" src="' . VIEW_PATH . 'js/fileinput/fileinput.js"></script>
        <script type="module" src="' . VIEW_PATH . 'js/CommonJs/Payment.js?v=' . VERSION . '"></script>';

        if ($this->type_online == "userBusiness") {
            $Header = 'BusinessDashboard/Layout/Header.phtml';
            $Footer = 'BusinessDashboard/Layout/Footer.phtml';
        }

        if ($this->type_online == "userProfessional") {
            $Header = 'ProfessionalDashboard/Layout/Header.phtml';
            $Footer = 'ProfessionalDashboard/Layout/Footer.phtml';
        }


        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);

        if ($this->type_online == "userBusiness") {
            $this->Main->CreateViewHeaderFooterSideMenuBusiness("CommonPage/PaymentList.phtml", true, [
                "creator_type" => "user_business"
            ]);
        }

        if ($this->type_online == "userProfessional") {
            $this->Main->CreateViewHeaderFooterSideMenuProfessional("CommonPage/PaymentList.phtml", true, [
                "creator_type" => "user_business"
            ]);
        }
  
    }
}
