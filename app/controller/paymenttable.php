<?php

class paymentTable
{
    private $Curls, $GetData, $type_online;
    function __construct()
    {
        $this->Curls = new Curls;
        $this->GetData = new GetData;
        $this->type_online = $this->GetData->GetTypeOnline();
    }

    public function get_all()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

     
        $result =$this->GetData->HandelToken("Payment/getMyPayment", $data,true); 
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];

        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex d-flex">';
          
            $action .= "</div>";

            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "amount" => "$".number_format($d->amount),
                "transActionId" => "<small>" .$d->transActionId. "</small>",
                "currency" => "<small>" .$d->currency. "</small>",
                "status" =>"<small>" . $d->status. "</small>",
                "table_type" =>"<small>" . $d->table_type. "</small>",
                "created_at" => $d->created_at,
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
