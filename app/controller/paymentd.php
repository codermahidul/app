<?php

class paymentD
{
    private $Main, $Curls, $GetData;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->GetData = new GetData;

        
        $this->Main->AddMetaNoIndex();

        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v=' . VERSION . '">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>';
        $Header = 'WebSite/Layout/Header.phtml';
        $Footer = 'WebSite/Layout/Footer.phtml';

        $Js = '<script type="module" src="' . VIEW_PATH . 'js/WebSite/List/List.js?v=' . VERSION . '"></script>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);


        $url = explode("/", $_SERVER['REQUEST_URI']);
        $idSearch = $url[count($url) - 1];
        $data = [];

        $price = '0';
        $response = $this->Curls->curl("deals/get", ["trash" => "0", "admin_confirm" => "1", "idSearch" => $idSearch]);
        if ($response->status == "true") {

            $data = $response->data->data[0];
            $price = $data->price;
        }

        

        $logged = 'false';
        $user_online_id = "0";
        $type = $this->GetData->GetTypeOnline();
        if ($type != '') {
            $logged = 'true';
        
            $user = $this->GetData->HandelToken("userBusiness/getUserOnlineInfo", [], true);
            $email = $user->data[0]->email;
            $user_online_id = $user->data[0]->id;
            
        }
   
        if($logged=='false')
        {
            $this->Main->CreateViewHeaderFooter("GoToLogin.html");
            return false;
        }


        $this->Main->CreateViewHeaderFooter("Payment/PaymentWithDiscount.phtml", [
            "data" => $data,
            "price" => $price,
            "logged" => $logged,
            "user_online_id" => $user_online_id,
            "type_creator" => $type,
            "table" => "deals",
            "id" => $idSearch,
            "email" => $email,
            "action" => URL_Domain."paymentActionDeals",
        ],true);
    }
}
