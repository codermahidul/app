<?php

class helpTable {
    private $Curls;
     function __construct()
    {
        $this->Curls=new Curls;
    }

    public function get_all()
    {
     
        
        $result=$this->Curls->curl("help/get",$_POST);
        
        $data=$result->data->data;
        $total=$result->data->total;
        if($total==null)
        $total=0;
        $aaData = [];
 
        
        foreach((array)$data as $d) {
     

          $action = '<div class="product-extra-link2 d-flex d-flex">';
          $action.= '<a  href="'.URL_Domain . 'EditHelp/' .$d->id.'" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
          $action .= '<a data-action="updateimage" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-image-fill"></i></a>';

          $action.= '<a data-action="remove" data-id="'.$d->id.'" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';
    
          $action .= "</div>";
          

          $image = "";
          $title = "<span>" . $d->title . "</span>";
          if ($d->file_url !== '' && $d->file_url !== null) {
              $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
              $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->title . "</span>";
          }
      

          array_push($aaData,[
            "id"=>"<span>". $d->id."</span>",
            "title"=>$title,
            "descriptions"=>$d->descriptions,
            "created_at"=>$d->created_at,
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
