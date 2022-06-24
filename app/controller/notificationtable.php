<?php

class notificationTable
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

        // if($data['type_name']=='user')
        // {
        //     $result = $this->Curls->curl_with_token("note/getMyNote", $data);
        // }else
        // {
        //     $result = $this->Curls->curl_with_token_business("note/getMyNote", $data);
        // }
        $result = $this->GetData->HandelToken("note/getMyNote", $data,true);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];


        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a data-action="view" data-id="'.$d->id.'" data-txt="' . $d->text . '" class="btn btn-sm  m-1" ><i class="bi bi-eye-fill"></i></a>';
         //   $action .= '<a  href="' . URL_Domain . 'ApplyProjectList/' . $d->id . '" class="btn btn-s btn-green b-radus m-1" ><i class="bi bi-people-fill"></i></a>';

            $action .= "</div>";

            $type = "";
            switch ($d->type) {
                case "confirmAdmin": {
                        $type = '<span class="text-success">Admin confirmation</span>';
                        break;
                    }

                case "forumComment": {
                        $type = '<span class="text-dark">Comment on your forum</span>';
                        break;
                    }

                case "noteFromAdmin": {
                        $type = '<span class="text-success">Message from admin </span>';
                        break;
                    }

                    case "projectRequest": {
                        $type = '<span class="text-success">A new request has been submitted for your project </span>';
                        break;
                    }
                    
            }
            $text=substr($d->text, 0, 100);
            if($d->link!=="" || $d->link!==null)
            {
                $text='<a class="text-dark" href="'.$d->link.'">'.substr($d->text, 0, 100).'</a>';
            }
            
            array_push($aadata, [
                "id" => "<span>" . $d->id . "</span>",
                "text" =>$d->is_read=='0'?"<strong>".$text. " ...</strong>":$text,
                "type" => $type,
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
