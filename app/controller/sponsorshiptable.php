<?php
include_once dirname(__FILE__) . DIRECTORY_SEPARATOR . "./class/ShareTableClass.php";

class sponsorshipTable
{
    private $Curls,$GetData; 
    function __construct()
    {
        $this->Curls = new Curls;
        $this->GetData = new GetData;

    }

    public function get_all()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result = $this->Curls->curl("Sponsorship/get", $data);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];

        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a  href="' .URL_Domain.'EditAdSetting/'. $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
            $action .= '<a data-action="addGalleryImage" data-id="' . $d->id . '" class="btn btn-s btn-info  m-1" ><i class="bi bi-images"></i></a>';
            $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';

            $action .= "</div>";
 
            $title = "<span>" . $d->title . "</span>";
  
      
            if ($d->price == '') {
                $d->price = '0';
            }

            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "type" => $d->Sponsorship_type,
                "keywords" => $d->keywords,
                "price" => number_format($d->price),
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

    public function get_all_my_data()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result = $this->GetData->HandelToken("Sponsorship/getMyRequest", $data,true);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];

        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            if($d->sponsorship_type_id !==null)
            $action .= '<a  href="' .URL_Domain.'SponsorshipsFormEdit/'. $d->id.'/'.$d->sponsorship_type_id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
            
            $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';

            $action .= "</div>";
 
            if($d->category_name==null)
            {
                $d->category_name="";
            }
            $title = "<span>" . $d->company . "</span>";
  
            $payment='<small class="text-success">Yes</small>';
            if ($d->payment == '0') {
                $payment='<small class="text-danger">No</small>';
            }

            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "company" => $title,
                "category" =>"<small>" . $d->category_name. "</small>",
                "contact" =>"<small>" . $d->contact. "</small>",
                "tel" => "<small>" .$d->tel. "</small>",
                "fax" =>"<small>" . $d->fax. "</small>",
                "mobile" =>"<small>" . $d->mobile. "</small>",
                "email" =>"<small>" . $d->email. "</small>",
                "address" =>"<small>" . $d->address. "</small>",
                "payment" => $payment,
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

    
    public function get_all_admin_data_request()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result = $this->GetData->HandelToken("Sponsorship/getRequest", $data,true);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];

        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            if($d->sponsorship_type_id !==null)
            

            $action .= "</div>";
 
            if($d->category_name==null)
            {
                $d->category_name="";
            }
            $title = "<span>" . $d->company . "</span>";
  
            $payment='<small class="text-success">Yes</small>';
            if ($d->payment == '0') {
                $payment='<small class="text-danger">No</small>';
            }
            $option="";
            if($d->sponsorship_request_options!=='' && $d->sponsorship_request_options!==null)
            {
                $opt=explode(",",$d->sponsorship_request_options);
                foreach($opt as $o)
                {
                    $do=explode("::",$o);
                    $option.="<div>".$do[3]."</div>";
                }
            }

            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "company" => $title,
                "category" =>"<small>" . $d->category_name. "</small>",
                "contact" =>"<small>" . $d->contact. "</small>",
                "tel" => "<small>" .$d->tel. "</small>",
                "fax" =>"<small>" . $d->fax. "</small>",
                "mobile" =>"<small>" . $d->mobile. "</small>",
                "email" =>"<small>" . $d->email. "</small>",
                "address" =>"<small>" . $d->address. "</small>",
                "payment" => $payment,
                "option"=>$option,
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
