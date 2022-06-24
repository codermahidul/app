<?php
include_once dirname(__FILE__) . DIRECTORY_SEPARATOR . "./class/ShareTableClass.php";

class couponAble
{
    private $Curls, $ShareTableClass, $GetData, $bussinessNumber;
    function __construct()
    {
        $this->Curls = new Curls;
        $this->GetData = new GetData;
        $this->ShareTableClass = new ShareTableClass;
        $this->bussinessNumber = $_COOKIE['bussinessNumber'];
    }

    public function get_all()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result = $this->Curls->curl_with_token_business("Coupon/getMyCoupon", $data);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a href="' . URL_Domain . 'UpdateCoupon/' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
            $action .= '<a data-action="updateimage" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-image-fill"></i></a>';
            $action .= '<a data-action="AddToTopList" data-id="' . $d->id . '" class="btn btn-s btn-prim  m-1" ><i class="bi bi-list-ol"></i></a>';
            $action .= '<a title="Add code Or Link" href="' . URL_Domain . 'CouponLinkCode/' . $d->id . '" class="btn btn-s btn-info  m-1" ><i class="bi bi-code"></i></a>';

            $action .= '<a title="Send for Admin" data-action="SendAdmin" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-send-check"></i></a>';

            $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';

            $action .= "</div>";

            $image = "";
            $title = "<span>" . $d->title . "</span>";
            if ($d->file_url !== '' && $d->file_url !== null) {
                $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->title . "</span>";
            }


            if ($d->trash == "1") {
                $disabled = "<span class='text-danger'>Yes</span>";
            } else {
                $disabled = "<span class=''>No</span>";
            }

            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "amount" => ($d->amount),
                "Disabled" => $disabled,
                "description" => $d->description,
                "type" => $d->type_name,
                "link" => $d->link != null ? $d->link : "",
                "product" => $d->product_title != null ? $d->product_title : "",
                "expire" => $d->expire,

