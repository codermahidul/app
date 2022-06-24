<?php

class userManagerTableAdmin
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
        $result = $this->Curls->curl("user/get", $data);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aadata = [];

        $permissions = $this->Curls->curl_with_token_admin("userAdmin/getMyPermissionAdmin", []);
        $module = $permissions->data->module;

        if($total>0)
        {
            foreach ((array)$data as $d) {

                $action = '<div class="product-extra-link2 d-flex">';
                // $action .= '<a data-action="confirm" data-id="' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-check-square"></i></a>';
                // $action .= '<a data-action="reject" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-x-lg"></i></a>';
                // $action .= '<a data-action="note" data-user="' . $d->id . '" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-envelope-fill"></i></a>';
              
                foreach ($module as $m) {

                    if ($m->list == "user1") {
                        if ($m->action == "top")
                        $action.= '<a data-action="top" data-id="'.$d->id.'" class="btn btn-s btn-prim  m-1" ><i class="bi bi-list-ol"></i></a>';
                        if ($m->action == "home")
                        $action .= '<a data-action="home" data-id="' . $d->id . '" class="btn btn-s btn-green  m-1" ><i class="bi bi-caret-right-square-fill"></i></a>';
                     
                         }

                   }
                  
                   $action .= '<a data-action="update" data-id="' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil"></i></a>';
                  // $action .= '<a data-action="updateImage" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-image-fill"></i></a>';
  

                // $action .= '<a data-action="view" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-eye-fill"></i></a>';
    
                $action .= "</div>";
                $image = "";
                $name = "<span>" . $d->fname . " " . $d->lname . "</span>";
                if ($d->image !== '' && $d->image !== null) {
                    $image = UPLOAD_PATH_FILE . "user/" . $d->id . "/profile/image/small/" . $d->image;
                    $name = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->fname . " " . $d->lname . "</span>";
                }
                if ($d->trash == "1") {
                    $disabled = "<span class='text-danger'>Yes</span>";
                } else {
                    $disabled = "<span class=''>No</span>";
                }
                $status = '<stron class="text-muted">Pending</strong>';
                if ($d->admin_confirm == "1")
                    $status = '<stron class="text-success">Accepted</strong>';
    
     
                $counter='<div class="product-extra-link2 d-flex">';
                $counter.= '<span  class="btn btn-prim btn-radus btn-sm m-1">Comment <span class="badge bg-danger">'.number_format($d->comment_bought+$d->comment_not_bought).'</span></span>';
                $counter.= '<span  class="btn btn-prim btn-radus btn-sm m-1">Product Rate <span class="badge bg-danger">'.number_format($d->product_rate_bought+$d->rate_not_bought).'</span></span>';
                $counter.='</div>';
                if($d->top_show_id!==null)
                {
                  $top_show="<span class='text-success'>Yes</span>";
                }else
                {
                  $top_show="<span class=''>No</span>";
                }
      
                if($d->verify =='1')
                {
                  $verify="<span class='text-success'>Yes</span>";
                }else
                {
                  $verify="<span class=''>No</span>";
                }

                if ($d->home_show_id !== null) {
                    $home_show = "<span class='text-success'>Yes</span>";
                  } else {
                    $home_show = "<span class=''>No</span>";
                  }
    
                array_push($aadata, [
                    "id" => "<span>" . $d->id . "</span>",
                    "user_name" => $name,
                    "email" => $d->email,
                    "Disabled" => $disabled,
                    "description" => $d->description,
                    "activity"=>$counter,
                    "created_at" => $d->created_at,
                    "status" => $status,
                    "verify"=>$verify,
                    "top_show"=>$top_show,
                    "home_show" => $home_show,
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
                "data" => $aadata
            ];
        echo json_encode($data);
    }


}
