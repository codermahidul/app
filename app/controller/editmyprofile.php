<?php

class editMyProfile
{
    private $Main;
    function __construct()
    {
        $this->Main = new Main;
        $this->Main->SetTitle("Edit Profile");
        $this->Main->AddMetaNoIndex();

        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/UserDashboard/Forum/Forum.css?v=' . VERSION . '">';

        $Js = '<script type="module" src="'.VIEW_PATH.'js/BusinessDashboard/profile/EditMyProfile.js?v='.VERSION.'"></script>';

            
        $Header='BusinessDashboard/Layout/Header.phtml';
        $Footer='BusinessDashboard/Layout/Footer.phtml';
        
        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);

        $this->Main->CreateViewHeaderFooterSideMenuBusiness("Admin/Tables/EditProfileBusinessAdmin.phtml", true, [
            "listHref" => "BusinessProfile",
            "list" => "My Profile",
            "showRemove"=>"false"
        ]);
    }
}
