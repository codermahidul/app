<?php

class userDetailProfile 
{
    private $Main,$Curls,$GetData;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls=new Curls;
        $this->GetData=new GetData;
        
        $this->Main->AddMetaNoIndex();

        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css">';
        $Js='<script type="module" src="'.VIEW_PATH.'js/WebSite/List/ProfileDetails.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/WebSite/List/List.js"></script>';
        $Header = 'WebSite/Layout/Header.phtml';
        $Footer = 'WebSite/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);


        $url=explode("/",$_SERVER['REQUEST_URI']);
        $display_name_slug=$url[count($url)-1];
 
        $data=[];
        $response= $this->Curls->curl("user/get",["trash"=>"0","admin_confirm"=>"1","display_name_slug"=>$display_name_slug]);
        if($response->status=="true")
        {

            $datas=$response->data->data;
            $user_id=$datas[0]->id;
            if($user_id==null)
            $user_id='-1';
      
            $this->Main->SetTitle($datas[0]->display_name);
            $param=["user_id"=>$user_id,"trash"=>"0"];
            $webSite=$this->Curls->curl("userWebSite/get",$param);
    

  

            $Language=$this->Curls->curl("userLanguage/get",$param);
            $Skill=$this->Curls->curl("userSkill/get",$param);
          
              
        }

        ////get number l and following
 
        $bigBanner=$this->GetData->GetBigBanner("networkDetail");

        $proof=$this->GetData->GetProof("report");
        $this->Main->CreateViewHeaderFooter("WebSite/ProfileDetails.phtml",
        [
            "data"=>$datas,
            "webSite"=>$webSite,
            "Language"=>$Language,
            "Skill"=>$Skill,
            "report"=>$proof->data,
            "bigBanner"=>$bigBanner->data->data,
        ]);
     

    }

}
