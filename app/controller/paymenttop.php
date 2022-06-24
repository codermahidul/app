<?php

class paymentTop
{
    private $Main, $Curls,$GetData;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->GetData=new GetData;

        $url = explode("/", $_SERVER['REQUEST_URI']);
        $id = $url[count($url) - 1];
       
        $parameter = ["idSearch" => $id, "payment" => "0"];
        $price = "0";

        $result = $this->Curls->curl("topShow/get", $parameter);
       


        if ($result->status == 'true') {
            $data = $result->data->data[0];
            $price = $data->price*$data->numbers;
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
            "table" => "top_show",
            "id" => $id,
            "email" => $email,
            "action" => URL_Domain."paymentAction",
        ],true);

    
    
            


     
      
    }
}
