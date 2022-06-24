<?php

class reporttable
{
    private $Curls;
    function __construct()
    {
        $this->Curls = new Curls;
    }

    public function get_all()
    {

        $data = $_POST;




        if (isset($_POST['length']))
            $data['length'] = $_POST['length'];

        $result = $this->Curls->curl_with_token_admin("report/get", $data);


        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];


        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';

            $action .= "</div>";

            $item_title = "";
            switch ($d->table_type) {
                case "user": {
                        $item_title = $d->display_name;
                        break;
                    }

                case "event": {
                        $item_title = $d->event_title;
                        break;
                    }

                case "project": {
                        $item_title = $d->project_title;
                        break;
                    }


                case "forum": {
                        $item_title = $d->forum_title;
                        break;
                    }

                case "business": {
                        $item_title = $d->business_title;
                        break;
                    }

                case "formula_story": {
                        $item_title = $d->formula_story_title;
                        break;
                    }

            }



            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "table_type" => $d->table_type,
                "item_title" => $item_title,
                "item_id"=>$d->item_id,
                "numbers" => $d->numbers,
                "proofs"=> str_replace(",","<br>",$d->proofs),
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
