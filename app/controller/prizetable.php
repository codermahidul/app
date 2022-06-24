<?php
include_once dirname(__FILE__).DIRECTORY_SEPARATOR."./class/ShareTableClass.php";

class prizetable
{
    private $Curls,$ShareTableClass;
    function __construct()
    {
        $this->Curls = new Curls;
        $this->ShareTableClass=new ShareTableClass;

    }

    public function get_all()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result = $this->Curls->curl_with_token_business("Prize/getMyPrize", $data);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a data-action="update" data-id="' . $d->id . '" class="btn btn-s btn-primary m-1" ><i class="bi bi-pencil-fill"></i></a>';
            $action .= '<a data-action="updateimage" data-id="' . $d->id . '" class="btn btn-s btn-warning m-1" ><i class="bi bi-image-fill"></i></a>';
            $action .= '<a data-action="view" data-id="' . $d->id . '" class="btn btn-s btn-success m-1" ><i class="bi bi-eye-fill"></i></a>';
            $action .= '<a data-action="AddToTopList" data-id="' . $d->id . '" class="btn btn-s btn-prim m-1" ><i class="bi bi-list-ol"></i></a>';

            $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger m-1" ><i class="bi bi-trash-fill"></i></a>';

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
                "jvalues" => ($d->jvalues) ,
                "Disabled" => $disabled,
                "description" => $d->description,
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

        $result = $this->Curls->curl_with_token_professional("Prize/get", $data);
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
                if ($m->list == "e1") {
                    if ($m->action == "edit")
                    $action .= '<a data-action="update" data-id="' . $d->id . '" class="btn btn-s btn-primary m-1" ><i class="bi bi-pencil-fill"></i></a>';
                    if ($m->action == "image")
                    $action .= '<a data-action="updateimage" data-id="' . $d->id . '" class="btn btn-s btn-warning m-1" ><i class="bi bi-image-fill"></i></a>';
                    if ($m->action == "view")
                    $action .= '<a data-action="view" data-id="' . $d->id . '" class="btn btn-s btn-success m-1" ><i class="bi bi-eye-fill"></i></a>';
                    if ($m->action == "top")
                    $action .= '<a data-action="AddToTopList" data-id="' . $d->id . '" class="btn btn-s btn-prim m-1" ><i class="bi bi-list-ol"></i></a>';
                    if ($m->action == "remove")
                    $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger m-1" ><i class="bi bi-trash-fill"></i></a>';
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
                "jvalues" => ($d->jvalues) ,
                "Disabled" => $disabled,
                "description" => $d->description,
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
        $this->ShareTableClass->GetTable("prize/getMyPrizeShare","PrizeDetail","id");
    }
}
