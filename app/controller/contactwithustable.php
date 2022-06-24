<?php

class ContactWithUsTable
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
        $result = $this->Curls->curl("Fetch/getContactList", $data);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];


        foreach ((array)$data as $d) {
            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a data-action="accept" data-id="' . $d->id.",".$d->items_id.",".$d->items_type . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-check"></i></a>';

            $action .= "</div>";
    
            

      

            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "company" => $d->company,
                "name" => $d->name,
                "email" => $d->email,
                "description" => $d->description,
                "phone" => $d->phone,
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