                "action" => $action

            ]);
        }

        $data =
            [
                "recordsTotal" => $total,
                "recordsFiltered" => $total,
                "draw" => $_POST['draw'],
                // sEcho=>0,
                // sColumns=>"",
                "data" => $aadata
            ];
        echo json_encode($data);
    }

    public function get_all_for_business()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;
        $data['userIdSearch'] = $this->bussinessNumber;

        $result = $this->Curls->curl("Coupon/get", $data);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];
        $permissions = $this->Curls->curl_with_token_professional("UserBusiness/getMyPermission", ["idSearch" => $this->bussinessNumber]);
        $module = $permissions->data->module;
        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            foreach ($module as $m) {
                if ($m->list == "fo1") {
                    if ($m->action == "edit")
                        $action .= '<a href="' . URL_Domain . 'UpdateCouponP/' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
                    if ($m->action == "image")
                        $action .= '<a data-action="updateimage" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-image-fill"></i></a>';
                    if ($m->action == "top")
                        $action .= '<a data-action="AddToTopList" data-id="' . $d->id . '" class="btn btn-s btn-prim  m-1" ><i class="bi bi-list-ol"></i></a>';
                    if ($m->action == "remove")
                        $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';
                    if ($m->action == "code")
                        $action .= '<a title="Add code Or Link" href="' . URL_Domain . 'CouponLinkCodeP/' . $d->id . '" class="btn btn-s btn-info  m-1" ><i class="bi bi-code"></i></a>';
                    if ($m->action == "admin")
                        $action .= '<a title="Send for Admin" data-action="SendAdmin" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-send-check"></i></a>';
                }
            }

            $action .= "</div>";

            $image = "";
            $title = "<span>" . $d->title . "</span>";
            if ($d->file_url !== '' && $d->file_url !== null) {
                $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->title . "</span>";
            }


            if ($d->trash == "1") {
                $disabled = "<span class='text-danger'>Yes</span>";
            } else {
                $disabled = "<span class=''>No</span>";
            }

            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "amount" => ($d->amount),
                "Disabled" => $disabled,
                "description" => $d->description,
                "type" => $d->type_name,
                "link" => $d->link != null ? $d->link : "",
                "product" => $d->product_title != null ? $d->product_title : "",
                "expire" => $d->expire,

                "action" => $action

            ]);
        }

        $data =
            [
                "recordsTotal" => $total,
                "recordsFiltered" => $total,
                "draw" => $_POST['draw'],
                // sEcho=>0,
                // sColumns=>"",
                "data" => $aaData
            ];
        echo json_encode($data);
    }
    public function get_all_share()
    {
        $this->ShareTableClass->GetTable("coupon/getMyCouponShare", "CouponDetail", "id");
    }
    public function get_all_coupon_link_code()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];

        $data = $data;

        $result = $this->GetData->HandelToken("coupon/getMyCouponCodeLink", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {

            $action = '<div class="product-extra-link2 d-flex">';

            if ($d->used != "0") {
                $action .= '<a data-action="update" data-id="' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil"></i></a>';
                $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';
            }
            $action .= "</div>";

            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "link_code" => $d->link_code,
                "used" => number_format($d->used),
                "action" => $action

            ]);
        }

        $data =
            [
                "recordsTotal" => $total,
                "recordsFiltered" => $total,
                "draw" => $_POST['draw'],
                // sEcho=>0,
                // sColumns=>"",
                "data" => $aadata
            ];
        echo json_encode($data);
    }
    public function get_all_deals()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result = $this->GetData->HandelToken("Deals/getMyDeals", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {
            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a href="' . URL_Domain . 'UpdateDeals/' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
            $action .= '<a data-action="updateImage" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-image-fill"></i></a>';
            $action .= '<a title="Add code Or Link" href="' . URL_Domain . 'DealsLinkCode/' . $d->id . '" class="btn btn-s btn-info  m-1" ><i class="bi bi-code"></i></a>';

            $action .= '<a data-action="view" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-eye-fill"></i></a>';
            $action .= '<a title="Add To Top List" data-action="AddToTopList" data-id="' . $d->id . '" class="btn btn-s btn-prim  m-1" ><i class="bi bi-list-ol"></i></a>';


            $action .= '<a title="Send for Admin" data-action="SendAdmin" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-send-check"></i></a>';

            $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';

            $action .= "</div>";

            $image = "";
            $title = "<span>" . $d->title . "</span>";
            if ($d->file_url !== '' && $d->file_url !== null) {
                $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->title . "</span>";
            }


            if ($d->trash == "1") {
                $disabled = "<span class='text-danger'>Yes</span>";
            } else {
                $disabled = "<span class=''>No</span>";
            }

            $value = "";
            if ($d->type_name == "Percent") {
                $value = $d->amount . "%";
            }
            if ($d->type_name == "Numerical") {
                $value = "$" . $d->amount;
            }

            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "amount" => ($d->amount),
                "Disabled" => $disabled,
                "description" => $d->description,
                "type" => $d->type_name,
                "link" => $d->link != null ? $d->link : "",
                "inventory" => number_format($d->inventory),
                "price" => number_format($d->price),
                "value" => $value,
                "product" => $d->product_title != null ? $d->product_title : "",
                "start" => $d->start,
                "expire" => $d->expire,

                "action" => $action

            ]);
        }

        $data =
            [
                "recordsTotal" => $total,
                "recordsFiltered" => $total,
                "draw" => $_POST['draw'],
                // sEcho=>0,
                // sColumns=>"",
                "data" => $aadata
            ];
        echo json_encode($data);
    }

    public function get_all_deals_for_business()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;
        $data['userIdSearch'] = $this->bussinessNumber;

        $result = $this->Curls->curl("Deals/getAll", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        $permissions = $this->Curls->curl_with_token_professional("UserBusiness/getMyPermission", ["idSearch" => $this->bussinessNumber]);
        $module = $permissions->data->module;

        foreach ((array)$data as $d) {
            $action = '<div class="product-extra-link2 d-flex">';
            foreach ($module as $m) {
                if ($m->list == "de1") {
                    if ($m->action == "edit")
                        $action .= '<a href="' . URL_Domain . 'UpdateDealsP/' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
                    if ($m->action == "image")
                        $action .= '<a data-action="updateImage" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-image-fill"></i></a>';
                    if ($m->action == "top")
                        $action .= '<a title="Add To Top List" data-action="AddToTopList" data-id="' . $d->id . '" class="btn btn-s btn-prim  m-1" ><i class="bi bi-list-ol"></i></a>';
                    if ($m->action == "remove")
                        $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';
                    if ($m->action == "send_admin")
                        $action .= '<a title="Send for Admin" data-action="SendAdmin" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-send-check"></i></a>';
                    if ($m->action == "code_link")
                        $action .= '<a title="Add code Or Link" href="' . URL_Domain . 'DealsLinkCodeP/' . $d->id . '" class="btn btn-s btn-info  m-1" ><i class="bi bi-code"></i></a>';
                    if ($m->action == "view")
                        $action .= '<a data-action="view" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-eye-fill"></i></a>';
                }
            }
            $action .= "</div>";

            $image = "";
            $title = "<span>" . $d->title . "</span>";
            if ($d->file_url !== '' && $d->file_url !== null) {
                $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->title . "</span>";
            }


            if ($d->trash == "1") {
                $disabled = "<span class='text-danger'>Yes</span>";
            } else {
                $disabled = "<span class=''>No</span>";
            }

            $value = "";
            if ($d->type_name == "Percent") {
                $value = $d->amount . "%";
            }
            if ($d->type_name == "Numerical") {
                $value = "$" . $d->amount;
            }

            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "amount" => ($d->amount),
                "Disabled" => $disabled,
                "description" => $d->description,
                "type" => $d->type_name,
                "link" => $d->link != null ? $d->link : "",
                "inventory" => number_format($d->inventory),
                "price" => number_format($d->price),
                "value" => $value,
                "product" => $d->product_title != null ? $d->product_title : "",
                "start" => $d->start,
                "expire" => $d->expire,

                "action" => $action

            ]);
        }

        $data =
            [
                "recordsTotal" => $total,
                "recordsFiltered" => $total,
                "draw" => $_POST['draw'],
                // sEcho=>0,
                // sColumns=>"",
                "data" => $aadata
            ];
        echo json_encode($data);
    }

    public function get_all_deals_admin()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result = $this->Curls->curl_with_token_admin("Deals/getMyDealsAdmin", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {
            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a href="' . URL_Domain . 'UpdateDealsAdmin/' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
            $action .= '<a data-action="updateImage" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-image-fill"></i></a>';
            $action .= '<a title="Add code Or Link" href="' . URL_Domain . 'DealsLinkCodeAdmin/' . $d->id . '" class="btn btn-s btn-info  m-1" ><i class="bi bi-code"></i></a>';

            $action .= '<a data-action="view" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-eye-fill"></i></a>';
            $action .= '<a title="Add To Top List" data-action="AddToTopList" data-id="' . $d->id . '" class="btn btn-s btn-prim  m-1" ><i class="bi bi-list-ol"></i></a>';



            $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';

            $action .= "</div>";

            $image = "";
            $title = "<span>" . $d->title . "</span>";
            if ($d->file_url !== '' && $d->file_url !== null) {
                $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->title . "</span>";
            }


            if ($d->trash == "1") {
                $disabled = "<span class='text-danger'>Yes</span>";
            } else {
                $disabled = "<span class=''>No</span>";
            }

            $value = "";
            if ($d->type_name == "Percent") {
                $value = $d->amount . "%";
            }
            if ($d->type_name == "Numerical") {
                $value = "$" . $d->amount;
            }

            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "amount" => ($d->amount),
                "Disabled" => $disabled,
                "description" => $d->description,
                "type" => $d->type_name,
                "link" => $d->link != null ? $d->link : "",
                "inventory" => number_format($d->inventory),
                "price" => number_format($d->price),
                "value" => $value,
                "product" => $d->product_title != null ? $d->product_title : "",
                "start" => $d->start,
                "expire" => $d->expire,

                "action" => $action

            ]);
        }

        $data =
            [
                "recordsTotal" => $total,
                "recordsFiltered" => $total,
                "draw" => $_POST['draw'],
                // sEcho=>0,
                // sColumns=>"",
                "data" => $aadata
            ];
        echo json_encode($data);
    }

    public function get_all_deals_user()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result = $this->Curls->curl("Deals/get", $data, true);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {
            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a href="' . URL_Domain . 'UpdateDealsAdminUser/' . $d->id . '/' . $d->user_business_id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
            $action .= '<a data-action="updateImage" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-image-fill"></i></a>';
            $action .= '<a title="Add code Or Link" href="' . URL_Domain . 'DealsLinkCodeAdminUser/' . $d->user_business_id . '/' . $d->id . '" class="btn btn-s btn-info  m-1" ><i class="bi bi-code"></i></a>';

            $action .= '<a data-action="view" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-eye-fill"></i></a>';
            $action .= '<a title="Add To Top List" data-action="AddToTopList" data-id="' . $d->id . '" class="btn btn-s btn-prim  m-1" ><i class="bi bi-list-ol"></i></a>';

            $action .= '<a title="Send for Admin" data-action="SendAdmin" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-send-check"></i></a>';


            $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';

            $action .= "</div>";

            $image = "";
            $title = "<span>" . $d->title . "</span>";
            if ($d->file_url !== '' && $d->file_url !== null) {
                $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->title . "</span>";
            }


            if ($d->trash == "1") {
                $disabled = "<span class='text-danger'>Yes</span>";
            } else {
                $disabled = "<span class=''>No</span>";
            }

            $value = "";
            if ($d->type_name == "Percent") {
                $value = $d->amount . "%";
            }
            if ($d->type_name == "Numerical") {
                $value = "$" . $d->amount;
            }

            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "amount" => ($d->amount),
                "Disabled" => $disabled,
                "description" => $d->description,
                "type" => $d->type_name,
                "link" => $d->link != null ? $d->link : "",
                "inventory" => number_format($d->inventory),
                "price" => number_format($d->price),
                "value" => $value,
                "product" => $d->product_title != null ? $d->product_title : "",
                "start" => $d->start,
                "expire" => $d->expire,

                "action" => $action

            ]);
        }

        $data =
            [
                "recordsTotal" => $total,
                "recordsFiltered" => $total,
                "draw" => $_POST['draw'],
                // sEcho=>0,
                // sColumns=>"",
                "data" => $aadata
            ];
        echo json_encode($data);
    }

    public function get_all_deals_link_code()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];

        $data = $data;

        $result = $this->GetData->HandelToken("Deals/getMyDealsCodeLink", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {

            $action = '<div class="product-extra-link2 d-flex">';

            if ($d->used != "0") {
                $action .= '<a data-action="update" data-id="' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil"></i></a>';
                $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';
            }
            $action .= "</div>";

            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "link_code" => $d->link_code,
                "used" => number_format($d->used),
                "action" => $action

            ]);
        }

        $data =
            [
                "recordsTotal" => $total,
                "recordsFiltered" => $total,
                "draw" => $_POST['draw'],
                // sEcho=>0,
                // sColumns=>"",
                "data" => $aadata
            ];
        echo json_encode($data);
    }

    public function get_all_deals_link_code_sub()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];

        $data = $data;
        $data['user_business_id'] = $this->bussinessNumber;

        $result = $this->GetData->HandelToken("Deals/getMyDealsCodeLinkSub", $data, true);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {

            $action = '<div class="product-extra-link2 d-flex">';

            if ($d->used != "0") {
                $action .= '<a data-action="update" data-id="' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil"></i></a>';
                $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';
            }
            $action .= "</div>";

            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "link_code" => $d->link_code,
                "used" => number_format($d->used),
                "action" => $action

            ]);
        }

        $data =
            [
                "recordsTotal" => $total,
                "recordsFiltered" => $total,
                "draw" => $_POST['draw'],
                // sEcho=>0,
                // sColumns=>"",
                "data" => $aadata
            ];
        echo json_encode($data);
    }

    public function get_all_user_shop_deals()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;
        $result = $this->GetData->HandelToken("Deals/getShopCode", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {
            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a href="' . URL_Domain . 'MyShopCode/' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-eye-fill"></i></a>';


            $action .= "</div>";

            $image = "";
            $title = "<span>" . $d->display_name . "</span>";
            if ($d->file_url !== '' && $d->file_url !== null) {
                $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->display_name . "</span>";
            }




            $value = "";
            if ($d->type_name == "Percent") {
                $value = $d->amount . "%";
            }
            if ($d->type_name == "Numerical") {
                $value = "$" . $d->amount;
            }

            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "value" => $value,
                "expire" => $d->expire,

                "action" => $action

            ]);
        }

        $data =
            [
                "recordsTotal" => $total,
                "recordsFiltered" => $total,
                "draw" => $_POST['draw'],
                // sEcho=>0,
                // sColumns=>"",
                "data" => $aadata
            ];
        echo json_encode($data);
    }

    public function get_all_user_shop_coupon()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;
        $result = $this->GetData->HandelToken("coupon/getShopCode", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {
            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a href="' . URL_Domain . 'MyCouponShopCode/' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-eye-fill"></i></a>';


            $action .= "</div>";

            $image = "";
            $title = "<span>" . $d->display_name . "</span>";
            if ($d->file_url !== '' && $d->file_url !== null) {
                $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->display_name . "</span>";
            }




            $value = "";
            if ($d->type_name == "Percent") {
                $value = $d->amount . "%";
            }
            if ($d->type_name == "Numerical") {
                $value = "$" . $d->amount;
            }

            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "value" => $value,
                "expire" => $d->expire,

                "action" => $action

            ]);
        }

        $data =
            [
                "recordsTotal" => $total,
                "recordsFiltered" => $total,
                "draw" => $_POST['draw'],
                // sEcho=>0,
                // sColumns=>"",
                "data" => $aadata
            ];
        echo json_encode($data);
    }

    public function get_all_shop_my_deals()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;
        $result = $this->GetData->HandelToken("Deals/getMyShopCodeDeals", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {
            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a href="' . URL_Domain . 'ShowShopCodeForBusiness/' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-eye-fill"></i></a>';


            $action .= "</div>";

            $image = "";
            $title = "<span>" . $d->title . "</span>";
            if ($d->deals_file_url !== '' && $d->deals_file_url !== null) {
                $image = URL_PATH . $d->deals_file_url . "/small" . "/" . $d->deals_file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->title . "</span>";
            }




            $value = "";
            if ($d->type_name == "Percent") {
                $value = $d->amount . "%";
            }
            if ($d->type_name == "Numerical") {
                $value = "$" . $d->amount;
            }

            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "value" => $value,
                "expire" => $d->expire,
                "product" => $d->product_title,

                "action" => $action

            ]);
        }

        $data =
            [
                "recordsTotal" => $total,
                "recordsFiltered" => $total,
                "draw" => $_POST['draw'],
                // sEcho=>0,
                // sColumns=>"",
                "data" => $aadata
            ];
        echo json_encode($data);
    }
    public function get_all_shop_my_deals_sub()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;
        $data['userIdSearch'] = $this->bussinessNumber;

        $result = $this->Curls->curl("Deals/getShopCodeDealsSub", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {
            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a href="' . URL_Domain . 'ShowShopCodeForBusinessP/' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-eye-fill"></i></a>';


            $action .= "</div>";

            $image = "";
            $title = "<span>" . $d->title . "</span>";
            if ($d->deals_file_url !== '' && $d->deals_file_url !== null) {
                $image = URL_PATH . $d->deals_file_url . "/small" . "/" . $d->deals_file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->title . "</span>";
            }




            $value = "";
            if ($d->type_name == "Percent") {
                $value = $d->amount . "%";
            }
            if ($d->type_name == "Numerical") {
                $value = "$" . $d->amount;
            }

            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "value" => $value,
                "expire" => $d->expire,
                "product" => $d->product_title,

                "action" => $action

            ]);
        }

        $data =
            [
                "recordsTotal" => $total,
                "recordsFiltered" => $total,
                "draw" => $_POST['draw'],
                // sEcho=>0,
                // sColumns=>"",
                "data" => $aadata
            ];
        echo json_encode($data);
    }

    public function get_all_shop_my_coupon_sub()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;
        $data['userIdSearch'] = $this->bussinessNumber;

        $result = $this->Curls->curl("Coupon/getShopCodeCouponSub", $data, true);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {
            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a href="' . URL_Domain . 'ShowCouponShopCodeForBusinessP/' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-eye-fill"></i></a>';


            $action .= "</div>";

            $image = "";
            $title = "<span>" . $d->title . "</span>";
            if ($d->coupon_file_url !== '' && $d->coupon_file_url !== null) {
                $image = URL_PATH . $d->coupon_file_url . "/small" . "/" . $d->coupon_file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->title . "</span>";
            }




            $value = "";
            if ($d->type_name == "Percent") {
                $value = $d->amount . "%";
            }
            if ($d->type_name == "Numerical") {
                $value = "$" . $d->amount;
            }

            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "value" => $value,
                "expire" => $d->expire,
                "product" => $d->product_title,

                "action" => $action

            ]);
        }

        $data =
            [
                "recordsTotal" => $total,
                "recordsFiltered" => $total,
                "draw" => $_POST['draw'],
                // sEcho=>0,
                // sColumns=>"",
                "data" => $aadata
            ];
        echo json_encode($data);
    }

    public function get_all_shop_my_coupon()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;
        $result = $this->GetData->HandelToken("Coupon/getMyShopCodeCoupon", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {
            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a href="' . URL_Domain . 'ShowCouponShopCodeForBusiness/' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-eye-fill"></i></a>';


            $action .= "</div>";

            $image = "";
            $title = "<span>" . $d->title . "</span>";
            if ($d->coupon_file_url !== '' && $d->coupon_file_url !== null) {
                $image = URL_PATH . $d->coupon_file_url . "/small" . "/" . $d->coupon_file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->title . "</span>";
            }




            $value = "";
            if ($d->type_name == "Percent") {
                $value = $d->amount . "%";
            }
            if ($d->type_name == "Numerical") {
                $value = "$" . $d->amount;
            }

            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "value" => $value,
                "expire" => $d->expire,
                "product" => $d->product_title,

                "action" => $action

            ]);
        }

        $data =
            [
                "recordsTotal" => $total,
                "recordsFiltered" => $total,
                "draw" => $_POST['draw'],
                // sEcho=>0,
                // sColumns=>"",
                "data" => $aadata
            ];
        echo json_encode($data);
    }
    public function get_all_coupon_link_code_sub()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];

        $data = $data;
        $data['user_business_id'] = $this->bussinessNumber;

        $result = $this->GetData->HandelToken("Coupon/getMyCouponCodeLinkSub", $data, true);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {

            $action = '<div class="product-extra-link2 d-flex">';

            if ($d->used != "0") {
                $action .= '<a data-action="update" data-id="' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil"></i></a>';
                $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';
            }
            $action .= "</div>";

            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "link_code" => $d->link_code,
                "used" => number_format($d->used),
                "action" => $action

            ]);
        }

        $data =
            [
                "recordsTotal" => $total,
                "recordsFiltered" => $total,
                "draw" => $_POST['draw'],
                // sEcho=>0,
                // sColumns=>"",
                "data" => $aadata
            ];
        echo json_encode($data);
    }
}
