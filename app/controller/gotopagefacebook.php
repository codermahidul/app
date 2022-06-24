
<?php
class GoToPageFacebook
{
    private $Main;
    function __construct()
    {


        $this->Main = new Main;
        $this->Facebook = new Facebook();

        $this->Main->SetTitle("Login");
        $Css = '<link rel="stylesheet" href="' . VIEW_PATH . 'css/Auth/Auth.css?v=' . VERSION . '">';
        $Js = '<script type="module" src="' . VIEW_PATH . 'js/Auth/RegisterAfterApiLogin.js?v=' . VERSION . '"></script>';
        $this->Main->SetJs($Js);
        $this->Main->SetCss($Css);


        $url=explode("/",$_SERVER['REQUEST_URI']);
    


        $this->Main->CreateView("GoToPageFacebook.html", [
            "href" => $url[count($url)-3],
            "tokenName"=>$url[count($url)-2],
            "tokenValue"=>$url[count($url)-1],

        ]);

    
    }
}
