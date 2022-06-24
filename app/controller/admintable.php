<?php

class admintable {
    private $Curls;
     function __construct()
    {
        $this->Curls=new Curls;
    }

    public function get_all()
    {
     
        $data=$_POST;
        $data['number']=$_POST['length'];
        $result=$this->Curls->curl_with_token_admin("UserAdmin/get",$data);
        
        $data=$result->data->data;
        $total=$result->data->total;
        if($total==null)
        $total=0;
        $aadata = [];
 
        
        foreach((array)$data as $d) {
     

          $action = '<div class="product-extra-link2 d-flex">';
          $action.= '<a data-action="update" data-id="'.$d->id.'" class="btn btn-s btn-primary m-1" ><i class="bi bi-pencil-fill"></i></a>';
          $action.= '<a data-action="permission" data-id="'.$d->id.'" class="btn btn-s btn-green m-1" ><i class="bi bi-unlock"></i></a>';
        //  $action.= '<a data-action="remove" data-id="'.$d->id.'" class="btn btn-s btn-danger m-1" ><i class="bi bi-trash-fill"></i></a>';
    
          $action .= "</div>";
          $title="<span>".$d->title."</span>";

          if($d->trash=="1")
          {
            $disabled="<span class='text-danger'>Yes</span>";
          }else
          {
            $disabled="<span class=''>No</span>";
          }

          array_push($aadata,[
            "id"=>"<span>". $d->id."</span>",
            "name"=>$d->name,
            "username"=>$d->username,
            "password"=>$d->password,
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
          "data"=> $aadata
        ];
      echo json_encode($data);
    }
}
