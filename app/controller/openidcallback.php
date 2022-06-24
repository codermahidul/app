<?php
class openidCallback
{
    private $Main, $Curls, $Google;
    function __construct()
    {


        $this->Main = new Main;
        $this->Google = new Google();
        $this->Curls = new Curls;

        $this->Main->SetTitle("Login");
        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/Auth/Auth.css?v=' . VERSION . '">';
        $Js = '<script type="module" src="' . VIEW_PATH . 'js/Auth/RegisterAfterApiLogin.js?v=' . VERSION . '"></script>';
        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);


        $uData = (parse_url(urldecode($_SERVER['REQUEST_URI'])));
        $query = explode("&", $uData['query']);
        $code = explode("code=", $query[0]);
        $code = $code[1];

        if (isset($code)) {
            $UserData = $this->Google->GetUserData($code);
            if ($UserData) {

                $email =  $UserData->email;
                $name =  $UserData->name;
                $data = $this->Curls->curl("UserBusiness/get", ["email" => $email], true);
                $total = $data->data->total;
                if ($total > 0) {
                    $response = $this->Curls->curl("userBusiness/loginAuthApi", ["email" => $email], true);
                    $userData = $response->userData;
                    switch ($userData->type) {
                        case "professional": {
                                setcookie("professional_token", $response->data, time() + (86400 * 365), "/");
                                $href = "ProfessionalDashboard";
                                break;
                            }

                        case "business": {
                                $href = "BusinessUserDashboard";
                                setcookie("bussiness_token", $response->data, time() + (86400 * 365), "/");
                                break;
                            }

                        case "user": {
                                $href = "UserDashboard";
                                setcookie("token", $response->data, time() + (86400 * 365), "/");
                                break;
                            }

                        case "team": {
                                $href = "TeamProfile";
                                setcookie("team_token", $response->data, time() + (86400 * 365), "/");
                                break;
                            }

                        case "admin": {
                                $href = "AdminDashboard";
                                setcookie("tokeAdmin", $response->data, time() + (86400 * 365), "/");
                                break;
                            }
                    }
                    $this->Main->CreateView("GoToPage.html", [
                        "href" => $href
                    ]);
                } else {
                    $this->Main->CreateView("AfterLoginApiPage.phtml", [
                        "email" => $email,
                        "name" => $name,
                    ]);
                }
            } else {
                $this->Main->CreateView("GoToLogin.html");
            }
        } else {
            $this->Main->CreateView("GoToLogin.html");
        }
    }
}
