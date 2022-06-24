
<?php

class homepagesetting
{
    private $Main, $Curls;

    function __construct()
    {
        $this->Main=new Main;
        $this->Main->AddMetaNoIndex();

        $this->Main->SetTitle(" Home Page Setting");
        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css">
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/Admin/Formula/HomePageSetting.js"></script>';
       
    
        $Header='Layout/Header.phtml';
        $Footer='Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenuAdmin("Formula/HomePageSetting.phtml");
     
       
    }
}
