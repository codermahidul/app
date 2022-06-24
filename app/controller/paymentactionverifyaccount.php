<?php
(require_once 'app/controller/stripe-php/init.php');
class paymentActionVerifyAccount
{
    private $Main, $Curls, $GetData;

    function __construct()
    {

        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->GetData = new GetData;

        $this->Main->SetTitle("Payment");
        $this->Main->AddMetaNoIndex();

        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v=' . VERSION . '">';
        $Js = '<script type="module" src="' . VIEW_PATH . 'js/WebSite/List/Network.js?v=' . VERSION . '"></script>';
        $this->Main->SetCss($Css);
        $this->Main->SetJs($Js);
        $status = "";
        $err = "";


        if (!empty($_POST['stripeToken'])) {

            $token = $_POST['stripeToken'];
            $email = $_POST['email'];


            $item_id = $_POST['item_id'];
            $userType = $_POST['userType'];
            $table_type = $_POST['table_type'];

            $data = $this->Curls->curl("Fetch/GetSetting", []);

            $price = $data->data[0]->verify_price;

            if (isset($_POST['discount_code'])) {
                $price = $this->GetData->CalculatePriceDiscount($price, $_POST['discount_code'], "business_verify");
                if ($price <= 0) {
                    $this->GetData->HandelToken("UserBusiness/AddUpdateVerify", []);
                    if ($userType == "Business") {
                        $Header = 'BusinessDashboard/Layout/Header.phtml';
                        $Footer = 'BusinessDashboard/Layout/Footer.phtml';
            
                        $this->Main->SetHeaders($Header);
                        $this->Main->SetFooter($Footer);
                        $this->Main->CreateViewHeaderFooterSideMenuBusiness("Payment/Result.phtml", true, [
                            "status" => $status,
                            "err" => $err,
                        ]);
                    } else {
            
                        $Header = 'UserDashboard/Layout/Header.phtml';
                        $Footer = 'UserDashboard/Layout/Footer.phtml';
                        $this->Main->SetHeaders($Header);
                        $this->Main->SetFooter($Footer);
                        $this->Main->CreateViewHeaderFooterSideMenu("Payment/Payment.phtml", true, [
                            "status" => $status,
                            "err" => $err,
                        ]);
                    }
                    return false;
                }
            }


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
                        "table_type" => $table_type,
                        "item_id" => $item_id,
                    ];

                    $this->GetData->HandelToken("Payment/addPayment", $dataPayment);

                    $this->GetData->HandelToken("UserBusiness/AddUpdateVerify", []);
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
        }


        if ($userType == "Business") {
            $Header = 'BusinessDashboard/Layout/Header.phtml';
            $Footer = 'BusinessDashboard/Layout/Footer.phtml';

            $this->Main->SetHeaders($Header);
            $this->Main->SetFooter($Footer);
            $this->Main->CreateViewHeaderFooterSideMenuBusiness("Payment/Result.phtml", true, [
                "status" => $status,
                "err" => $err,
            ]);
        } else {

            $Header = 'UserDashboard/Layout/Header.phtml';
            $Footer = 'UserDashboard/Layout/Footer.phtml';
            $this->Main->SetHeaders($Header);
            $this->Main->SetFooter($Footer);
            $this->Main->CreateViewHeaderFooterSideMenu("Payment/Payment.phtml", true, [
                "status" => $status,
                "err" => $err,
            ]);
        }
    }
}
