<?php


class Facebook
{
    private$endpoint;
    function __construct()
    {
        $this->Curls=new Curls;
        $this->endpoint='https://www.facebook.com/v14.0/dialog/oauth';
     
    }

    public function getFacebookAuthAddress()
    {
        $params=array(
            'client_id'=>APP_ID,
            'redirect_uri'=>CLIENT_REDIRECT_FACEBOOK,
            'state'=>'eciPhp',
            'scope'=>'email',
            'auth_type'=>'rerequest'
        );

        return $this->endpoint.'?'.http_build_query($params);
    }

    public function getAccessToken($code)
    {
        $endpoint='https://graph.facebook.com/v14.0/oauth/access_token?';
        $params=array(
            'client_id'=>APP_ID,
            'client_secret'=>APP_SECRET,
            'redirect_uri'=>CLIENT_REDIRECT_FACEBOOK,
            'code'=>$code
 
        );
        return $this->makeFacebookApiCall($endpoint,$params);
    }

    public function makeFacebookApiCall($endpoint,$params)
    {
        
        $ch=curl_init();
        curl_setopt($ch,CURLOPT_URL,$endpoint.http_build_query($params));
        curl_setopt($ch,CURLOPT_RETURNTRANSFER,TRUE);
        curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,FALSE);
        $response=curl_exec($ch);
        $response=json_decode($response);
        curl_close($ch);

        return [
            'endpoint'=>$endpoint,
            'params'=>$params,
            'fb_response'=>$response,
            'has_errors'=>isset($response->error)?TRUE:FALSE

        ];
    }

    public function GetUserData($token)
    {
        $endpoint='https://graph.facebook.com/v14.0/me?';
        $params=array(
            'fields'=>'name,email',
            'access_token'=>$token,
            'redirect_uri'=>CLIENT_REDIRECT_FACEBOOK,
            'client_id'=>APP_ID,
        );
        

        return $this->makeFacebookApiCall($endpoint,$params);
    }
}
