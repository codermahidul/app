<?php

class createhelp
{
    private $Main, $Curls;
    function __construct()
    {

        $this->Main = new Main;
        $this->Curls = new Curls;
        $this->Main->SetTitle("Create Help");
        $this->Main->AddMetaNoIndex();

        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/Admin/Book/Book.css">
        <link rel="stylesheet" href="' . VIEW_PATH . 'css/fileinput/fileinput.css">';

        $Js = '<script type="module" src="' . VIEW_PATH . 'js/fileinput/fileinput.js"></script>
        <script type="module" src="' . VIEW_PATH . 'js/Admin/Formula/FormulaHelp.js?v=7"></script>';


        $Header = 'Layout/Header.phtml';
        $Footer = 'Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        $step = $this->Curls->curl("formulaHelp/getStepFormula", []);
        $languages = $this->Curls->curl("proof/get", ["type"=>"language"]);

        
        $this->Main->CreateViewHeaderFooterSideMenuAdmin(
            "Formula/CreateHelp.phtml",
            true,
            [
                "steps" => $step->data,
                "languages" => $languages->data->data,
            ]
        );
    }
}
