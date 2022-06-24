<?php

class jobList{
    private $Main;
     function __construct()
    {
        $this->Main=new Main;
        $this->Main->AddMetaNoIndex();

        $this->Main->SetTitle("Jobs List");
        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/Forum/Forum.css?v='.VERSION.'">
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/BusinessDashboard/Job/Job.js?v='.VERSION.'"></script>';
       
    
        $Header='BusinessDashboard/Layout/Header.phtml';
        $Footer='BusinessDashboard/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenuBusiness("BusinessDashboard/Job/JobList.phtml",true,[
        "add_address"=>"AddJob",
       ]);
    
       
    }
}



?>