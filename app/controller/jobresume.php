<?php

class jobResume{
    private $Main;
     function __construct()
    {
        $this->Main=new Main;
        $this->Main->SetTitle("Job Resume");
        $this->Main->AddMetaNoIndex();
        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/Forum/Forum.css?v='.VERSION.'">
        ';

        $Js='
        <script type="module" src="'.VIEW_PATH.'js/BusinessDashboard/Job/JobResume.js?v='.VERSION.'"></script>';
       
    
        $Header='BusinessDashboard/Layout/Header.phtml';
        $Footer='BusinessDashboard/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenuBusiness("BusinessDashboard/Job/JobResume.phtml",true,[
           "listHref"=>"JobList",
           "list"=>"Job List",
           "title_page"=>"Resumes",
       ]);
    
       
    }
}



?>