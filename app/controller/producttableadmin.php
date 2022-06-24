<?php

class productTableAdmin
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

    $result = $this->Curls->curl("product/get", $data);

    $data = $result->data->data;
    $total = $result->data->total;
    if ($total == null)
      $total = 0;
    $aaData = [];
    $permissions = $this->Curls->curl_with_token_admin("userAdmin/getMyPermissionAdmin", []);
    $module = $permissions->data->module;


    foreach ((array)$data as $d) {

      $action = '<div class="product-extra-link2 d-flex">';
      foreach ($module as $m) {
        
        if ($m->list == "pr1") {
          if ($m->action == "confirm")
            $action .= '<a data-action="confirm" data-id="' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-check-square"></i></a>';
          if ($m->action == "reject")
            $action .= '<a data-action="reject" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-x-lg"></i></a>';
          if ($m->action == "note")
            $action .= '<a data-action="note" data-user="' . $d->user_business_id . '" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-envelope-fill"></i></a>';
          if ($m->action == "top")
            $action .= '<a data-action="top" data-id="' . $d->id . '" class="btn btn-s btn-prim  m-1" ><i class="bi bi-list-ol"></i></a>';
          if ($m->action == "home")
            $action .= '<a data-action="home" data-id="' . $d->id . '" class="btn btn-s btn-green  m-1" ><i class="bi bi-caret-right-square-fill"></i></a>';
          if ($m->action == "view")
            $action .= '<a data-action="view" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-eye-fill"></i></a>';
        }
      }

      $action .= "</div>";
      $image = "";
      $title = "<span>" . $d->title . "</span>";
      if ($d->file_url !== '' && $d->file_url !== null) {
        $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
        $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->title . "</span>";
      }
      if ($d->trash == "1") {
        $disabled = "<span class='text-danger'>Yes</span>";
      } else {
        $disabled = "<span class=''>No</span>";
      }
      $status = '<stron class="text-muted">Pending</strong>';
      if ($d->admin_confirm == "1")
        $status = '<stron class="text-success">Accepted</strong>';

      if ($d->top_show_id !== null) {
        $top_show = "<span class='text-success'>Yes</span>";
      } else {
        $top_show = "<span class=''>No</span>";
      }

      if ($d->home_show_id !== null) {
        $home_show = "<span class='text-success'>Yes</span>";
      } else {
        $home_show = "<span class=''>No</span>";
      }
      array_push($aaData, [
        "id" => "<span>" . $d->id . "</span>",
        "title" => $title,
        "user_name" => $d->name !=null?$d->name:"" ,
        "category_name" => $d->category_name,
        "Disabled" => $disabled,
        "description" => $d->description,
        "created_at" => $d->created_at,
        "top_show" => $top_show,
        "home_show" => $home_show,
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
        "data" => $aaData
      ];
    echo json_encode($data);
  }


}

