<?php

class product
{
    private $Curls, $GetData, $bussinessNumber;
    function __construct()
    {
        $this->Curls = new Curls;
        $this->GetData = new GetData;
        $this->bussinessNumber = $_COOKIE['bussinessNumber'];
    }

    private function GetItem(){
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        $data['title'] = $_POST['title'];
        $data['price'] = $_POST['price'];
        $data['description'] = $_POST['description'];
        $data['category_id'] = $_POST['category_id'];
        $data['categorys'] = $_POST['categorys'];
        $data['product_link'] = $_POST['product_link'];
        $data['online'] = $_POST['online'];
        $data['country_id'] = $_POST['country_id'];
        $data['province_id'] = $_POST['province_id'];
        $data['city_id'] = $_POST['city_id'];


        $data['age_range'] = $_POST['age_range'];
        $data['active_ingredients'] = $_POST['active_ingredients'];
        $data['item_form'] = $_POST['item_form'];
        $data['special_ingredients'] = $_POST['special_ingredients'];
        $data['benefits'] = $_POST['benefits'];
        $data['item_dimensions'] = $_POST['item_dimensions'];
        $data['liquid_volume'] = $_POST['liquid_volume'];
        $data['skin_type'] = $_POST['skin_type'];
        $data['hair_type'] = $_POST['hair_type'];

        return $data;
    }

    public function newProduct()
    {
        
        $data=$this->GetItem();
        echo $this->GetData->HandelToken("Product/addProduct", $data, false);
    }

    public function getData()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Product/getMyProduct", $data, false);
    }

    public function updateProduct()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Product/updateProduct", $data, false);
    }

    public function remove()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Product/removeProduct", $data, false);
    }

    public function deleteimage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Product/removeImageProduct", $data, false);
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
        echo $this->GetData->HandelToken("Product/updateImageProduct", $data, false);
    }

    public function getGallery()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("Product/getGalleryImage", $data, false);
    }

    public function updateimagegallery()
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
        echo $this->GetData->HandelToken("Product/addImageGallery", $data, false);
    }

    public function deleteimagegallery()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Product/removeImageGallery", $data, false);
    }

    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("Product/get", $data, false);
    }

    public function confirmProduct()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Product/confirmProduct", $data, false);
    }


    public function newProductSub()
    {
        $data=$this->GetItem();

        if (isset($_COOKIE['bussinessNumber'])) {
            $data['user_business_id'] = $_COOKIE['bussinessNumber'];
            echo $this->GetData->HandelToken("Product/addProductSub", $data, false);
        }
    }

    public function newProductAdmin()
    {
        $data=$this->GetItem();

        if (isset($_POST['for_user'])) {
            $data['is_admin'] = '1';
            $data['user_business_id'] = $_POST['user_business_id'];
        }
        echo $this->Curls->curl_with_token_admin("Product/addProductAdmin", $data, false);
    }

    public function getDataAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Product/getMyProductAdmin", $data, false);
    }

    public function updateProductAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
            if (isset($data['for_remove'])) {
                $data['for_remove'] = '1';
            }
        }
        echo $this->Curls->curl_with_token_admin("Product/updateProduct", $data, false);
    }


    public function deleteImageAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("Product/removeImageProduct", $data, false);
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
        echo $this->Curls->curl_with_token_admin("Product/updateImageProduct", $data, false);
    }
    public function updateimagegalleryadmin()
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

        if (isset($_POST['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("Product/addImageGallery", $data, false);
    }

    public function deleteimagegallery_admin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("Product/removeImageGallery", $data, false);
    }

    public function removeAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['for_user'])) {
            $data['is_admin'] = '1';
        }
        echo $this->Curls->curl_with_token_admin("Product/removeProduct", $data, false);
    }

    public function addProductDateAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Product/addProductDate", $data, false);
    }


    public function getProductDateAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Product/getProductDate", $data, false);
    }


    public function deleteProductDate()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("Product/RemoveProductDate", $data, false);
    }

    public function rate()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("rate/addProductRate", $data, false);
    }


    public function addNewComment()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("ProductComment/addNewComment", $data, false);
    }

    public function addReplyComment()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("ProductComment/addNewReplyComment", $data, false);
    }

    public function addReplyCommentBusiness()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_business("ProductComment/addBusinessReplyComment", $data, false);
    }

    public function getComment()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("ProductComment/get", $data, false);
    }


    public function addNewCommentLike()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("ProductComment/addNewLikeComment", $data, false);
  
    }

    public function removeCommentLike()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        //if ($data['creator_type'] == "user")
        echo $this->GetData->HandelToken("ProductComment/RemoveLikeComment", $data, false);
        // if ($data['creator_type'] == "business")
        //     echo $this->Curls->curl_with_token_business("ProductComment/RemoveLikeComment", $data, false);
    }

    public function getDataCouponSub()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $data['userIdSearch'] = $this->bussinessNumber;

        echo $this->GetData->HandelToken("Product/getMyAndAllProduct", $data, false);
    }
}
