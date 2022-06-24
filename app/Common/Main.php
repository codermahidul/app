<?php

class Main
{
    private $bootstrap_css,
        $bootstrap_js,
        $jquery,
        $jsFile,
        $CssFile,
        $meta,
        $js,
        $favIco,
        $SideMenuJs,
        $Css,
        $Footer,
        $Header,
        $UserProfileSideMenu,
        $BusinessUserProfileSideMenu,
        $TeamUserProfileSideMenu,
        $TeamUserSideMenu,
        $UserSideMenu,
        $BusinessUserSideMenu,
        $ProfessionalUserSideMenu,
        $ProfessionalUserProfileSideMenu,
        $UserProfileSideMenuAdmin,
        $UserSideMenuAdmin,
        $title,
        $Curls,
        $GetData;
    function __construct()
    {
        $this->Curls = new Curls;
        $this->GetData = new GetData;
        $this->bootstrap_css = '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css"
         rel="stylesheet" integrity="sha384-uWxY/CJNBR+1zjPWmfnSnVxwRheevXITnMqoEIeG1LJrdI0GlVs/9cVSyPYXdcSF" crossorigin="anonymous">
         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

         <link rel="stylesheet" href="' . VIEW_PATH . 'assets/css/main.css?v='.rand(0,1000).'" />
         <link rel="stylesheet" href="' . VIEW_PATH . 'assets/css/plugins/slider-range.css" />
         
         ';

        $this->favIco = '<link rel="apple-touch-icon" sizes="180x180" href="' . URL_Domain . 'apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="' . URL_Domain . 'favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="' . URL_Domain . 'favicon-16x16.png">
        <link rel="manifest" href="' . URL_Domain . 'site.webmanifest">
        <link rel="mask-icon" href="' . URL_Domain . 'safari-pinned-tab.svg" color="#5bbad5">';


        $this->meta = '  <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="google-signin-client_id" content="'.CLIENT_ID_GOOGLE.'">

        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">';

        //$this->jquery = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>';

        $this->bootstrap_js = '    
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" 
        integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
         crossorigin="anonymous"></script>

         <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js" 
         integrity="sha384-kQtW33rZJAHjgefvhyyzcGF3C5TFyBQBA13V1RKPf4uH+bwyzQxZ6CmMZHmNBEfJ" crossorigin="anonymous"></script>';


        //  <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
        $this->jsFile = '
       
        
     
        <script src="' . VIEW_PATH . 'assets/js/vendor/modernizr-3.6.0.min.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/vendor/jquery-3.6.0.min.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/vendor/jquery-migrate-3.3.0.min.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/vendor/bootstrap.bundle.min.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/plugins/slick.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/plugins/jquery.syotimer.min.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/plugins/wow.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/plugins/perfect-scrollbar.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/plugins/slider-range.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/plugins/magnific-popup.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/plugins/select2.min.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/plugins/waypoints.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/plugins/counterup.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/plugins/jquery.countdown.min.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/plugins/images-loaded.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/plugins/isotope.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/plugins/scrollup.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/plugins/jquery.vticker-min.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/plugins/jquery.theia.sticky.js"></script>
        <script src="' . VIEW_PATH . 'assets/js/plugins/jquery.elevatezoom.js"></script>
        
        <script src="' . VIEW_PATH . 'assets/js/main.js?v='.rand(0,100).'"></script>
        <script src="' . VIEW_PATH . 'assets/js/shop.js?v='.rand(0,100).'"></script>
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.js"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
        <script src="' . VIEW_PATH . 'js/Toastr/toast.js"></script>
        <script src="https://apis.google.com/js/platform.js" async defer></script>

        
        ';

        // <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
        $this->CssFile = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/Toastr/toastr.css">
        <link rel="stylesheet" href="' . VIEW_PATH . 'font-aws/fontawesome-free-5.12.1-web/css/all.css">
       
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
        
        ';

        $this->UserSideMenu = VIEW_PATH_INCLUDE . 'UserDashboard/Layout/SideMenu.phtml';
        $this->UserProfileSideMenu = VIEW_PATH_INCLUDE . 'UserDashboard/Layout/ProfileSideMenu.phtml';


        $this->BusinessUserSideMenu = VIEW_PATH_INCLUDE . 'BusinessDashboard/Layout/SideMenu.phtml';
        $this->BusinessUserProfileSideMenu = VIEW_PATH_INCLUDE . 'BusinessDashboard/Layout/ProfileSideMenu.phtml';



        $this->ProfessionalUserSideMenu = VIEW_PATH_INCLUDE . 'ProfessionalDashboard/Layout/SideMenu.phtml';
        $this->ProfessionalUserProfileSideMenu = VIEW_PATH_INCLUDE . 'ProfessionalDashboard/Layout/ProfileSideMenu.phtml';

        $this->TeamUserSideMenu = VIEW_PATH_INCLUDE . 'TeamDashboard/Layout/SideMenu.phtml';
        $this->TeamUserProfileSideMenu = VIEW_PATH_INCLUDE . 'TeamDashboard/Layout/ProfileSideMenu.phtml';


        $this->UserSideMenuAdmin = VIEW_PATH_ADMIN_INCLUDE . 'Layout/SideMenu.phtml';
        $this->UserProfileSideMenuAdmin = VIEW_PATH_ADMIN_INCLUDE . 'Layout/ProfileSideMenu.phtml';

        $this->SideMenuJs = '';
    }

