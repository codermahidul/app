<?php

class claimTable
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
        $result = $this->Curls->curl("claim/get", $data);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];


        foreach ((array)$data as $d) {
            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a data-action="accept" data-id="' . $d->id.",".$d->items_id.",".$d->items_type . '" class="btn btn-s btn-success m-1" ><i class="bi bi-check"></i></a>';

            $action .= "</div>";
            switch($d->items_type)
            {
                case "product":{
                    $title = "<span>" . $d->product_title . "</span>";
                    break;
                }
                case "prize":{
                    $title = "<span>" . $d->prize_title . "</span>";
                    break;
                }
                case "coupon":{
                    $title = "<span>" . $d->coupon_title . "</span>";
                    break;
                }
                case "deals":{
                    $title = "<span>" . $d->deals_title . "</span>";
                    break;
                }
            }
            

            $attachments="";
            $da=explode(",",$d->attachments);
            $i=1;
            foreach($da as $s)
            {
                $file=explode("::",$s);
                $attachments.="<a href='".URL_PATH.$file[0]."/".$file[1]."'>file".$i."</a><br>";
                $i++;
            }
     

            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "display_name" => $d->display_name,
                "email" => $d->email,
                "type" => $d->items_type,
                "description" => $d->description,
                "files"=>$attachments,
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
