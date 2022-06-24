<?php

session_start ();
error_reporting(E_ERROR  | E_PARSE);
include_once dirname(__FILE__).DIRECTORY_SEPARATOR."./app/Common/Proof.php";
include_once dirname(__FILE__).DIRECTORY_SEPARATOR."./app/Common/Main.php";
include_once dirname(__FILE__).DIRECTORY_SEPARATOR."./app/Common/Curls.php";
include_once dirname(__FILE__).DIRECTORY_SEPARATOR."./app/Common/SaveParameter.php";
include_once dirname(__FILE__).DIRECTORY_SEPARATOR."./app/Common/GetData.php";
include_once dirname(__FILE__).DIRECTORY_SEPARATOR."./app/Common/Google.php";
include_once dirname(__FILE__).DIRECTORY_SEPARATOR."./app/Common/Facebook.php";
//ini_set('max_execution_time', 0);


$method="";
if(isset($_REQUEST['route']) && $_REQUEST['route']!='')
{
    $route=explode("/",$_REQUEST['route']);
    if(count($route)>1){
        $method=$route['1'];
    }
    $class=strtolower($route[0]);
}
else
$class='home';



if($class!="app")

{


    
    if(file_exists(CONTROLLER_PATH.$class.".php"))
    {
        include(CONTROLLER_PATH.$class.".php");


        $obj=new $class();

        if($method !=='')
        {
            if( method_exists($obj, $method))
            {
           
                $obj->$method();
            }
        }
      
    }else
    {
        include(CONTROLLER_PATH."businessprofileshowdetail.php");
        $obj=new businessprofileshowdetail();
    }
   
}else
{

    if(file_exists($_REQUEST['route']))
    include($_REQUEST['route']);
}
