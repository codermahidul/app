<?php

class openidCallbackFacebook
{
    private $Main, $Curls, $Facebook;
    function __construct()
    {


        $this->Main = new Main;
        $this->Facebook = new Facebook();
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
            $accessToken=$this->Facebook->getAccessToken($code);
            if(!$accessToken['has_errors']){
                $_SESSION['fb_access_token']=$accessToken['fb_response']->access_token;
                $response=$this->Facebook->GetUserData($_SESSION['fb_access_token']);
            
                if (!$response['has_errors']) {
                    $UserData=$response['fb_response'];
                    $email =  $UserData->email;
                    $name =  $UserData->name;
                    $data = $this->Curls->curl("UserBusiness/get", ["email" => $email], true);
                
                    $total = $data->data->total;
                    if ($total > 0) {
                      
                        $response = $this->Curls->curl("userBusiness/loginAuthApi", ["email" => $email], true);
    
                        $userData = $response->userData;
                        $tokenName="";
                        switch ($userData->type) {
                            case "professional": {
                                    $tokenName="professional_token";
                                    $href = "ProfessionalDashboard";
                                    break;
                                }
    
                            case "business": {
                                    $href = "BusinessUserDashboard";
                                    $tokenName="bussiness_token";
                                    break;
                                }
    
                            case "user": {
                                    $href = "UserDashboard";
                                    $tokenName="token";
                                    break;
                                }
    
                            case "team": {
                                    $href = "TeamProfile";
                                    $tokenName="team_token";
                                    break;
                                }
    
                            case "admin": {
                                    $href = "AdminDashboard";
                                   $tokenName="tokeAdmin";
                                    break;
                                }
                        }

                        header('Location: '.URL_Domain.'GoToPageFacebook/'.$href.'/'.$tokenName.'/'.$response->data);

            
         
                    } else {
                        $this->Main->CreateView("AfterLoginApiPage.phtml", [
                            "email" => $email,
                            "name" => $name,
                        ]);
                    }
                } else {
                    $this->Main->CreateView("GoToLogin.html");
                }
            }else{
                $this->Main->CreateView("GoToLogin.html");
            }
        
       } 
    }
}
