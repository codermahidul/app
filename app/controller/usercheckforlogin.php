<?php
class userCheckForLogin
{
    private $GetData;
    function __construct()
    {
        $this->GetData=new GetData();
        $type="";
        $noteNumber='0';
        $wishNumber='0';
        $login = 'false';
        if (isset($_COOKIE['token'])) {
            $login='true';
            $type="user";
        }

        if (isset($_COOKIE['professional_token']) && $login=='false') {
            $login='true';
            $type="professional";
        }
        
        if (isset($_COOKIE['bussiness_token']) && $login=='false') {
            $login='true';
            $type="business";
        }
        
        if($login=='true'){
            $types=$this->GetData->GetTypeOnline();
            $wish=$this->GetData->HandelToken("wish/getMyWish",[],true);
            if($wish->data->total>0)
            $wishNumber=$wish->data->total;
            if($types=='user'){
                $type_name="user";
            }
            if($types=='userBusiness'){
                $type_name="businessUser";
            }
            if($types=='userProfessional'){
                $type_name="professionalUser";
            }
            $note=$this->GetData->HandelToken("note/getMyNote",["type_name"=>$type_name],true);
          
            if($note->data->total>0)
            $noteNumber=$note->data->total;
        }
      
        echo json_encode(["status" => $login,"type"=>$type,"wish"=>$wishNumber,"note"=>$noteNumber]);
    }
}
