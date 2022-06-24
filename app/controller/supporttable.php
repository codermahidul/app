<?php

class supportTable
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
        $result = $this->GetData->HandelToken("support/getMySupport", $data,true);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];


        foreach ((array)$data as $d) {
            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a href="'.URL_Domain.'MyTicket/'. $d->id. '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-eye"></i></a>';

            $action .= "</div>";
       
            

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
                "description" =>substr($d->description,"0","50")."...",
                "priority" => $d->priority_title,
                "topic" => $d->topic_title,
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

    public function get_all_admin()
    {


        $data = $_POST;
        $data['number'] = $_POST['length'];
        $result = $this->Curls->curl("support/getSupport", $data,true);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];


        foreach ((array)$data as $d) {
            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a href="'.URL_Domain.'TicketAdmin/'. $d->id. '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-eye"></i></a>';

            $action .= "</div>";
       
            

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
                "description" =>substr($d->description,"0","50")."...",
                "priority" => $d->priority_title,
                "topic" => $d->topic_title,
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
