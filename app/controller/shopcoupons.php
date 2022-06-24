<?php

class shopCoupons
{
    private $Main, $Curls, $GetData;

    function __construct()
    {

        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->GetData = new GetData;

        $this->Main->SetTitle("shop coupon");
        $this->Main->AddMetaNoIndex();

        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v=' . VERSION . '">';
        $Js = '<script type="module" src="' . VIEW_PATH . 'js/WebSite/List/Network.js?v=' . VERSION . '"></script>';

        $status = "";
        $err = "";

        $url=explode("/",$_SERVER['REQUEST_URI']);
        $item_id=$url[count($url)-1];


        $deals = $this->Curls->curl("coupon/get", ["idSearch" => $item_id, "admin_confirm" => "1", "trash" => "0"]);
        $deals = $deals->data->data[0];
        $codeLink = $this->Curls->curl("coupon/GetLinkCode", ["coupon_id" => $item_id, "used" => "1"]);
        $code = 0;
        if ($codeLink->data->total > 0) {
            $code = $codeLink->data->data[0];
            $code = $code->id;
        }

       $this->GetData->HandelToken("coupon/ShopCode", [
            "idSearch" => $item_id,
            "idSearchLink" => $code,
  
        ]);

      

        $this->Main->SetCss($Css);
        $this->Main->SetJs($Js);
        $onlineType = $this->GetData->GetTypeOnline();

        if($onlineType==""){
            $this->Main->CreateView("GoToLogin.html");
        }

        if ($onlineType == "user") {
            header('Location: '.URL_Domain.'UserShopCouponList');

        }

        if ($onlineType == "userProfessional") {
            header('Location: '.URL_Domain.'ProfessionalShopCouponsList');

        }
        
        if ($onlineType == "userBusiness") {
            header('Location: '.URL_Domain.'BusinessShopCouponsList');

        }
        
    }
}