    public function checkLoginAll()
    {
        if ($this->GetData->GetTypeOnline() == '') {
            return false;
        }
        return true;
    }

    public function checkLogin()
    {
        if (!isset($_COOKIE['token'])) {
            return false;
        }
        return true;
    }

    public function checkLoginProfessional()
    {
        if (!isset($_COOKIE['professional_token'])) {
            return false;
        }
        return true;
    }

    public function checkLoginBusiness()
    {
        if (!isset($_COOKIE['bussiness_token'])) {
            return false;
        }
        return true;
    }

    public function checkLoginTeam()
    {
        if (!isset($_COOKIE['team_token'])) {
            return false;
        }
        return true;
    }

    public function checkLoginAdmin()
    {
        if (!isset($_COOKIE['tokeAdmin'])) {
            return false;
        }
        return true;
    }

    public function AddMetaDescription($description)
    {
        $this->meta = $this->meta . '  <meta name="description" content="' . $description . '">';
    }

    public function AddMetaNoIndex()
    {
        $this->meta = $this->meta . '<meta name="robots" content="noindex">';
    }

    public function SetTitle($title)
    {
        $this->title = "<title>" . $title . "</title>";
    }

    public function SetCss($css)
    {
        $this->Css = $css;
    }

    public function SetHeaders($headers)
    {
        $this->Header = $headers;
    }

    public function SetFooter($footer)
    {
        $this->Footer = $footer;
    }

    public function SetJs($js)
    {
        $this->js = $js;
    }
    public function SetSideMenuJs($js)
    {
        $this->SideMenuJs = $js;
    }
    private function CreateHeader($dataTable = false)

    {
        $header = '<!DOCTYPE html><html lang="en"><head>';
        $header .= $this->meta;
        $header .= $this->favIco;
        $header .= $this->bootstrap_css;
        $header .= $this->CssFile;
        $header .= $this->Css;
        if ($dataTable) {
            $header .= '<link rel="stylesheet" href="https://cdn.datatables.net/1.10.24/css/dataTables.bootstrap5.min.css">
            <link rel="stylesheet" href="' . VIEW_PATH . 'datatable/responsive.css">
            <link rel="stylesheet" href="' . VIEW_PATH . 'datatable/button.css">
            ';
        }

        $header .= $this->title;
        $header .= '</head>';
        echo $header;
    }


