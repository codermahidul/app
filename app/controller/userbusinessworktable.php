<?php

class userBusinessWorkTable {
    private $Curls;
     function __construct()
    {
        $this->Curls=new Curls;
    }

    public function get_all()
    {
     
        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result=$this->Curls->curl_with_token_professional("BusinessWorked/getMyWork",$data);
        
        $data=$result->data->data;
        $total=$result->data->total;
        if($total==null)
        $total=0;
        $aaData = [];
 
        
        foreach((array)$data as $d) {
     

          $action = '<div class="product-extra-link2 d-flex">';

          $action .= "</div>";

          $image = "";
          $title = "<span>" . $d->display_name . " " . "</span>";
          if ($d->file_url !== '' && $d->file_url !== null) {
              $image = URL_PATH . $d->file_url . "/small/" . $d->file_name;
              $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->display_name . " " . "</span>";
          }
      
      
          $status="<span class='badge bg-secondary' >pending</span>";
          if($d->status=='1')
          $status="<span class='badge bg-success'>Accept</span>";

          array_push($aaData,[
            "id"=>"<span>". $d->id."</span>",
            "title"=>$title,
            "now"=>$d->now,
            "date_start"=>$d->date_start??"",
            "date_end"=>$d->date_end??"",
            "status"=>$status,
            "action"=>$action
       
           ]);
      
        }
      
        $data =
        [
          "recordsTotal"=> $total,
          "recordsFiltered"=> $total,
          "draw"=> $_POST['draw'],
          // sEcho=>0,
          // sColumns=>"",
          "data"=> $aaData
        ];
      echo json_encode($data);
    }

    public function get_all_request()
    {
     
        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;
        $result=$this->Curls->curl_with_token_business("BusinessWorked/getMyWorkRequest",$data);
        
        $data=$result->data->data;
        $total=$result->data->total;
        if($total==null)
        $total=0;
        $aaData = [];
 
        foreach((array)$data as $d) {
    
          $action = '<div class="product-extra-link2 d-flex">';
          $action .= '<a data-action="update" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-pencil"></i></a>';
          $action .= '<a href="' .URL_Domain. $d->display_name_slug2 . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-eye-fill"></i></a>';

          $action .= "</div>";

          $image = "";
          $title = "<span>" . $d->display_name2 . " " . "</span>";
          if ($d->file_url !== '' && $d->file_url !== null) {
              $image = URL_PATH . $d->file_url2 . "/small/" . $d->file_name2;
              $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->display_name2 . " " . "</span>";
          }
      
      
          $status="<span class='badge bg-secondary' >pending</span>";
          if($d->status=='1')
          $status="<span class='badge bg-success'>Accept</span>";

          array_push($aaData,[
            "id"=>"<span>". $d->id."</span>",
            "title"=>$title,
            "now"=>$d->now,
            "date_start"=>$d->date_start??"",
            "date_end"=>$d->date_end??"",
            "status"=>$status,
            "action"=>$action
       
           ]);
      
        }
      
        $data =
        [
          "recordsTotal"=> $total,
          "recordsFiltered"=> $total,
          "draw"=> $_POST['draw'],
          // sEcho=>0,
          // sColumns=>"",
          "data"=> $aaData
        ];
      echo json_encode($data);
    }

    
    public function get_all_success_request()
    {
     
        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;
        $result=$this->Curls->curl_with_token_business("BusinessWorked/getMyWorkRequest",$data);
        
        $data=$result->data->data;
        $total=$result->data->total;
        if($total==null)
        $total=0;
        $aaData = [];
 
        foreach((array)$data as $d) {
    
          $action = '<div class="product-extra-link2 d-flex">';
          $action.= '<a data-action="permission" data-id="'.$d->user_business_id.'" class="btn btn-s btn-green  m-1" ><i class="bi bi-unlock"></i></a>';

          $action .= "</div>";

          $image = "";
          $title = "<span>" . $d->display_name2 . " " . "</span>";
          if ($d->file_url !== '' && $d->file_url !== null) {
              $image = URL_PATH . $d->file_url2 . "/small/" . $d->file_name2;
              $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->display_name2 . " " . "</span>";
          }
      
      
          $status="<span class='badge bg-secondary' >pending</span>";
          if($d->status=='1')
          $status="<span class='badge bg-success'>Accept</span>";

          array_push($aaData,[
            "id"=>"<span>". $d->id."</span>",
            "title"=>$title,
            "now"=>$d->now,
            "date_start"=>$d->date_start??"",
            "date_end"=>$d->date_end??"",
            "status"=>$status,
            "action"=>$action
       
           ]);
      
        }
      
        $data =
        [
          "recordsTotal"=> $total,
          "recordsFiltered"=> $total,
          "draw"=> $_POST['draw'],
          // sEcho=>0,
          // sColumns=>"",
          "data"=> $aaData
        ];
      echo json_encode($data);
    }
}
