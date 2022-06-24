<?php

class storeJobs
{
    private $Main, $Curls,$GetData;

    function __construct()
    {
        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->GetData = new GetData;

        $this->Main->SetTitle("Store Job List");
        $this->Main->AddMetaDescription("Hairizer Job List.");
        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/WebSite/Common/Common.css?v='.VERSION.'">
        <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">';

        $Js = '<script type="module" src="' . VIEW_PATH . 'js/WebSite/List/Job.js?v='.VERSION.'"></script>
        ';
        
        $Header = 'WebSite/Layout/Header.phtml';
        $Footer = 'WebSite/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);


        $data = [];
     

        $url=explode("/",$_SERVER['REQUEST_URI']);
        $display_name_slug=$url[count($url)-1];

        $data2 = $this->Curls->curl("job/get", ["trash" => "0", "admin_confirm" => "1","display_name_slug"=>$display_name_slug]);
        $haveMore = false;
        if ($data2->status == "true") {
            $total = $data2->data->total;

            if ($total > '30') {
                $haveMore = true;
            }
            $data = array_merge($data, $data2->data->data);
        }

        $bigBanner=$this->GetData->GetBigBanner("StoreJobs");


        $this->Main->CreateViewHeaderFooter(
            "WebSite/ListsNJob.phtml",
            [
                "data" => $data,
                "idNotIn" => "",
                "haveMore" => $haveMore,
                "url_job" => "JobDetail",
                "type_shows"=>"job",
                "title_page"=>"Job List",
                "category_search"=>"true",
                //"have_price"=>"",
               // "have_rating"=>"",
                "total"=>($total),
                "bigBanner"=>$bigBanner->data->data,
                "city_search"=>"true",
            ]
        );
    }
}