    private function CreateScriptJs($dataTable = false)
    {

        $script = '';
        $script .= $this->jquery;
        $script .= $this->bootstrap_js;
        $script .= $this->jsFile;
        $script .= $this->SideMenuJs;
        $script .= $this->js;
        if ($dataTable) {
            $script .= '<script src="' . VIEW_PATH . 'datatable/datatable-min.js"></script>
          
            <script src="' . VIEW_PATH . 'datatable/responsive.js"></script>
            <script src="' . VIEW_PATH . 'datatable/bootstrap4.js"></script>
            <script src="' . VIEW_PATH . 'datatable/datatable-btn.js"></script>
            <script src="' . VIEW_PATH . 'datatable/datatable-print.js"></script>
            <script src="' . VIEW_PATH . 'datatable/datatable-pdf.js"></script>
            <script src="' . VIEW_PATH . 'datatable/datatable-pdf-font.js"></script>
            <script src="' . VIEW_PATH . 'datatable/datatable-buttons-html5.js"></script>
            <script src="' . VIEW_PATH . 'datatable/datatable-buttons.colVis.min.js"></script>
            ';
        }
        echo $script;
    }

    public function CreateView($view, $data = [])
    {
        $URL_Domain = URL_Domain;
        $SecretKey = SECRET_KEY;
        $SiteName = SiteName;
        $VIEW_PATH = VIEW_PATH;
        $VIEW_PATH_INCLUDE = VIEW_PATH_INCLUDE;
        $VIEW_PATH_ADMIN = VIEW_PATH_ADMIN;
        $VIEW_PATH_ADMIN_INCLUDE = VIEW_PATH_ADMIN_INCLUDE;
        $SiteName = SiteName;
        $URL_PATH = URL_PATH;

        $data = $data;
        $this->CreateHeader();
        include(VIEW_PATH_INCLUDE . $view);
        $this->CreateScriptJs();
    }

    public function CreateViewWithDataAuth($view, $auth = true, $data = [])
    {
        $URL_Domain = URL_Domain;
        $SecretKey = SECRET_KEY;
        $VIEW_PATH = VIEW_PATH;
        $VIEW_PATH_INCLUDE = VIEW_PATH_INCLUDE;
        $VIEW_PATH_ADMIN = VIEW_PATH_ADMIN;
        $VIEW_PATH_ADMIN_INCLUDE = VIEW_PATH_ADMIN_INCLUDE;
        $SiteName = SiteName;
        $URL_PATH = URL_PATH;
        $data = $data;
        $this->CreateHeader();
        if ($auth) {
            if ($this->checkLoginAll()) {
                include(VIEW_PATH_INCLUDE . $view);
            } else {
                include(VIEW_PATH_INCLUDE . "GoToLogin.html");
            }
        } else {
            include(VIEW_PATH_INCLUDE . $view);
        }
        $this->CreateScriptJs();
    }

