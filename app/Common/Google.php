<?php
require_once 'app/controller/google-api/vendor/autoload.php';

class Google
{
    private $gClient;
    function __construct()
    {
        $this->gClient = new Google_Client();
        $this->gClient->setClientId(CLIENT_ID_GOOGLE);
        $this->gClient->setClientSecret(CLIENT_SECRET_GOOGLE);
        $this->gClient->setApplicationName("hairizer");
        $this->gClient->setRedirectUri(CLIENT_REDIRECT_GOOGLE);
        $this->gClient->addScope("https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email");
        //$this->gClient->addScope(" https://www.googleapis.com/auth/drive.file");
        //$this->gClient->addScope(" https://www.googleapis.com/auth/drive.appdata");


    }

    public function getGoogleAuthAddress()
    {
        return $this->gClient->createAuthUrl();
    }

    public function GetUserData($code)
    {
        $token=$this->gClient->fetchAccessTokenWithAuthCode($code);
     

  // get profile info
        if(isset($token['error'])!="invalid_grant"){
            $this->gClient->setAccessToken($token['access_token']);
            $oAuth=new Google\Service\Oauth2($this->gClient);
            //return $oAuth->userinfo_v2_me->get();
            return $oAuth->userinfo->get();
            
        }
      return false;

    }
}
