<?php

class wishTable
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
        $result = $this->GetData->HandelToken("wish/getMyWish", $data,true);
        
        
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];


        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a title="Choose Type" data-action="type" data-id="'.$d->id.'" data-txt="' . $d->text . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-pencil"></i></a>';
         //   $action .= '<a  href="' . URL_Domain . 'ApplyProjectList/' . $d->id . '" class="btn btn-s btn-green b-radus m-1" ><i class="bi bi-people-fill"></i></a>';

            $action .= "</div>";

            $type = "";
     
            $image = "";
            switch($d->item_type)
            {
                case "product":{
                    $titles=$d->title_product;
                    $href="ProductDetail/".$d->title_slug_product;
                    $file_url=$d->file_url_product;
                    $file_name=$d->file_name_product;
                    break;
                }

                case "prize":{
                    $titles=$d->title_prize;
                    $href="PrizeDetail/".$d->title_slug_prize;
                    $file_url=$d->file_url_prize;
                    $file_name=$d->file_name_prize;
                    break;
                }

                case "coupon":{
                    $titles=$d->title_coupon;
                    $href="CouponDetail/".$d->title_slug_coupon;
                    $file_url=$d->file_url_coupon;
                    $file_name=$d->file_name_coupon;
                    break;
                }


                case "deals":{
                    $titles=$d->title_deals;
                    $href="DealsDetail/".$d->title_slug_deals;
                    $file_url=$d->file_url_deals;
                    $file_name=$d->file_name_deals;
                    break;
                }


                case "job":{
                    $titles=$d->title_job;
                    $href="JobDetail/".$d->title_slug_job;
                    $file_url=$d->file_url_job;
                    $file_name=$d->file_name_job;
                    break;
                }


                case "program":{
                    $titles=$d->title_program;
                    $href="ProgramDetail/".$d->title_slug_program;
                    $file_url=$d->file_url_program;
                    $file_name=$d->file_name_program;
                    break;
                }

                case "business":{
                    $titles=$d->title_business;
                    $href=$d->title_slug_business;
                    $file_url=$d->file_url_business;
                    $file_name=$d->file_name_business;
                    break;
                }

            }
            
            if ($file_url !== '' && $file_url !== null) {
                $image = URL_PATH . $file_url . "/small" . "/" . $file_name;
                $titles = "<img class='sm-img-table' src='" . $image . "'> <span>" . $titles . "</span>";
            }
            $title = '<a href="'.URL_Domain.$href.'" class="text-dark">' . $titles . '</a>';
            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "title" =>$title,
                "type" => $d->type_name??"",
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