    public function CreateViewHeaderFooterSideMenu($view, $auth = true, $data = [])
    {
        $URL_Domain = URL_Domain;
        $SecretKey = SECRET_KEY;
        $VIEW_PATH = VIEW_PATH;
        $VIEW_PATH_INCLUDE = VIEW_PATH_INCLUDE;
        $VIEW_PATH_ADMIN = VIEW_PATH_ADMIN;
        $VIEW_PATH_ADMIN_INCLUDE = VIEW_PATH_ADMIN_INCLUDE;
        $SiteName = SiteName;
        $URL_PATH = URL_PATH;

        $MyAnnouncement=$this->GetData->GetMyAnnouncement();
        $categories=$this->Curls->curl("category/GetProductCategory",["type"=>"product"],true);

        $categories=($categories->data);

        $categoriesCoupon=$this->Curls->curl("category/GetProductCategory",["type"=>"coupon"],true);

        $categoriesCoupon=($categoriesCoupon->data);

        $programCat=$this->GetData->GetProof("program");
        $programCat=($programCat->data);
        
        $data;
        $this->CreateHeader(true);
        include(VIEW_PATH_INCLUDE . $this->Header);
        echo "<div class='main pages' id='contain_all'>";
        echo "<div class='page-content pt-50 pb-150'>";
        
        echo'<div class="container">';
        echo'<div class="row">';
        echo' <div class="col-lg-12 m-auto">';
        echo'      <div class="row">';

        echo '<div class="col-md-3">';
        //include($this->UserProfileSideMenu);
        include($this->UserSideMenu);

        echo "</div>";
        echo '<div class="col-md-9">';

        if ($auth) {
            if ($this->checkLogin()) {
                include(VIEW_PATH_INCLUDE . $view);
            } else {
                include(VIEW_PATH_INCLUDE . "GoToLogin.html");
            }
        }
        echo "</div>";

        echo "</div>";
        echo "</div>";
        echo "</div>";
        echo "</div>";


        echo "</div>";
        echo "</div>";
        include(VIEW_PATH_INCLUDE . $this->Footer);

        //$this->SetSideMenuJs('<script type="module" src="' . VIEW_PATH . 'js/UserDashboard/Layout/SideMenu.js"></script>');
        $this->CreateScriptJs(true);
    }

    
    public function CreateViewHeaderFooterSideMenuBkp($view, $auth = true, $data = [])
    {
        $URL_Domain = URL_Domain;
        $SecretKey = SECRET_KEY;
        $VIEW_PATH = VIEW_PATH;
        $VIEW_PATH_INCLUDE = VIEW_PATH_INCLUDE;
        $VIEW_PATH_ADMIN = VIEW_PATH_ADMIN;
        $VIEW_PATH_ADMIN_INCLUDE = VIEW_PATH_ADMIN_INCLUDE;
        $SiteName = SiteName;
        $URL_PATH = URL_PATH;
        $data;
        $this->CreateHeader(true);
        include(VIEW_PATH_INCLUDE . $this->Header);
        echo "<div class='contain-all' id='contain_all'>";
        echo "<div class='side-panel-user'>";
        include($this->UserProfileSideMenu);
        include($this->UserSideMenu);

        echo "</div>";
        echo "<div class='main-page'>";

        if ($auth) {
            if ($this->checkLogin()) {
                include(VIEW_PATH_INCLUDE . $view);
            } else {
                include(VIEW_PATH_INCLUDE . "GoToLogin.html");
            }
        }

        echo "</div>";
        echo "</div>";
        include(VIEW_PATH_INCLUDE . $this->Footer);

        $this->SetSideMenuJs('<script type="module" src="' . VIEW_PATH . 'js/UserDashboard/Layout/SideMenu.js"></script>');
        $this->CreateScriptJs(true);
    }
    public function CreateViewHeaderFooterSideMenuBusiness($view, $auth = true, $data = [])
    {
        $URL_Domain = URL_Domain;
        $SecretKey = SECRET_KEY;
        $VIEW_PATH = VIEW_PATH;
        $VIEW_PATH_INCLUDE = VIEW_PATH_INCLUDE;
        $VIEW_PATH_ADMIN = VIEW_PATH_ADMIN;
        $VIEW_PATH_ADMIN_INCLUDE = VIEW_PATH_ADMIN_INCLUDE;
        $SiteName = SiteName;
        $URL_PATH = URL_PATH;
        $MyAnnouncement=$this->GetData->GetMyAnnouncement();
        $data;
        $this->CreateHeader(true);
        include(VIEW_PATH_INCLUDE . $this->Header);
        echo "<div class='contain-all' id='contain_all'>";
        echo "<div class='side-panel-user'>";
        include($this->BusinessUserProfileSideMenu);
        include($this->BusinessUserSideMenu);

        echo "</div>";
        echo "<div class='main-page'>";

        if ($auth) {
            if ($this->checkLoginBusiness()) {
                include(VIEW_PATH_INCLUDE . $view);
            } else {
                include(VIEW_PATH_INCLUDE . "GoToLoginBusiness.html");
            }
        }

        echo "</div>";
        echo "</div>";
        include(VIEW_PATH_INCLUDE . $this->Footer);
        $this->SetSideMenuJs('<script type="module" src="' . VIEW_PATH . 'js/BusinessDashboard/Layout/SideMenu.js"></script>');
        $this->CreateScriptJs(true);
    }

