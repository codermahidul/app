<?php

class contactWithUsList
{
    private $Main;
    function __construct()
    {
        $this->Main = new Main;
        $this->Main->SetTitle("Contact With Us List");
        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/Admin/Common/Common.css?v=' . VERSION . '">">
     ';

        $Js = '
       <script type="module" src="' . VIEW_PATH . 'js/Admin/Tables/ContactWithUsList.js?v=' . VERSION . '">"></script>';


        $Header = 'Layout/Header.phtml';
        $Footer = 'Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);

        $this->Main->CreateViewHeaderFooterSideMenuAdmin("Tables/ContactWithUsList.phtml");
    }
}
