<?php

class setting {
    private $Curls,$GetData;
     function __construct()
    {
        $this->Curls=new Curls;
        $this->GetData=new GetData;
    }



    
    public function setPoint()
    {
        
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Point/updatePoint",$data,false);
    }

    
    public function getSection()
    {
        
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("Section/get",$data,false);
    } 

    public function setAdListPrice()
    {
        
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Section/addNew",$data,false);
    } 
    
    public function getDataAdListPrice()
    {
        
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Section/getAdListPrice",$data,false);
    } 
    
    public function DeleteAdListPrice()
    {
        
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Section/RemoveSectionList",$data,false);
    }
    
    public function addNewBanner()
    {
        
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Section/addNewBanner",$data,false);
    } 

    public function deleteBanner()
    {
        
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Section/RemoveBanner",$data,false);
    } 
    public function getBannerOrders()
    {
        
        $data = json_decode(file_get_contents('php://input'), true);
        $result=$this->Curls->curl("BannerOrder/getRand",$data,false);
        echo $result;
        $result=json_decode($result);
        $this->GetData->CalculateBanner($result->data->data);
     
    } 

    public function UpdateBannerNumber()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $this->Curls->curl("BannerOrder/updateBannerOrderNumberShow",$data,false);

    }
    
    public function UpdateSeo()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("seo/update",$data,false);

    }

    public function addStudio()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Studio/add",$data,false);
    }
    
    public function getStudio()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("Studio/get",$data,false);
    }

    public function editStudio()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Studio/update",$data,false);
    }
    
    
    public function removeStudio()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Studio/remove",$data,false);
    }

    
    public function setSetting()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Fetch/UpdateSetting",$data,false);
    }

    public function addAnnouncement()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Announcement/addAnnouncement",$data,false);
    }

    public function getAnnouncement()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Announcement/get",$data,false);
    }
}
?>