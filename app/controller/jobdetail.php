<?php

class jobDetail
{
    private $Main, $Curls, $GetData;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->GetData = new GetData;

        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v=' . VERSION . '">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>';
        $Header = 'WebSite/Layout/Header.phtml';
        $Footer = 'WebSite/Layout/Footer.phtml';

        $Js = '<script type="module" src="' . VIEW_PATH . 'js/WebSite/List/JobDetail.js?v=' . VERSION . '"></script>
        <script type="module" src="' . VIEW_PATH . 'js/WebSite/List/List.js?v=' . VERSION . '"></script>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);


        $url = explode("/", $_SERVER['REQUEST_URI']);
        $slug = $url[count($url) - 1];
        $data = [];
        $relates = [];
        $response = $this->Curls->curl("job/get", ["trash" => "0", "admin_confirm" => "1", "title_slug" => $slug]);
        if ($response->status == "true") {

            $data = $response->data->data;
            $this->Main->SetTitle($data[0]->title);
            $this->Main->AddMetaDescription($data[0]->title.".".$data[0]->description);

            $relates = $this->Curls->curl("job/get", [
                "trash" => "0",
                "admin_confirm" => "1",
                "idNotIn" => $data[0]->id,
                "user_business_id" => $data[0]->user_business_id,
                "number" => "10",
            ]);
            $relates = $relates->data->data;
        }
        $proof = $this->GetData->GetProof("report");


        $type_creator = "";
        $logged = 'false';
        $user_online_id = "0";
        $HaveResume = 'false';

        $type_creator = $this->GetData->GetTypeOnline();
        switch ($type_creator) {
            case "user": {
                    $logged = 'true';
                    $user = $this->GetData->HandelToken("user/getUserOnlineInfo", []);
                    $user_online_id = $user->data[0]->id;
                    break;
                }
            case "userBusiness": {
                    $logged = 'true';
                    $user = $this->GetData->HandelToken("userBusiness/getUserOnlineInfo", []);
                    $user_online_id = $user->data[0]->id;
                    break;
                }
            case "userProfessional": {
                    $logged = 'true';
                    $user = $this->GetData->HandelToken("userBusiness/getUserOnlineInfo", []);
                    $user_online_id = $user->data[0]->id;
                    break;
                }
        }

        if ($logged == 'true') {
            $datas = $this->GetData->HandelToken("JobApply/getMyResume", ["job_id" => $data[0]->id],true);

            if ($datas->data->total > 0) {
                $HaveResume = 'true';
            }
        }
      

        $bigBanner = $this->GetData->GetBigBanner("jobDetail");
        $share=$this->GetData->CheckShare($data[0]->id,"job");

        $this->Main->CreateViewHeaderFooter("WebSite/JobDetails.phtml", [
            "data" => $data,
            "report" => $proof->data,
            "relates" => $relates,
            "logged" => $logged,
            "HaveResume" => $HaveResume,
            "user_online_id" => $user_online_id,
            "share"=>$share,
            "type_creator" => $type_creator,
            "bigBanner" => $bigBanner->data->data,

        ]);
    }
}
