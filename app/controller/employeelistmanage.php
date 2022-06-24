<?php

class employeeListManage{
    private $Main;
    function __construct()
    {
        $this->Main=new Main;
        $this->Main->AddMetaNoIndex();
        $this->Main->SetTitle("Employee List Manage");
        $Css='<link rel="stylesheet" href="'.VIEW_PATH.'css/Admin/Common/Common.css?v='.VERSION.'">';

        $Js='<script type="module" src="'.VIEW_PATH.'js/BusinessDashboard/Employee/EmployeeListManage.js?v='.VERSION.'"></script>';
       
    
        $Header='BusinessDashboard/Layout/Header.phtml';
        $Footer='BusinessDashboard/Layout/Footer.phtml';

        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);
        $this->Main->SetHeaders($Header);
        $this->Main->SetFooter($Footer);
        
       $this->Main->CreateViewHeaderFooterSideMenuBusiness("BusinessDashboard/Employee/EmployeeListManage.phtml");
     
       
    }
}



?>