    public function CreateViewHeaderFooterSideMenuProfessional($view, $auth = true, $data = [])
    {
        $URL_Domain = URL_Domain;
        $SecretKey = SECRET_KEY;
        $VIEW_PATH = VIEW_PATH;
        $VIEW_PATH_INCLUDE = VIEW_PATH_INCLUDE;
        $VIEW_PATH_ADMIN = VIEW_PATH_ADMIN;
        $VIEW_PATH_ADMIN_INCLUDE = VIEW_PATH_ADMIN_INCLUDE;
        $SiteName = SiteName;
        $URL_PATH = URL_PATH;
        $MyAnnouncement=$this->GetData->GetMyAnnouncement();
        if (isset($_COOKIE['bussinessNumber'])) {
            $permissions = $this->Curls->curl_with_token_professional("UserBusiness/getMyPermission", ["idSearch" => $_COOKIE['bussinessNumber']]);
        }

        $data;
        $this->CreateHeader(true);
        include(VIEW_PATH_INCLUDE . $this->Header);
        echo "<div class='contain-all' id='contain_all'>";
        echo "<div class='side-panel-user'>";
        include($this->ProfessionalUserProfileSideMenu);
        include($this->ProfessionalUserSideMenu);

        echo "</div>";
        echo "<div class='main-page'>";

        if ($auth) {
            if ($this->checkLoginProfessional()) {
                include(VIEW_PATH_INCLUDE . $view);
            } else {
                include(VIEW_PATH_INCLUDE . "GoToLoginBusiness.html");
            }
        }

        echo "</div>";
        echo "</div>";
        include(VIEW_PATH_INCLUDE . $this->Footer);
        $this->SetSideMenuJs('<script type="module" src="' . VIEW_PATH . 'js/ProfessionalDashboard/Layout/SideMenu.js"></script>');
        $this->CreateScriptJs(true);
    }
    public function CreateViewHeaderFooterSideMenuTeam($view, $auth = true, $data = [])
    {
        $URL_Domain = URL_Domain;
        $SecretKey = SECRET_KEY;
        $VIEW_PATH = VIEW_PATH;
        $VIEW_PATH_INCLUDE = VIEW_PATH_INCLUDE;
        $VIEW_PATH_ADMIN = VIEW_PATH_ADMIN;
        $VIEW_PATH_ADMIN_INCLUDE = VIEW_PATH_ADMIN_INCLUDE;
        $SiteName = SiteName;
        $URL_PATH = URL_PATH;
        $data;
        $this->CreateHeader(true);
        include(VIEW_PATH_INCLUDE . $this->Header);
        echo "<div class='contain-all' id='contain_all'>";
        echo "<div class='side-panel-user'>";
        include($this->TeamUserProfileSideMenu);
        include($this->TeamUserSideMenu);

        echo "</div>";
        echo "<div class='main-page'>";

        if ($auth) {
            if ($this->checkLoginTeam()) {
                include(VIEW_PATH_INCLUDE . $view);
            } else {
                include(VIEW_PATH_INCLUDE . "GoToLoginTeam.html");
            }
        }

        echo "</div>";
        echo "</div>";
        include(VIEW_PATH_INCLUDE . $this->Footer);
        $this->SetSideMenuJs('<script type="module" src="' . VIEW_PATH . 'js/TeamDashboard/Layout/SideMenu.js"></script>');
        $this->CreateScriptJs(true);
    }

    public function CreateViewHeaderFooter($view, $datas = [],$auth=false)
    {
        $URL_Domain = URL_Domain;
        $SecretKey = SECRET_KEY;
        $URL_PATH = URL_PATH;
        $VIEW_PATH = VIEW_PATH;
        $VIEW_PATH_INCLUDE = VIEW_PATH_INCLUDE;
        $VIEW_PATH_ADMIN = VIEW_PATH_ADMIN;
        $VIEW_PATH_ADMIN_INCLUDE = VIEW_PATH_ADMIN_INCLUDE;
        $SiteName = SiteName;
        $CLIENT_ID_GOOGLE=CLIENT_ID_GOOGLE;
        $CLIENT_REDIRECT_GOOGLE=CLIENT_REDIRECT_GOOGLE;
        $logged=$this->checkLoginAll();
        $data = $datas;

        $setting=$this->Curls->curl("Fetch/GetSetting",[],true);
        $setting=$setting->data[0];

        $categories=$this->Curls->curl("category/GetProductCategory",["type"=>"product"],true);

        $categories=($categories->data);

        $categoriesCoupon=$this->Curls->curl("category/GetProductCategory",["type"=>"coupon"],true);

        $categoriesCoupon=($categoriesCoupon->data);

        $programCat=$this->GetData->GetProof("program");
        $programCat=($programCat->data);


        $this->CreateHeader();
        include(VIEW_PATH_INCLUDE . $this->Header);
        echo '<div class="main-page">';

        if ($auth) {
            if ($this->checkLoginAll()) {

                include(VIEW_PATH_INCLUDE . $view);
            } else {
                include(VIEW_PATH_INCLUDE . "GoToLogin.html");
            }
        }else{
            include(VIEW_PATH_INCLUDE . $view);
        }

        
        echo '</div>';
        include(VIEW_PATH_INCLUDE . $this->Footer);
        $this->CreateScriptJs();
    }

