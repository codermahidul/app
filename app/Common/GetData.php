<?php

class GetData
{
    private $Curls;
    function __construct()
    {
        $this->Curls = new Curls;
    }

    public function GetProof($type)
    {
        $proof=$this->Curls->curl("proof/get",["type"=>$type,"number"=>"100"]);
        return $proof->data;

    }
    public function CalculateBanner($bigBanner)
    {
        foreach($bigBanner as $big)
        {
            if($big->calculate_type=='show')
            {
                $this->Curls->curl("BannerOrder/updateBannerOrderNumberShow",["idSearch"=>$big->id]);
            }
        }
    }

    public function GetBigBanner($section,$category="",$program="")
    {
    
        $bigBanner=$this->Curls->curl("BannerOrder/getRand",
        [
            "section_name"=>$section,
            "type"=>"big",
            "category_id"=>$category,
            "proof_id"=>$program,
        ]);
      
        $this->CalculateBanner($bigBanner->data->data);
 
        return $bigBanner;
    }

    public function GetTypeOnline()
    {
        if(isset($_COOKIE['token']))
        {
            return 'user';
        }

        if(isset($_COOKIE['bussiness_token']))
        {
            return 'userBusiness';
        }
        
        if(isset($_COOKIE['professional_token']))
        {
            return 'userProfessional';
        }

        if(isset($_COOKIE['tokeAdmin']))
        {
            return 'admin';
        }

        
        if(isset($_COOKIE['team_token']))
        {
            return 'team';
        }

        return '';
    }

    public function HandelToken($url,$data,$decode=false)
    {
        $type=$this->GetTypeOnline();
  
        switch($type)
        {
            case "user":{
               return $this->Curls->curl_with_token($url, $data, $decode);
                break;
            }

            case "userBusiness":{
                return $this->Curls->curl_with_token_business($url, $data, $decode);
                break;
            }

            case "userProfessional":{
                return $this->Curls->curl_with_token_professional($url, $data, $decode);
                break;
            }
            
            case "admin":{
                return $this->Curls->curl_with_token_admin($url, $data, $decode);
                break;
            }

               
            case "team":{
                return $this->Curls->curl_with_token_team($url, $data, $decode);
                break;
            }

        
        }
    }

    public function GetUserInfoLogged()
    {
        $logged = 'false';
        $user_online_id='0';
        $type_creator='';
        $email_online='';
        $display_name='';

        $type=$this->GetTypeOnline();
      
     
        if($type!=='' && $type!=='admin' && $type !=='team')
        {
            $logged = 'true';
            $user=$this->HandelToken("userBusiness/getUserOnlineInfo",[],true);
            $user_online_id=$user->data[0]->id;
            $type_creator=$user->data[0]->type;
            $email_online=$user->data[0]->email;
            $display_name=$user->data[0]->display_name;
        }
       return [
           "logged"=>$logged,
           "user_online_id"=>$user_online_id,
           "type_creator"=>$type_creator,
           "email_online"=>$email_online,
           "display_name"=>$display_name,
       ];
    }

    public function CheckShare($item_id,$item_type)
    {
        $logged=$this->GetUserInfoLogged();
        $logged=$logged['logged'];
        if($logged=='false')
        return false;

        $datas=$this->HandelToken("wish/getMyWish",["item_type"=>$item_type,"item_id"=>$item_id],true);

        if($datas->data->total>0)
        {
            return true;
        }else
        return false;
     

    }

    public function CalculatePriceSponsorship($id)
    {
        $parameter = ["idSearch" => $id, "payment" => "0"];
        $price = "0";
        $data=$this->HandelToken("Sponsorship/getMyRequest",$parameter,true);
        $setting=$this->Curls->curl("Fetch/GetSetting",[]);
        foreach($data->data->data as $d)
        {
            $options=explode(",",$d->sponsorship_request_options);
            foreach($options as $op)
            {
                $oo=explode("::",$op);
                $price=$price+$oo['4'];
            }
        }
        $tax=($setting->data[0]->tax);
        $price=$price+(($price*$tax)/100);
        return $price;
    }

    public function GetClime($data,$items_table)
    {
        $clime='false';
        
        if($data->admin_id >0 && $data->user_business_id <=0)
        {
            $clime='true';
        }else
        {
            if($data->admin_id >0&& $data->user_admin_id>0)
            {
                $clime='true'; 
            }
        }

        if($clime=='true')
        {
            $data=$this->HandelToken("claim/getMyClaim",["items_type"=>$items_table,"items_id"=>$data->id],true);

            if($data->data->total){
                $clime='false'; 
            }
        }

        return $clime;
    }

    public function CalculatePriceDiscount($price,$discount_code,$type)
    {
        if($discount_code=='')
        {
            return $price;
        }
        $data=$this->Curls->curl("Discount/get",[$type=>"1","code"=>$discount_code]);
        if($data->data->total>0)
        {
            $d=$data->data->data[0];
            if($d->numbers>0)
            {
                switch($d->type_name)
                {
                    case "Percent":{
                        $price=floatval($price)-((floatval($price)*floatval($d->amount))/100);
                        break;
                    }
                    case "Numerical":{
                        $price=floatval($price)-floatval($d->amount);
                        break;
                    }
                }


                $data=$this->Curls->curl("Discount/updateNumber",["idSearch"=>$d->id,"numbers"=>($d->numbers-1)]);
                
            }
           
        }
      
        
        return $price;
    }

    public function GetMyAnnouncement()
    {
        return $this->HandelToken("Announcement/getMyAnnouncement",true);
    }
   
}

?>