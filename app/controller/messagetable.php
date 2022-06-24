<?php

class messageTable
{
    private $Curls,$GetData;
    function __construct()
    {
        $this->Curls = new Curls;
        $this->GetData=new GetData;
    }

    public function get_all()
    {


        $data = $_POST;
        $data['number'] = $_POST['length'];
        $result = $this->GetData->HandelToken("Message/getMyInbox", $data,true);
 

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];


        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a data-action="view" data-to_user="'.$d->to_user.'" data-id="' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-eye-fill"></i></a>';
            if($d->from_user !==$d->block_id)
            {
                $action .= '<a title="block" data-action="block" data-from_user="'.$d->from_user.'" class="btn btn-s btn-warning  m-1" ><i class="fas fa-user-lock"></i></a>';

            }else
            {
                $action .= '<a title="unblock" data-action="unblock" data-from_user="'.$d->from_user.'" class="btn btn-s btn-info  m-1" ><i class="fas fa-user-lock"></i></a>';

            }
           
            $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';

            $action .= "</div>";

            $title = "<span>" . $d->display_name . "</span>";

            if ($d->logo_name !== '' && $d->logo_name !== null) {
                $image = URL_PATH . $d->logo_url . "/small" . "/" . $d->logo_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $title . "</span>";
            }

            
            if ($d->img_name !== '' && $d->img_name !== null) {
                $image = URL_PATH . $d->img_url . "/small" . "/" . $d->img_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $title . "</span>";
            }

            if ($d->trash == "1") {
                $disabled = "<span class='text-danger'>Yes</span>";
            } else {
                $disabled = "<span class=''>No</span>";
            }

            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "txt" => $d->txt??"",
                "date" => $d->created_at,
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

    
    public function get_all_send()
    {


        $data = $_POST;
        $data['number'] = $_POST['length'];
        $result = $this->GetData->HandelToken("Message/getMySend", $data,true);
 

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];


        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a data-action="view" data-to_user="'.$d->to_user.'" data-id="' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-eye-fill"></i></a>';
            $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';

            $action .= "</div>";

            $title = "<span>" . $d->display_name . "</span>";

            if ($d->logo_name !== '' && $d->logo_name !== null) {
                $image = URL_PATH . $d->logo_url . "/small" . "/" . $d->logo_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $title . "</span>";
            }

            
            if ($d->img_name !== '' && $d->img_name !== null) {
                $image = URL_PATH . $d->img_url . "/small" . "/" . $d->img_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $title . "</span>";
            }

            if ($d->trash == "1") {
                $disabled = "<span class='text-danger'>Yes</span>";
            } else {
                $disabled = "<span class=''>No</span>";
            }

            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "txt" => $d->txt??"",
                "date" => $d->created_at,
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
}
