<?php

class reportlist{
    private $Main;
     function __construct()
    {
        
        $this->Main=new Main;
        $this->Main->SetTitle("Report List");
        $this->Main->AddMetaNoIndex();

        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Book/Book.css">
        <link rel="stylesheet" href="'.VIEW_PATH.'css/fileinput/fileinput.css">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/fileinput/fileinput.js"></script>
        <script type="module" src="'.VIEW_PATH.'js/Admin/Report/Report.js"></script>';
       
    
        $Header='Layout/Header.phtml';
        $Footer='Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);

       $this->Main->CreateViewHeaderFooterSideMenuAdmin("Report/ReportList.phtml");
    
       
    }
}



?>