<?php

class editProfile
{
    private $Main;
    function __construct()
    {
        $this->Main = new Main;
        $this->Main->SetTitle("Edit Profile");
        $this->Main->AddMetaNoIndex();

        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/UserDashboard/Forum/Forum.css?v=' . VERSION . '">';

        $Js = '<script type="module" src="'.VIEW_PATH.'js/Admin/Tables/EditProfileBusiness.js?v='.VERSION.'"></script>';

            
        $Header='Layout/Header.phtml';
        $Footer='Layout/Footer.phtml';
        
        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);

        $this->Main->CreateViewHeaderFooterSideMenuAdmin("Tables/EditProfileBusinessAdmin.phtml", true, [
            "listHref" => "BusinessUserManager",
            "list" => "Business Manager List",
            "showRemove"=>"true",
        ]);
    }
}
