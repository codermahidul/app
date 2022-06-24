<?php

class deals
{
    private $Curls, $GetData;
    function __construct()
    {
        $this->Curls = new Curls;
        $this->GetData = new GetData;
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
        $data['price'] = $_POST['price'];
        $data['product_id'] = $_POST['product_id'];

        $data['online'] = $_POST['online'];
        $data['country_id'] = $_POST['country_id'];
        $data['province_id'] = $_POST['province_id'];
        $data['city_id'] = $_POST['city_id'];

        $data['category_id'] = $_POST['category_id'];
        $data['categories'] = $_POST['categories'];
        $data['deal_product_price'] = $_POST['deal_product_price'];
        $data['product_price'] = $_POST['product_price'];

        return $data;
    }

    public function addNew()
    {

        $data = $this->GetItem();
        echo $this->GetData->HandelToken("Deals/addDeals", $data, false);
    }

    public function getData()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Deals/getMyDeals", $data, false);
    }

    public function updateDeals()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Deals/updateDeals", $data, false);
    }

    public function remove()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Deals/removeDeals", $data, false);
    }

    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("Deals/get", $data, false);
    }

    public function getAll()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("Deals/getAll", $data, false);
    }
    public function deleteImage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Deals/removeImageDeals", $data, false);
    }

    public function updateImage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        $data['idSearch'] = $_POST['idSearch'];
        echo $this->GetData->HandelToken("Deals/updateImageDeals", $data, false);
    }

    public function getDataAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Deals/getMyDealsAdmin", $data, false);
    }

    public function newDealsAdmin()
    {

        $data = $this->GetItem();

        $data['send_admin'] = '1';
        $data['admin_confirm'] = '1';

        if (isset($_POST['for_user'])) {
            $data['is_admin'] = '1';
            $data['user_business_id'] = $_POST['user_business_id'];
        }

        echo $this->Curls->curl_with_token_admin("Deals/addDealsAdmin", $data, false);
    }

    public function addNewSub()
    {

        $data = $this->GetItem();

        if (isset($_COOKIE['bussinessNumber'])) {
            $data['user_business_id'] = $_COOKIE['bussinessNumber'];
            echo $this->GetData->HandelToken("Deals/addDealsSub", $data, false);
        }
    }

    public function confirmDeals()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Deals/confirmDeals", $data, false);
    }

    public function updateDealsAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
            if (isset($data['for_remove'])) {
                $data['for_remove'] = '1';
            }
        }
        echo $this->Curls->curl_with_token_admin("Deals/updateDeals", $data, false);
    }

    public function updateDealsPresentAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Deals/setPresentDeals", $data, false);
    }


    public function removeAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("Deals/removeDeals", $data, false);
    }

    public function deleteImageAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("Deals/removeImageDeals", $data, false);
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
        echo $this->Curls->curl_with_token_admin("Deals/updateImageDeals", $data, false);
    }

    public function addNewComment()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token("DealsComment/addNewComment", $data, false);
    }

    public function addReplyComment()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token("DealsComment/addNewReplyComment", $data, false);
    }

    public function addReplyCommentBusiness()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_business("DealsComment/addBusinessReplyComment", $data, false);
    }

    public function getComment()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("DealsComment/get", $data, false);
    }


    public function addNewCommentLike()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if ($data['creator_type'] == "user")
            echo $this->Curls->curl_with_token("DealsComment/addNewLikeComment", $data, false);
        if ($data['creator_type'] == "business")
            echo $this->Curls->curl_with_token_business("DealsComment/addNewLikeComment", $data, false);
    }

    public function removeCommentLike()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if ($data['creator_type'] == "user")
            echo $this->Curls->curl_with_token("DealsComment/RemoveLikeComment", $data, false);
        if ($data['creator_type'] == "business")
            echo $this->Curls->curl_with_token_business("DealsComment/RemoveLikeComment", $data, false);
    }

    public function rate()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token("rate/addDealsRate", $data, false);
    }


    public function setLinkCode()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Deals/AddLinkCode", $data, false);
    }

    public function setLinkCodeSub()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $data['user_business_id'] = $_COOKIE['bussinessNumber'];
        echo $this->GetData->HandelToken("Deals/AddLinkCodeSub", $data, false);
    }

    public function updateLinkCode()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Deals/UpdateMyLinkCode", $data, false);
    }

    public function updateLinkCodeSub()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $data['user_business_id'] = $_COOKIE['bussinessNumber'];

        echo $this->GetData->HandelToken("Deals/UpdateMyLinkCodeSub", $data, false);
    }

    public function getLinkCode()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("Deals/GetLinkCode", $data, false);
    }

    public function removeLinkCode()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Deals/RemoveLinkCode", $data, false);
    }

    public function removeLinkCodeSub()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $data['user_business_id'] = $_COOKIE['bussinessNumber'];
        echo $this->GetData->HandelToken("Deals/RemoveLinkCodeSub", $data, false);
    }


    public function ClearingDealsShop()
    {
        $data = json_decode(file_get_contents('php://input'), true);


        if (count($_FILES) > 0) {
            for ($i = 0; $i < count($_FILES); $i++) {
                $cfile = curl_file_create($_FILES['img' . $i]['tmp_name'], $_FILES['img' . $i]['type'], basename($_FILES['img' . $i]['name']));
                $data['img' . $i] = ($cfile);
            }
        } else
            $data['img'] = '';

        $data['idSearch'] = $_POST['idSearch'];

        echo $this->Curls->curl_with_token_admin("Deals/ClearingDealsShop", $data, false);

    }
}
