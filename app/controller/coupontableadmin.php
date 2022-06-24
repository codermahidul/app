<?php

class couponTableAdmin
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

    $result = $this->Curls->curl("coupon/get", $data);

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
        
        if ($m->list == "fo1") {
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
      $status = '<strong class="text-muted">Pending</strong>';
      if ($d->admin_confirm == "1")
        $status = '<strong class="text-success">Accepted</strong>';

    //   if ($d->top_show_id !== null) {
    //     $top_show = "<span class='text-success'>Yes</span>";
    //   } else {
    //     $top_show = "<span class=''>No</span>";
    //   }

      if ($d->home_show_id !== null) {
        $home_show = "<span class='text-success'>Yes</span>";
      } else {
        $home_show = "<span class=''>No</span>";
      }
      $d->expire = date_create($d->expire);
      $d->created_at = date_create($d->created_at);
      array_push($aadata, [
        "id" => "<span>" . $d->id . "</span>",
        "title" => $title,
        "user_name" => $d->name !=null?$d->name:"",
        "amount" => "<small>".($d->amount)."</small>" ,
        "type" => "<small>".$d->type_name."</small>",
        "link" => $d->link !=null?"<small>".$d->link."</small>" :"",
        "product" => $d->product_title !=null?$d->product_title:"",
        "expire" => "<small>".date_format($d->expire, '  l j F Y')."</small>",
        "category_name" => $d->category_name,
        "Disabled" => $disabled,
        "description" => "<small>".$d->description."</small>",
        "created_at" => "<small>".date_format($d->created_at, 'g:ia \o\n l j F Y')."</small>",
        // "top_show" => $top_show,
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
        "data" => $aadata
      ];
    echo json_encode($data);
  }

  public function get_all_deals()
  {


    $data = $_POST;
    $data['number'] = $_POST['length'];

    $result = $this->Curls->curl("deals/get", $data);

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
        
        if ($m->list == "de1") {
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
          if ($m->action == "percent")
            $action .= '<a data-action="percent" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-coin"></i></a>';
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
      $status = '<strong class="text-muted">Pending</strong>';
      if ($d->admin_confirm == "1")
        $status = '<strong class="text-success">Accepted</strong>';

    //   if ($d->top_show_id !== null) {
    //     $top_show = "<span class='text-success'>Yes</span>";
    //   } else {
    //     $top_show = "<span class=''>No</span>";
    //   }

      if ($d->home_show_id !== null) {
        $home_show = "<span class='text-success'>Yes</span>";
      } else {
        $home_show = "<span class=''>No</span>";
      }
      $d->expire = date_create($d->expire);
      $d->created_at = date_create($d->created_at);
      array_push($aadata, [
        "id" => "<span>" . $d->id . "</span>",
        "title" => $title,
        "user_name" => $d->name !=null?$d->name:"",
        "amount" => "<small>".($d->amount)."</small>" ,
        "type" => "<small>".$d->type_name."</small>",
        "link" => $d->link !=null?"<small>".$d->link."</small>" :"",
        "product" => $d->product_title !=null?$d->product_title:"",
        "expire" => "<small>".date_format($d->expire, '  l j F Y')."</small>",
        "category_name" => $d->category_name,
        "Disabled" => $disabled,
        "description" => "<small>".$d->description."</small>",
        "created_at" => "<small>".date_format($d->created_at, 'g:ia \o\n l j F Y')."</small>",
        // "top_show" => $top_show,
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
        "data" => $aadata
      ];
    echo json_encode($data);
  }

  
  public function get_all_shop()
  {


    $data = $_POST;
    $data['number'] = $_POST['length'];
    $result = $this->Curls->curl("deals/getShop", $data);

    $data = $result->data->data;
    $total = $result->data->total;
    if ($total == null)
      $total = 0;
    $aadata = [];


    foreach ((array)$data as $d) {

      $action = '<div class="product-extra-link2 d-flex">';
      $action .= '<a data-action="clearing" title="clearing" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-coin"></i></a>';
        
      $action .= "</div>";
     
      $image = "";
      $title = "<span>" . $d->title . "</span>";
      if ($d->file_url !== '' && $d->file_url !== null) {
          $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
          $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->title . "</span>";
      }
 
      $amount=0;
      $amount=floatval($d->price)-((floatval($d->price)*floatval($d->percent))/100);

      $attachments="";
      $da=explode(",",$d->attachments);
      $i=1;
      foreach($da as $s)
      {
          $file=explode("::",$s);
          $attachments.="<a href='".URL_PATH.$file[0]."/".$file[1]."'>file".$i."</a><br>";
          $i++;
      }


      array_push($aadata, [
        "id" => "<span>" . $d->id . "</span>",
        "title" => $title,
        "name" => $d->display_name !=null?$d->display_name:"",
        "amount" => "<small>".($amount)."</small>" ,
        "percent" => $d->percent !=null?"<small>".$d->percent."</small>" :"",
        "price" => $d->price !=null?number_format($d->price):"", 
        "action" => $action,
        "clearing_date"=>$d->clearing_date,
        "files"=>$attachments
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

  
    
  public function get_all_my_shop_clear()
  {


    $data = $_POST;
    $data['number'] = $_POST['length'];
    $result = $this->GetData->HandelToken("deals/getMyShopClear", $data,true);


    $data = $result->data->data;
    $total = $result->data->total;
    if ($total == null)
      $total = 0;
    $aadata = [];


    foreach ((array)$data as $d) {

      $action = '<div class="product-extra-link2 d-flex">';
      $action .= '<a data-action="clearing" title="clearing" data-id="' . $d->id . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-coin"></i></a>';
        
      $action .= "</div>";
     
      $image = "";
      $title = "<span>" . $d->title . "</span>";
      if ($d->file_url !== '' && $d->file_url !== null) {
          $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
          $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->title . "</span>";
      }
 
      $amount=0;
      $amount=floatval($d->price)-((floatval($d->price)*floatval($d->percent))/100);

      $attachments="";
      $da=explode(",",$d->attachments);
      $i=1;
      foreach($da as $s)
      {
          $file=explode("::",$s);
          $attachments.="<a href='".URL_PATH.$file[0]."/".$file[1]."'>file".$i."</a><br>";
          $i++;
      }


      array_push($aadata, [
        "id" => "<span>" . $d->id . "</span>",
        "title" => $title,
        "name" => $d->display_name !=null?$d->display_name:"",
        "amount" => "<small>".($amount)."</small>" ,
        "percent" => $d->percent !=null?"<small>".$d->percent."</small>" :"",
        "price" => $d->price !=null?number_format($d->price):"", 
        "action" => $action,
        "clearing_date"=>$d->clearing_date,
        "files"=>$attachments
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

