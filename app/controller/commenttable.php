<?php

class commentTable
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
    $result = $this->Curls->curl("Fetch/GetAllComment", $data);

    $data = $result->data->data;
    $total = $result->data->total;
    if ($total == null)
      $total = 0;
    $aaData = [];


    foreach ((array)$data as $d) {


      $action = '<div class="product-extra-link2 d-flex">';
      $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';

      $action .= "</div>";

      $title = "<span>" . $d->display_name . "</span>";
      if ($d->file_url !== '' && $d->file_url !== null) {
          $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
          $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->display_name . "</span>";
      }

 

      array_push($aaData, [
        "id" => "<span>" . $d->id . "</span>",
        "title" => $title,
        "type" => $d->creator_type,
        "text" => $d->text,
   
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
