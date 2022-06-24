<?php

class programDetail
{
    private $Main, $Curls, $GetData;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->GetData = new GetData;

        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v='.VERSION.'">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>';
        $Header = 'WebSite/Layout/Header.phtml';
        $Footer = 'WebSite/Layout/Footer.phtml';

        $Js = '<script type="module" src="'.VIEW_PATH.'js/WebSite/List/ProgramDetail.js?v='.VERSION.'"></script>
        <script type="module" src="' . VIEW_PATH . 'js/WebSite/List/List.js?v='.VERSION.'"></script>
        <script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
        ';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);


        $url = explode("/", $_SERVER['REQUEST_URI']);
        $title_slug = $url[count($url) - 1];
        $data = [];
        $relates = [];
        $response = $this->Curls->curl("program/get", ["trash" => "0", "admin_confirm" => "1", "title_slug" => $title_slug]);
        if ($response->status == "true") {

            $data = $response->data->data;
            $this->Main->SetTitle($data[0]->title);
            $this->Main->AddMetaDescription($data[0]->title.".".$data[0]->description);

            $relates = $this->Curls->curl("program/get", [
                "trash" => "0",
                "admin_confirm" => "1",
                "idNotIn" => $data[0]->id,
                "category_id" => $data[0]->category_id,
                "number" => "10",
            ]);
            $relates = $relates->data->data;
        }
        $proof = $this->GetData->GetProof("report");


      
        $dataType=$this->GetData->GetUserInfoLogged();
        $logged=$dataType['logged'];
        $user_online_id=$dataType['user_online_id'];
        $type_creator=$dataType['type_creator'];

        $bigBanner = $this->GetData->GetBigBanner("programDetail","",$data[0]->program_category);
        $share=$this->GetData->CheckShare($data[0]->id,"program");


        
        $this->Main->CreateViewHeaderFooter("WebSite/ProgramDetails.phtml", [
            "data" => $data,
            "report" => $proof->data,
            "relates" => $relates,
            "logged" => $logged,
            "share"=>$share,
            "user_online_id" => $user_online_id,
            "type_creator" => $type_creator,
            "bigBanner" => $bigBanner->data->data,
        ]);
    }
}
