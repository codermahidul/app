<?php

class paymentSponsorship
{
    private $Main, $Curls,$GetData,$type_online;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->GetData=new GetData;
        $this->type_online=$this->GetData->GetTypeOnline();


        $url = explode("/", $_SERVER['REQUEST_URI']);
        $id = $url[count($url) - 1];
        $type = $this->GetData->GetTypeOnline();
        $price=$this->GetData->CalculatePriceSponsorship($id);
   
  
        $type = $this->GetData->GetTypeOnline();
        if ($type != '') {
            $logged = 'true';
           
            $user = $this->GetData->HandelToken("userBusiness/getUserOnlineInfo", [], true);
            $email = $user->data[0]->email;
            $user_online_id = $user->data[0]->id;
            
        }


        $this->Main->SetTitle("Payment");
        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v=' . VERSION . '">';
        $Js = '';

        $Header = 'WebSite/Layout/Header.phtml';
        $Footer = 'WebSite/Layout/Footer.phtml';

        $this->Main->SetCss($Css);
        $this->Main->SetJs($Js);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);


        
        $this->Main->CreateViewHeaderFooter("Payment/PaymentWithDiscount.phtml", [
            "data" =>[],
            "price" => $price,
            "logged" => $logged,
            "user_online_id" => $user_online_id,
            "type_creator" => $type,
            "table" => "sponsorship_request",
            "id" => $id,
            "email" => $email,
            "action" => URL_Domain."paymentActionSponsorship",
        ],true);

        // $this->Main->CreateViewWithDataAuth("Payment/Payment.phtml",true, [
        //     "price" => $price,
        //     "action" => "paymentActionSponsorship",
        //     "id" => $id,
        //     "userType" => $type,
        //     "email" => $email,
        //     "table" => "sponsorship_request",
        // ]);
      
    }
}
