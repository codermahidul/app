<?php

class ProfessionalProfileSetting{
    private $Main,$Curls;
     function __construct()
    {
        $this->Main=new Main;
        $this->Curls=new Curls;
        $this->Main->SetTitle("Professional Profile Setting");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/UserDashboard/User/Profile.css?v='.VERSION.'">
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
        <link rel="stylesheet" href="'.VIEW_PATH.'tokeniz/tokenize2.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/ProfessionalDashboard/Profile/ProfileSetting.js?v='.VERSION.'"></script>
        <script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>';
       
        


        $Header='ProfessionalDashboard/Layout/Header.phtml';
        $Footer='ProfessionalDashboard/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
        $not_type=$this->Curls->curl_with_token_professional("note/getNotesType",["type_name"=>"professionalUser"]);
        $not_type=$not_type->data;


        $this->Main->CreateViewHeaderFooterSideMenuProfessional("ProfessionalDashboard/User/ProfileSetting.phtml",true,[
           "not_type"=>$not_type,
        ]);
    }
}
