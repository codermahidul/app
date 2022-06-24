<?php

class paymentVerifyMyAccount
{
    private $Main, $Curls,$GetData,$type_online;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->GetData=new GetData;
        $this->type_online=$this->GetData->GetTypeOnline();

      
        $type = $this->GetData->GetTypeOnline();
        $data=$this->Curls->curl("Fetch/GetSetting",[]);

        $price=$data->data[0]->verify_price;
   
  



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
        

        $this->Main->CreateViewWithDataAuth("Payment/PaymentWithDiscount.phtml",true, [
            "price" => $price,
            "action" => "paymentActionVerifyAccount",
            "id" =>'',
            "userType" => $type,
            "logged" => $logged,
            "email" => $email,
            "table" => "user_business_verify",
        ]);
      
    }
}
