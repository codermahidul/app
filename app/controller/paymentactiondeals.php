<?php
(require_once 'app/controller/stripe-php/init.php');
class paymentActionDeals
{
    private $Main, $Curls,$GetData;

    function __construct()
    {

        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->GetData = new GetData;

        $this->Main->SetTitle("Payment");
        $this->Main->AddMetaNoIndex();

        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v=' . VERSION . '">';
        $Js = '<script type="module" src="' . VIEW_PATH . 'js/WebSite/List/Network.js?v=' . VERSION . '"></script>';

        $status = "";
        $err = "";

       
        if (!empty($_POST['stripeToken'])) {

            $token = $_POST['stripeToken'];
            $email = $_POST['email'];

            $priceZeroByDiscount=false;
            $item_id = $_POST['item_id'];
            $userType = $_POST['userType'];
            $table_type = $_POST['table_type'];
            $deals=$this->Curls->curl("deals/get",["idSearch"=>$item_id,"admin_confirm"=>"1","trash"=>"0"]);
            $deals=$deals->data->data[0];
            $price=$deals->price;
            $codeLink=$this->Curls->curl("deals/GetLinkCode",["deals_id"=>$item_id,"used"=>"1"]);
            $code=0;
            if($codeLink->data->total>0 ){
                $code=$codeLink->data->data[0];
                $code=$code->id;
            }
        
   
            if (isset($_POST['discount_code']) && $price>0) {
                $price = $this->GetData->CalculatePriceDiscount($price, $_POST['discount_code'], "deals");
                var_dump($price);
                if($price<=0){
                    $priceZeroByDiscount=true;
  
                    $this->GetData->HandelToken("deals/AddDealsShop",[
                        "deals_link_code_id"=>$code,
                        "price"=>$price
                    ]);
                }
            }
            
            if($codeLink->data->total>0 && $price>0)
            {

                \Stripe\Stripe::setApiKey(STRIPE_KEY);

                try {
                  
                    $customer = \Stripe\Customer::create([
                        'email' => $email,
                        'source' => $token
                    ]);
                } catch (Exception $e) {
                    $api_error = $e->getMessage();
                    $status = 'false';
                    $err = $api_error;
                }
       
                if (empty($api_error) && $customer) {
                  
                    $itemPrice = $price;
                    $charge = \Stripe\Charge::create([
                        "customer" => $customer->id,
                        "amount" => $itemPrice,
                        "currency" => "USD",
                        "description" => "description first",
                    ]);
                    $chargeJson = $charge->jsonSerialize();
    
               
                    if ($chargeJson['paid'] && $chargeJson['status'] == 'succeeded') {
                        $status = 'true';
                        $err = "";
                        $dataPayment = [
                            "transActionId" => $chargeJson['balance_transaction'],
                            "paidAmount" => $chargeJson['amount'],
                            "currency" => $chargeJson['currency'],
                            "status" => $chargeJson['status'],
                            "creator_type" => $userType,
                            "table_type"=>$table_type,
                            "item_id"=>$item_id,
                        ];
                 
                        $this->GetData->HandelToken("Payment/addPayment", $dataPayment);
                        $fg=$this->GetData->HandelToken("deals/AddDealsShop",[
                            "deals_link_code_id"=>$code,
                            "price"=>$price
                        ]);
    
                    } else {
                        $status = 'false';
                        $err = "Payment failed";
                    }
                    try {
                    } catch (Exception $e) {
                        $api_error = $e->getMessage();
                        $status = 'false';
                        $err = $api_error;
                    }
                }

            }else
            {
                if($priceZeroByDiscount){
                    $status = 'true';
                    $err = "";
                }else
                {
                    $status = 'false';
                    $err = "No data found for this deal";
                }
              
            }

          
        }

        $this->Main->SetCss($Css);
        $this->Main->SetJs($Js);
        $onlineType=$this->GetData->GetTypeOnline();

        if ($onlineType == "userBusiness") {
            $Header = 'BusinessDashboard/Layout/Header.phtml';
            $Footer = 'BusinessDashboard/Layout/Footer.phtml';

            $this->Main->SetHeaders($Header);
            $this->Main->SetFooter($Footer);
            $this->Main->CreateViewHeaderFooterSideMenuBusiness("Payment/Result.phtml", true, [
                "status" => $status,
                "err" => $err,
            ]);
        } 
        if ($onlineType == "userBusiness") {
            $Header = 'BusinessDashboard/Layout/Header.phtml';
            $Footer = 'BusinessDashboard/Layout/Footer.phtml';

            $this->Main->SetHeaders($Header);
            $this->Main->SetFooter($Footer);
            $this->Main->CreateViewHeaderFooterSideMenuBusiness("Payment/Result.phtml", true, [
                "status" => $status,
                "err" => $err,
            ]);
        } 
        if ($onlineType == "userProfessional") {
            $Header = 'ProfessionalDashboard/Layout/Header.phtml';
            $Footer = 'ProfessionalDashboard/Layout/Footer.phtml';

            $this->Main->SetHeaders($Header);
            $this->Main->SetFooter($Footer);
            $this->Main->CreateViewHeaderFooterSideMenuProfessional("Payment/Result.phtml", true, [
                "status" => $status,
                "err" => $err,
            ]);
        }
        if ($onlineType == "user") {
            $Header = 'UserDashboard/Layout/Header.phtml';
            $Footer = 'UserDashboard/Layout/Footer.phtml';

            $this->Main->SetHeaders($Header);
            $this->Main->SetFooter($Footer);
            $this->Main->CreateViewHeaderFooterSideMenu("Payment/Result.phtml", true, [
                "status" => $status,
                "err" => $err,
            ]);
        }  
    }
}
