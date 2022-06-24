<?php

class businessUserManagerTableAdmin
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
        $result = $this->Curls->curl("userBusiness/get", $data);

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

                    if ($m->list == "userb1") {
                        if ($m->action == "top")
                        $action.= '<a data-action="top" data-id="'.$d->id.'" class="btn btn-s btn-prim  m-1" ><i class="bi bi-list-ol"></i></a>';
                        if ($m->action == "home")
                        $action .= '<a data-action="home" data-id="' . $d->id . '" class="btn btn-s btn-green  m-1" ><i class="bi bi-caret-right-square-fill"></i></a>';
                     
                         }


                   }
                  


                if($d->type=='business')
                 $action .= '<a title="Update  Business Profile" href="' .URL_Domain.'EditProfile/'. $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-pencil"></i></a>';
                 
                 $action .= '<a data-action="update" data-id="' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil"></i></a>';
                 $action .= '<a data-action="updateImage" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-image-fill"></i></a>';
                 
                 if($d->block=='0')
                 $action .= '<a title="block" data-action="block" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="fas fa-user-lock"></i></a>';
                 
                 if($d->block=='1')
                 $action .= '<a title="unblock" data-action="unblock" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="fas fa-user-lock"></i></a>';

                $action .= "</div>";
                $image = "";
                $name = "<span>" . $d->name . " " . "</span>";
                if ($d->file_url !== '' && $d->file_url !== null) {
                    $image = URL_PATH . $d->file_url . "/small/" . $d->file_name;
                    $name = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->name . " " . "</span>";
                }
                if ($d->trash == "1") {
                    $disabled = "<span class='text-danger'>Yes</span>";
                } else {
                    $disabled = "<span class=''>No</span>";
                }
  
    
     
                $counter='<div class="product-extra-link2 d-flex">';
                $counter.= '<a style="width:72px;" href="UserProductList/'.$d->id.'" class="btn btn-prim btn-radus btn-sm m-1">Product <span class="badge bg-danger">'.$d->products.'</span></a>';
                $counter.= '<a style="width:72px;" href="UserPrizeList/'.$d->id.'" class="btn btn-prim btn-radus btn-sm m-1">Prize <span class="badge bg-danger">'.$d->prizes.'</span></a>';
                $counter.= '<a style="width:72px;" href="UserCouponList/'.$d->id.'" class="btn btn-prim btn-radus btn-sm m-1">Coupon <span class="badge bg-danger">'.$d->coupons.'</span></a>';
                $counter.= '<a style="width:72px;" href="UserDealsList/'.$d->id.'" class="btn btn-prim btn-radus btn-sm m-1">Deals <span class="badge bg-danger">'.$d->deals.'</span></a>';
                $counter.= '<a style="width:72px;" href="UserJobList/'.$d->id.'" class="btn btn-prim btn-radus btn-sm m-1">Jobs <span class="badge bg-danger">'.$d->jobs.'</span></a>';
                $counter.='</div>';
                if($d->top_show_id!==null)
                {
                  $top_show="<span class='text-success'>Yes</span>";
                }else
                {
                  $top_show="<span class=''>No</span>";
                }

                if($d->verify=='1')
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
                    "verify"=>$verify,
                    "created_at" => $d->created_at,
                    "category_name" => $d->category_name ??"",
                    "top_show"=>$top_show,
                    "type"=>'<strong>'.$d->type.'</strong>',
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

    public function get_all_verify()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $result = $this->Curls->curl("userBusiness/getVerifyFile", $data);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];

     

        if($total>0)
        {
            foreach ((array)$data as $d) {

                $action = '<div class="product-extra-link2 d-flex">';
             
          
                $action .= '<a data-action="confirm" data-id="' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-check-square"></i></a>';
                $action .= '<a data-action="reject" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-x-lg"></i></a>';
                $action .= '<a data-action="note" data-user="' . $d->user_business_id . '" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-envelope-fill"></i></a>';


    
                $action .= "</div>";
                $image = "";
                $name = "<span>" . $d->name . " " . "</span>";
                if ($d->file_url !== '' && $d->file_url !== null) {
                    $image = URL_PATH . $d->file_url . "/small/" . $d->file_name;
                    $name = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->name . " " . "</span>";
                }

       
                $file="";
                $files=explode(",",$d->files);
                foreach($files as $f){
                    $dataF=explode("::",$f);

                    $file.='<a href=".URL_PATH.$dataF[2]'.'/'.$dataF[1].'">'.$dataF['0'].': '.$dataF[1].' </a><br>';
                }

                array_push($aaData, [
                    "id" => "<span>" . $d->id . "</span>",
                    "name" => $name,
                    "files" => $file,
                  
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
                "data" => $aaData
            ];
        echo json_encode($data);
    }
}
