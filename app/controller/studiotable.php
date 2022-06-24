<?php

class studioTable
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
    $result = $this->Curls->curl("studio/get", $data);

    $data = $result->data->data;
    $total = $result->data->total;
    if ($total == null)
      $total = 0;
    $aaData = [];


    foreach ((array)$data as $d) {


      $action = '<div class="product-extra-link2 d-flex">';
      $action .= '<a data-action="update" data-id="' . $d->id . '" class="btn btn-s btn-primary m-1" ><i class="bi bi-pencil-fill"></i></a>';
      $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger m-1" ><i class="bi bi-trash-fill"></i></a>';

      $action .= "</div>";
      $title = "<span>" . $d->title . "</span>";



      array_push($aaData, [
        "id" => "<span>" . $d->id . "</span>",
        "title" => $title,
        "link" => $d->link??"",
        "description" => $d->description,
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
