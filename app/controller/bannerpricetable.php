<?php

class bannerPriceTable {
    private $Curls;
     function __construct()
    {
        $this->Curls=new Curls;
    }
    public function get_all()
    {
  
  
      $data = $_POST;
      $data['number'] = $_POST['length'];
      $result = $this->Curls->curl("section/getBannerPrice", $data);
  
      $data = $result->data->data;
      $total = $result->data->total;
      if ($total == null)
        $total = 0;
      $aadata = [];
  
  
      foreach ((array)$data as $d) {
  
  
        $action = '<div class="product-extra-link2 d-flex d-flex">';
       // $action .= '<a data-action="update" data-id="' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
        $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';
  
        $action .= "</div>";
  

  
        array_push($aadata, [
          "id" => "<span>" . $d->id . "</span>",
          "section" => $d->section_name,
          "type" => $d->type,
          
          "category" => $d->category_name !=null?$d->category_name:"",
          "proof" => $d->proof_name !=null?$d->proof_name:"",
          "price" => $d->price,
          "calculate_type" => $d->calculate_type,
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
?>