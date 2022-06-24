<?php

class adminPrizeTable
{
    private $Curls;
    function __construct()
    {
        $this->Curls = new Curls;
    }

    public function get_all()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result = $this->Curls->curl_with_token_admin("Prize/getMyPrizeAdmin", $data);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a data-action="update" data-id="' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
            $action .= '<a data-action="updateimage" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-image-fill"></i></a>';
            $action .= '<a data-action="view" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-eye-fill"></i></a>';
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
                "jvalues" => ($d->jvalues) ,
                "jnumber"=>number_format($d->jnumber),
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

    public function get_all_user()
    {
  
        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;
  
        $result = $this->Curls->curl_with_token_admin("Prize/get", $data);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];
  
        foreach ((array)$data as $d) {
  
  
            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a data-action="update" data-id="' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
            $action .= '<a data-action="updateimage" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-image-fill"></i></a>';
            $action .= '<a data-action="view" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-eye-fill"></i></a>';
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
                "jvalues" => ($d->jvalues) ,
                "jnumber"=>number_format($d->jnumber),
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

    public function get_all_prize_date()
    {
  
        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;
  
        $result = $this->Curls->curl_with_token_admin("Prize/getPrizeDate", $data);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];
  
        foreach ((array)$data as $d) {
  
  
            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';
  
            $action .= "</div>";
            $title = "<span>" . $d->title . "</span>";
       
       
  
            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "prize_title" => ($d->prize_title) ,
                "number_donations"=>number_format($d->number_donations),
                "date_donation" => $d->date_donation,
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
