<?php

class bannerOrderTable
{
    private $Curls,$GetData;
    function __construct()
    {
        $this->Curls = new Curls;
        $this->GetData=new GetData;

    }

    public function get_all()
    {

        $type_online=$this->GetData->GetTypeOnline();

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

      
        $result = $this->GetData->HandelToken("bannerOrder/getMyOrder", $data,true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
          
            $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';
            $action .= '<a data-action="updateimage" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-image-fill"></i></a>';

            $action .= "</div>";
            $image = "";
            if($d->file_url!=null || $d->file_url!='')
            {
                $image="<img class='sm-img-table' src='".URL_PATH.$d->file_url."/".$d->file_name."'>";
            }

            $status = '<strong class="text-muted">Pending</strong>';
            if ($d->admin_confirm == "1")
              $status = '<strong class="text-success">Accepted</strong>';

              $payment="";
              if($d->payment=="1")
              {
                  $d->price= $d->price!=null?$d->price:"0";
                  $payment.='<span class="text-success">Paid ($'.number_format($d->price).')</span>';

              }else
              {
                if($d->creator_type=='user_business')
                {
                    
                    $type="Business";
                }else
                {
                    $type="User";
                }
                $payment.='<a  href="'.URL_Domain.'Payment/'.$type.'/'. $d->id . '" class="btn btn-sm btn-success radus m-1" >pay with Stripe</a>';
              }


            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "image" => $image,
                "link" => "<small>" .$d->link. "</small>",
                "calculate_type" => ($d->calculate_type) ,
                "type" => "<small>" .$d->type. "</small>",
                "numbers" =>"<small>" . $d->numbers. "</small>",
                "section" =>"<small>" . $d->section_name. "</small>",
                "category" => $d->category_name !=null?$d->category_name:"",
                "program" => $d->program!=null?$d->program:"",
                "payment" =>"<small>" . $payment. "</small>",
                "status" => "<small>" .$status. "</small>",
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
