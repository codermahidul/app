<?php

class businessProfileShowDetail 
{
    private $Main,$Curls,$GetData;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls=new Curls;
        $this->GetData=new GetData;
        
        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v='.VERSION.'">';
        $Js='
        <script type="module" src="'.VIEW_PATH.'js/WebSite/List/BusinessProfileDetails.js?v='.VERSION.'"></script>
        <script type="module" src="'.VIEW_PATH.'js/WebSite/List/List.js?v='.VERSION.'"></script>
        ';
        $Header = 'WebSite/Layout/Header.phtml';
        $Footer = 'WebSite/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);


        $url=explode("/",$_SERVER['REQUEST_URI']);
        $display_name_slug=$url[count($url)-1];
        $data=[];
        $response= $this->Curls->curl("userBusiness/get",["display_name_slug"=>$display_name_slug]);
        if($response->status=="true")
        {

            $datas=$response->data->data;
            $user_business_id=$datas[0]->id;
            if($user_business_id==null)
            $user_business_id='-1';
      
            $this->Main->SetTitle($datas[0]->display_name);
            $this->Main->AddMetaDescription($data[0]->title.".".$data[0]->about);

            $param=["userIdSearch"=>$user_business_id,"trash"=>"0","admin_confirm"=>"1"];
            $products=$this->Curls->curl("product/get",$param);
            $prizes=$this->Curls->curl("prize/get",$param);
            $coupons=$this->Curls->curl("coupon/get",$param);
            $deals=$this->Curls->curl("deals/get",$param);
            $jobs=$this->Curls->curl("job/get",$param);
        }

        $share=$this->GetData->CheckShare($datas[0]->id,"business");
        $dataType=$this->GetData->GetUserInfoLogged();
        $logged=$dataType['logged'];
        $user_online_id=$dataType['user_online_id'];
        $type_creator=$dataType['type_creator'];

        ////get number l and following

        $bigBanner=$this->GetData->GetBigBanner("networkDetail");

        $proof=$this->GetData->GetProof("report");


        $isFollower='false';
   
        $user_follow_id="";
        $type_online=$this->GetData->GetTypeOnline();
        if ($type_creator !='') {

            $type="userBusiness";
            if($datas[0]->type=='professional')
            {
                $type="userProfessional";
            }
            $urls="Follow/getMyFollower";
            $params=["user_responder"=>$user_business_id,"type_responder"=>$type];
            if($type_online=="user")
            $dataFollower=$this->Curls->curl_with_token($urls,$params);

            if($type_online=="userBusiness")
            $dataFollower=$this->Curls->curl_with_token_business($urls,$params);

            if($type_online=="userProfessional")
            $dataFollower=$this->Curls->curl_with_token_professional($urls,$params);


            if($dataFollower->status=="true")
            {
     
                if($dataFollower->data->total>0)
                {
                    $isFollower='true';
                    $user_follow_id=$dataFollower->data->data[0]->user_responder;
              
                }
            }
        }
    

        ////get number l and following
        $followers=$this->Curls->curl("Follow/get",["user_applicant"=>$user_business_id,"type_applicant"=>$type]);
        $following=$this->Curls->curl("Follow/get",["user_responder"=>$user_business_id,"type_responder"=>$type]);


        if($datas[0]->type=="professional")
        {
            $param=["user_business_id"=>$user_business_id,"trash"=>"0"];
            $webSite=$this->Curls->curl("BusinessUserWebSite/get",$param);
            $experience=$this->Curls->curl("BusinessUserExperience/get",$param);

            $vExperience=$this->Curls->curl("BusinessUserVExperience/get",$param);
            $License=$this->Curls->curl("BusinessUserLicense/get",$param);
            $Publication=$this->Curls->curl("BusinessUserPublication/get",$param);
            $Patent=$this->Curls->curl("BusinessUserPatent/get",$param);
            $Course=$this->Curls->curl("BusinessUserCourse/get",$param);
            $Project=$this->Curls->curl("BusinessUserProject/get",$param);
            $Honors=$this->Curls->curl("BusinessUserHonors/get",$param);
            $Score=$this->Curls->curl("BusinessUserScore/get",$param);
            $Language=$this->Curls->curl("BusinessUserLanguage/get",$param);
            $Organization=$this->Curls->curl("BusinessUserOrganization/get",$param);
            $Skill=$this->Curls->curl("BusinessUserSkill/get",$param);
            $Education=$this->Curls->curl("BusinessUserEducation/get",$param);

            $ShareProduct=$this->Curls->curl("Fetch/getShareNumber",["table_name"=>"product","user_business_id"=>$user_business_id]);
            $SharePrize=$this->Curls->curl("Fetch/getShareNumber",["table_name"=>"prize","user_business_id"=>$user_business_id]);
            $ShareCoupon=$this->Curls->curl("Fetch/getShareNumber",["table_name"=>"coupon","user_business_id"=>$user_business_id]);

 
            $this->Main->CreateViewHeaderFooter("WebSite/ProfileProfessionalDetails.phtml",
            [
                "data"=>$datas,
                "webSite"=>$webSite,
                "experience"=>$experience,
                "vExperience"=>$vExperience,
                "License"=>$License,
                "Publication"=>$Publication,
                "Patent"=>$Patent,
                "Course"=>$Course,
                "Project"=>$Project,
                "Honors"=>$Honors,
                "Score"=>$Score,
                "Language"=>$Language,
                "Organization"=>$Organization,
                "Skill"=>$Skill,
                "Education"=>$Education,
                "isFollower"=>$isFollower,
                "followers"=>$followers,
                "following"=>$following,
                "logged"=>$logged,
                "share"=>$share,
                "user_follow_id"=>$user_follow_id,
                "report"=>$proof->data,
                "type_creator"=>$type_creator,
                "user_online_id"=>$user_online_id,
                "bigBanner"=>$bigBanner->data->data,
                "ShareProduct"=>$ShareProduct->data,
                "SharePrize"=>$SharePrize->data,
                "ShareCoupon"=>$ShareCoupon->data,

            ]);
        }
        if($datas[0]->type=="business")
        {
            $clime=$this->GetData->GetClime($datas[0],"user_business");

            $this->Main->CreateViewHeaderFooter("WebSite/BusinessProfileDetails.phtml",
            [
                "data"=>$datas,
                "products"=>$products,
                "prizes"=>$prizes,
                "coupons"=>$coupons,
                "deals"=>$deals,
                "jobs"=>$jobs,
                "report"=>$proof->data,
                "bigBanner"=>$bigBanner->data->data,
                "logged"=>$logged,
                "share"=>$share,
                "user_online_id"=>$user_online_id,
                "type_creator"=>$type_creator,
                "isFollower"=>$isFollower,
                "followers"=>$followers,
                "following"=>$following,
                "user_follow_id"=>$user_follow_id,
                "clime"=>$clime,
                "email_online"=>$dataType['email_online'],
                "display_name_online"=>$dataType['display_name'],

            ]);
        }
        if($datas[0]->type=="user")
        {
            $this->Main->CreateViewHeaderFooter("WebSite/ProfileDetails.phtml",
            [
                "data"=>$datas,
                "webSite"=>$webSite,
                "Language"=>$Language,
                "Skill"=>$Skill,
                "report"=>$proof->data,
                "bigBanner"=>$bigBanner->data->data,
                "logged"=>$logged,
                "share"=>$share,
            ]);
        }
     

    }

}