    public function CreateViewAdmin($view)
    {
        $this->CreateHeader();
        include(VIEW_PATH_ADMIN_INCLUDE . $view);
        $this->CreateScriptJs();
    }

    public function CreateViewHeaderFooterSideMenuAdmin($view, $auth = true, $data = [])
    {
        $URL_Domain = URL_Domain;
        $SecretKey = SECRET_KEY;
        $VIEW_PATH = VIEW_PATH;
        $VIEW_PATH_INCLUDE = VIEW_PATH_INCLUDE;
        $VIEW_PATH_ADMIN = VIEW_PATH_ADMIN;
        $VIEW_PATH_ADMIN_INCLUDE = VIEW_PATH_ADMIN_INCLUDE;
        $SiteName = SiteName;
        $this->CreateHeader(true);

        $permissions = $this->GetData->HandelToken("userAdmin/getMyPermissionAdmin", [],true);
  
        $data = $data;


        include(VIEW_PATH_ADMIN_INCLUDE . $this->Header);
        echo "<div class='contain-all' id='contain_all'>";
        echo "<div class='side-panel-user'>";
        include($this->UserProfileSideMenuAdmin);
        include($this->UserSideMenuAdmin);

        echo "</div>";
        echo "<div class='main-page'>";

        if ($auth) {
            if ($this->checkLoginAdmin()) {

                include(VIEW_PATH_ADMIN_INCLUDE . $view);
            } else {
                include(VIEW_PATH_ADMIN_INCLUDE . "GoToLoginAdmin.html");
            }
        }

        echo "</div>";
        echo "</div>";
        include(VIEW_PATH_ADMIN_INCLUDE . $this->Footer);
        $this->CreateScriptJs(true);
    }

    public function CreateViewHeaderFooterSideMenuAdminUserView($view, $auth = true, $data = [])
    {
        $URL_Domain = URL_Domain;
        $SecretKey = SECRET_KEY;
        $VIEW_PATH = VIEW_PATH;
        $VIEW_PATH_INCLUDE = VIEW_PATH_INCLUDE;
        $VIEW_PATH_ADMIN = VIEW_PATH_ADMIN;
        $VIEW_PATH_ADMIN_INCLUDE = VIEW_PATH_ADMIN_INCLUDE;
        $SiteName = SiteName;
        $this->CreateHeader(true);

        $permissions = $this->Curls->curl_with_token_admin("userAdmin/getMyPermissionAdmin", []);
        $data = $data;

        include(VIEW_PATH_ADMIN_INCLUDE . $this->Header);
        echo "<div class='contain-all' id='contain_all'>";
        echo "<div class='side-panel-user'>";
        include($this->UserProfileSideMenuAdmin);
        include($this->UserSideMenuAdmin);

        echo "</div>";
        echo "<div class='main-page'>";

        if ($auth) {
            if ($this->checkLoginAdmin()) {


                include(VIEW_PATH_INCLUDE . $view);
            } else {
                include(VIEW_PATH_ADMIN_INCLUDE . "GoToLoginAdmin.html");
            }
        }

        echo "</div>";
        echo "</div>";
        include(VIEW_PATH_ADMIN_INCLUDE . $this->Footer);
        $this->CreateScriptJs(true);
    }
}
