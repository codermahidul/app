<?php

class coupon
{
    private $Curls,$GetData;
    function __construct()
    {
        $this->Curls = new Curls;
        $this->GetData=new GetData;
    }

    
    private function GetItem()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        $data['title'] = $_POST['title'];
        $data['description'] = $_POST['description'];
        $data['amount'] = $_POST['amount'];
        $data['type'] = $_POST['type'];
        $data['link'] = $_POST['link'];
        $data['start'] = $_POST['start'];
        $data['expire'] = $_POST['expire'];
        $data['inventory'] = $_POST['inventory'];
  
        $data['product_id'] = $_POST['product_id'];

        $data['online'] = $_POST['online'];
        $data['country_id'] = $_POST['country_id'];
        $data['province_id'] = $_POST['province_id'];
        $data['city_id'] = $_POST['city_id'];

        $data['category_id'] = $_POST['category_id'];
        $data['categories'] = $_POST['categories'];
        $data['type_use'] = $_POST['type_use'];
        $data['deal_product_price'] = $_POST['deal_product_price'];
        $data['product_price'] = $_POST['product_price'];
        return $data;
    }

    public function newCoupon()
    {
        $data=$this->GetItem();
        echo $this->Curls->curl_with_token_business("coupon/addCoupon", $data, false);

    }

    public function getData()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_business("coupon/getMycoupon", $data, false);
    }

    public function updateCoupon()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("coupon/updateCoupon", $data, false);
    }

    public function remove()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("coupon/removeCoupon", $data, false);
    }

    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("coupon/get",$data,false);
    }

    public function deleteImage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("coupon/removeImageCoupon", $data, false);
    }

    public function updateimage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        $data['idSearch'] = $_POST['idSearch'];
        echo $this->GetData->HandelToken("coupon/updateImageCoupon", $data, false);
    }

    public function getDataAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("coupon/getMyCouponAdmin", $data, false);
    }

    public function newCouponAdmin()
    {

        $data=$this->GetItem();
        $data['send_admin'] = '1';
        $data['admin_confirm'] = '1';
        
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
            $data['user_business_id']=$_POST['user_business_id'];
        }
        echo $this->Curls->curl_with_token_admin("coupon/addCouponAdmin", $data, false);
    }

    public function newCouponSub()
    {

        $data=$this->GetItem();
        if (isset($_COOKIE['bussinessNumber'])) {
            $data['user_business_id'] = $_COOKIE['bussinessNumber'];
            echo $this->GetData->HandelToken("coupon/addCouponSub", $data, false);
        }
    }

    public function confirmCoupon()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("coupon/confirmCoupon",$data,false);
    }

    public function updateCouponAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if(isset($data['for_user']))
        {
            $data['is_admin']='1';  
            if(isset($data['for_remove']))
            {
                $data['for_remove']='1';
            } 
        }
        echo $this->Curls->curl_with_token_admin("coupon/updateCoupon", $data, false);
    }


    public function removeAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if(isset($data['for_user']))
        {
            $data['is_admin']='1';  
        }
        echo $this->Curls->curl_with_token_admin("coupon/removeCoupon", $data, false);
    }

    public function deleteImageAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("coupon/removeImageCoupon", $data, false);
    }

    public function updateImageAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        $data['idSearch'] = $_POST['idSearch'];
        if (isset($_POST['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("coupon/updateImageCoupon", $data, false);
    }
    
    public function addNewComment()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token("CouponComment/addNewComment",$data,false);
    }
  
    public function addReplyComment()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token("CouponComment/addNewReplyComment",$data,false);
    }
    
    public function addReplyCommentBusiness()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_business("CouponComment/addBusinessReplyComment",$data,false);
    }

    public function getComment()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("CouponComment/get",$data,false);
    }
    

    public function addNewCommentLike()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if($data['creator_type']=="user")
        echo $this->Curls->curl_with_token("CouponComment/addNewLikeComment",$data,false);
        if($data['creator_type']=="business")
        echo $this->Curls->curl_with_token_business("CouponComment/addNewLikeComment",$data,false);
    }

    public function removeCommentLike()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if($data['creator_type']=="user")
        echo $this->Curls->curl_with_token("CouponComment/RemoveLikeComment",$data,false);
        if($data['creator_type']=="business")
        echo $this->Curls->curl_with_token_business("CouponComment/RemoveLikeComment",$data,false);
    }

    public function rate()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token("rate/addCouponRate", $data, false);
    }

    public function setLinkCode()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("coupon/AddLinkCode", $data, false);
    }

    public function setLinkCodeSub()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $data['user_business_id'] = $_COOKIE['bussinessNumber'];
        echo $this->GetData->HandelToken("coupon/AddLinkCodeSub", $data, false);
    }

    public function getLinkCode()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("coupon/GetLinkCode", $data, false);
    }

    public function updateLinkCode()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("coupon/UpdateMyLinkCode", $data, false);
    }

    public function updateLinkCodeSub()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $data['user_business_id'] = $_COOKIE['bussinessNumber'];

        echo $this->GetData->HandelToken("coupon/UpdateMyLinkCodeSub", $data, false);
    }

    public function removeLinkCode()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("coupon/RemoveLinkCode", $data, false);
    }

    public function removeLinkCodeSub()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $data['user_business_id'] = $_COOKIE['bussinessNumber'];
        echo $this->GetData->HandelToken("coupon/RemoveLinkCodeSub", $data, false);
    }
    
    public function shopCode()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("coupon/ShopCode", $data, false);
    }
}
