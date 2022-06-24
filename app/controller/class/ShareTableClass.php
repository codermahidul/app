<?php

class ShareTableClass{
    private $Curls;
    function __construct()
    {
        $this->Curls = new Curls;
    }


    public function GetTable($url,$detailPage,$item)
    {
        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result = $this->Curls->curl_with_token_professional($url, $data);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {


            $action = '<div class="action-table">';
            if($d->share != "1")
            $action .= '<a data-action="share" data-id="' . $d->id . '" class="btn btn-s btn-primary b-radus m-1" ><i class="bi bi-share-fill"></i></i></a>';
            
            $action .= '<a target="blank" class="btn btn-s btn-success b-radus m-1" href="'.URL_Domain.$detailPage.'/'.$d->{$item}.'" ><i class="bi bi-eye-fill"></i></a>';

            $action .= "</div>";
            $image = "";
            $title = "<span>" . $d->title . "</span>";
            if ($d->file_url !== '' && $d->file_url !== null) {
                $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->title . "</span>";
            }
            if ($d->share == "1") {
                $share = "<span class='text-success'>Yes</span>";
            } else {
                $share = "<span class=''>No</span>";
            }

            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "category_name" => $d->category_name,
                "price" => number_format($d->price) ,
                "share" => $share,
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
}


?>