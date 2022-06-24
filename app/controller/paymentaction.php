<?php
(require_once 'app/controller/stripe-php/init.php');
//require_once('./stripe-php/init.php');
class paymentAction
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


        $status = "";
        $err = "";

        if (!empty($_POST['stripeToken'])) {
            $priceZeroByDiscount = false;
            $token = $_POST['stripeToken'];
            $name = $_POST['name'];
            $email = $_POST['email'];
            $item_id = $_POST['item_id'];
            $parameter = ["idSearch" => $item_id, "payment" => "0"];
            $price = '0';
            $userType = $_POST['userType'];
            $table_type = $_POST['table_type'];

            $result = $this->GetData->HandelToken("bannerOrder/getMyOrder", $parameter, true);
            if ($result->status == 'true') {
                $data = $result->data->data[0];
                $price = $data->numbers * $data->price;
            }


            if (isset($_POST['discount_code']) && $price > 0) {
                $price = $this->GetData->CalculatePriceDiscount($price, $_POST['discount_code'], "advertise");
                if ($price <= 0) {
                    $priceZeroByDiscount = true;

                    if ($table_type == "banner_order") {
                        $dataOrder = ["idSearch" => $item_id, "payment" => "1"];
                        $this->GetData->HandelToken("bannerOrder/updateBannerOrder", $dataOrder);
                    }

                    if ($table_type == "top_show") {
                        $dataOrder = ["idSearch" => $item_id, "payment" => "1"];
                        $this->GetData->HandelToken("bannerOrder/updateBannerOrder", $dataOrder);
                    }
                }
            }

            \Stripe\Stripe::setApiKey(STRIPE_KEY);
            if ($price > 0) {
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

                    //$itemPrice = 25 * 10;
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
                            "creator_type" => $userType
                        ];

                        $this->GetData->HandelToken("Payment/addBannerPayment", $dataPayment);


                        if ($table_type == "banner_order") {
                            $dataOrder = ["idSearch" => $item_id, "payment" => "1"];
                            $this->GetData->HandelToken("bannerOrder/updateBannerOrder", $dataOrder);
                        }

                        if ($table_type == "top_show") {
                            $dataOrder = ["idSearch" => $item_id, "payment" => "1"];
                            $this->GetData->HandelToken("bannerOrder/updateBannerOrder", $dataOrder);
                        }
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
            } else {
                if ($priceZeroByDiscount) {
                    $status = 'true';
                    $err = "";
                } else {
                    $status = 'false';
                    $err = "No data found for this deal";
                }
            }
        }

        $this->Main->SetCss($Css);
        $this->Main->SetJs($Js);

        $onlineType = $this->GetData->GetTypeOnline();

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
