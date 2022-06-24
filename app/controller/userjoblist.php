<?php

class userJobList{
    private $Main;
     function __construct()
    {
        $this->Main=new Main;
        $this->Main->SetTitle("User Job List");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css?v='.VERSION.'">
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">
        <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/Admin/Tables/UserJobShow.js?v='.VERSION.'"></script>';

        $Header='Layout/Header.phtml';
        $Footer='Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
        
        $url=explode("/",$_SERVER['REQUEST_URI']);
        $id=$url[count($url)-1];

        $this->Main->CreateViewHeaderFooterSideMenuAdmin("Tables/MyJobAdmin.phtml",true,[
         "add_address"=>"AddJobAdminUser/".$id,
        ]);
    
       
    }
}



?>