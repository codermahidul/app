<?php

class teamBookingTable
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
        $result = $this->Curls->curl_with_token_team("booking/getMyBook", $data);
     
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];

     

        if($total>0)
        {
            foreach ((array)$data as $d) {

                $action = '<div class="product-extra-link2 d-flex">';
                $action .= '<a href="' .URL_Domain.'EditBooking/'. $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
                $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';

    
                $action .= "</div>";
          
             
          
                $studio ="<div>".$d->studio_title??""."</div>";
                $studio .="<div>".$d->studio_description??""."</div>";
 
                $date="<div>".$d->date_from.' - '.$d->time_from."</div>";
                $date.="<div>".$d->date_to.' - '.$d->time_to."</div>";
    
     
        
             
               
    
    
                array_push($aaData, [
                    "id" => "<span>" . $d->id . "</span>",
                    "title" => $d->title,
                    "date" => $date,
                    "studio" => $studio,
                    "action" => $action
    
                ]);
            }
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
