<?php

class bannerOrderListAdmin
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

    $result = $this->Curls->curl("BannerOrder/get", $data);

    $data = $result->data->data;
    $total = $result->data->total;
    if ($total == null)
      $total = 0;
    $aadata = [];
    $permissions = $this->Curls->curl_with_token_admin("userAdmin/getMyPermissionAdmin", []);
    $module = $permissions->data->module;


    foreach ((array)$data as $d) {

      $action = '<div class="product-extra-link2 d-flex">';
      foreach ($module as $m) {
        
        if ($m->list == "ban1") {
          if ($m->action == "confirm")
            $action .= '<a data-action="confirm" data-id="' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-check-square"></i></a>';
          if ($m->action == "reject")
            $action .= '<a data-action="reject" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-x-lg"></i></a>';
          if ($m->action == "note")
            $action .= '<a data-action="note" data-user="' . $d->creator_id . '" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-envelope-fill"></i></a>';
          if ($m->action == "view")
            $action .= '<a data-action="view" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-eye-fill"></i></a>';
        }
      }

      $action .= "</div>";


      $status = '<strong class="text-muted">Pending</strong>';
      if ($d->admin_confirm == "1")
        $status = '<strong class="text-success">Accepted</strong>';
        $image = "";
        if($d->file_url!=null || $d->file_url!='')
        {
            $image="<img class=''  src='".URL_PATH.$d->file_url."/".$d->file_name."'>";
        }

      $d->expire = date_create($d->expire);
      $d->created_at = date_create($d->created_at);
      array_push($aadata, [
        "id" => "<span>" . $d->id . "</span>",
        "image" => $image,
        "link" => "<a href='".$d->link."'>".$d->link."</a>",
        "calculate_type" => ($d->calculate_type) ,
        "type" => $d->type,
        "numbers" => $d->numbers,
        "section" => $d->section_name??"",
        "category" => $d->category_name !=null?$d->category_name:"",
        "program" => $d->program!=null?$d->program:"",
        "price" => $d->price!=null?$d->price:"0",
        "created_at" => "<small>".date_format($d->created_at, 'g:ia \o\n l j F Y')."</small>",
        "payment" => $d->payment,
        "status" => $status,
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

