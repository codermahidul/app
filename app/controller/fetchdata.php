<?php

class fetchData
{
    private $Curls,$GetData,$type_online;
    function __construct()
    {
        $this->Curls = new Curls;
        $this->GetData=new GetData;
        $this->type_online=$this->GetData->GetTypeOnline();

    }

    public function country_get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo ($this->Curls->curl("country/get", $data, false));
    }

    public function proof_get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("proof/get", $data, false);
    }

    public function getMyExperience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userExperience/getMyExperience", $data, false);
    }

    public function getCategory()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("category/get", $data, false);
    }

    public function addnoteadmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("note/addNotes", $data, false);
    }

    public function addnewtopshow()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("topShow/addTopShow", $data, false);
    }

    public function removetopshow()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("topShow/removeTopShow", $data, false);
    }

    public function topShowGet()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("topShow/get", $data, false);
        
    }

    public function addnewhomeshow()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("homeShow/addhomeshow", $data, false);
    }


    public function removehomeshow()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("homeShow/removehomeshow", $data, false);
    }

    public function addnewreport()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("report/addNewReport", $data, false);
    }

    public function getSearchDataHeader()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $number = "5";
        $param = ["title" => $data['search'], "trash" => "0", "admin_confirm" => "1", "number" => $number];

        $product = $this->Curls->curl("product/get", $param, true);
        $prize = $this->Curls->curl("prize/get", $param, true);
        $coupon = $this->Curls->curl("coupon/get", $param, true);
        $job = $this->Curls->curl("job/get", $param, true);
        $deals = $this->Curls->curl("deals/get", $param, true);
        $program = $this->Curls->curl("program/get", $param, true);
        $business = $this->Curls->curl("UserBusiness/get", ["display_name" => $data['search'], "number" => $number], true);
        $datas = [];

        $datas = [
            "product" => $product->data->data,
            "prize" => $prize->data->data,
            "job" => $job->data->data,
            "coupon" => $coupon->data->data,
            "deals" => $deals->data->data,
            "program" => $program->data->data,
            "business" => $business->data->data
        ];
        echo json_encode($datas);
    }

    public function getCategoryMenu()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $level1 = $this->Curls->curl("category/get", ["type" => "product", "parent" => "0"], true);

        $datas = [
            "level1" => $level1->data->data,
        ];
        echo json_encode($datas);
    }

    public function getTowLevelCat()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $header = $this->Curls->curl("category/get", $data, true);
        $datas = [];
        foreach ($header->data->data as $header) {

            $item = $this->Curls->curl("category/get",["parent" => $header->id,"type" => "product"],true);
            $d=["header"=>$header,"items"=>$item->data->data];
            array_push($datas,$d);
        }


        echo json_encode($datas);
    }

    
    public function newBannerOrder()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $type_online=$this->GetData->GetTypeOnline();

        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        $data['link'] = $_POST['link'];
        $data['calculate_type'] = $_POST['calculate_type'];
        $data['type'] = $_POST['type'];
        $data['numbers'] = $_POST['numbers'];
        $data['section'] = $_POST['section'];
        $data['creator_type'] = $_POST['creator_type'];
        $data['category_id'] = $_POST['category_id'];
        $data['proof_id'] = $_POST['proof_id'];
   
       
 
        echo $this->GetData->HandelToken("bannerOrder/addBannerOrder", $data, false);


        
    
    }

    public function removeBannerOrder()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("bannerOrder/removeBannerOrder", $data);
   

    }
  
    public function GetDataBannerOrder()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if($data['creator_type']=="user")
        {
            echo $this->GetData->HandelToken("bannerOrder/getMyOrder", $data, false);

        }else
        {
            if($this->type_online=="userBusiness")
            echo $this->GetData->HandelToken("bannerOrder/getMyOrder", $data, false);
    
            if($this->type_online=="userProfessional")
            echo $this->GetData->HandelToken("bannerOrder/getMyOrder", $data, false);


        }
    }

    
    public function RemoveImageBannerOrder()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if($data['creator_type']=="user")
        {
            echo $this->GetData->HandelToken("bannerOrder/RemoveImage", $data, false);

        }else
        {
            if($this->type_online=="userBusiness")
            echo $this->GetData->HandelToken("bannerOrder/RemoveImage", $data, false);
    
            if($this->type_online=="userProfessional")
            echo $this->GetData->HandelToken("bannerOrder/RemoveImage", $data, false);


        }
    }

    
    public function AddImageBannerOrder()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        $data['idSearch'] = $_POST['idSearch'];
 
        if($data['creator_type']=="user")
        {
            echo $this->GetData->HandelToken("bannerOrder/updateImage", $data, false);

        }else
        {
            if($this->type_online=="userBusiness")
            echo $this->GetData->HandelToken("bannerOrder/updateImage", $data, false);
    
            if($this->type_online=="userProfessional")
            echo $this->GetData->HandelToken("bannerOrder/updateImage", $data, false);


        }
    }

    
    public function confirmBannerOrderAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
   
        echo $this->GetData->HandelToken("bannerOrder/confirmBannerOrder", $data, false);

        
    }

    public function jobStatus()
    {
        
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("JobApply/GetStatusList", $data, false);

    }

    
    public function AddToWish()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("wish/Add", $data, false);
    }
    
    public function AddTypeWish()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("wish/AddType", $data, false);
    }
    
    public function getMyType()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("wish/getMyTypeWish", $data, false);
    }
    
    public function RemoveType()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("wish/RemoveTypeWish", $data, false);
    }

    public function updateWishType()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("wish/updateMyWish", $data, false);
    }

    public function removeWish()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("wish/remove", $data, false);
    }
    
    public function getTimeZone()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Fetch/GetAllTimeZone", $data, false);
    }

    public function updateDataPage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Fetch/updateDataPage",$data,false);
    }
    public function getDataPage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->Curl("Fetch/GetDataPage", $data, false);
    }

    public function removeComment()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Fetch/RemoveComment", $data, false);
    }

    public function newContact()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("Fetch/AddContact", $data, false);
    }
}
