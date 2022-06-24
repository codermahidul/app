<?php

class payment
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
        $type = $url[count($url) - 2];
        $parameter = ["idSearch" => $id, "payment" => "0"];
        $price = "0";
        $Header = 'WebSite/Layout/Header.phtml';
        $Footer = 'WebSite/Layout/Footer.phtml';

        $result = $this->GetData->HandelToken("bannerOrder/getMyOrder", $parameter,true);

        if ($result->status == 'true') {
            $data = $result->data->data[0];
         
            $price =$data->numbers* $data->price;
        }


        $this->Main->SetTitle("Payment");
        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v=' . VERSION . '">';
        $Js = '';


        $this->Main->SetCss($Css);
        $this->Main->SetJs($Js);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);


        $email="";
        

    


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
            "table" => "banner_order",
            "id" => $id,
            "email" => $email,
            "action" => URL_Domain."paymentAction",
        ],true);

     
      
    }
}
