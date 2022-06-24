<?php
include_once dirname(__FILE__) . DIRECTORY_SEPARATOR . "./class/ShareTableClass.php";

class jobTable
{
    private $Curls, $bussinessNumber, $GetData;
    function __construct()
    {
        $this->Curls = new Curls;
        $this->GetData = new GetData;
        $this->ShareTableClass = new ShareTableClass;
        $this->bussinessNumber = $_COOKIE['bussinessNumber'];
    }

    public function get_all()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result = $this->GetData->HandelToken("Job/getMyJob", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];

        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a href="' . URL_Domain . 'EditJob/' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
            $action .= '<a data-action="updateImage" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-image-fill"></i></a>';
            $action .= '<a data-action="AddToTopList" data-id="' . $d->id . '" class="btn btn-s btn-prim  m-1" ><i class="bi bi-list-ol"></i></a>';

            $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';

            $action .= '<a href="' . URL_Domain . 'JobResume/' . $d->id . '" class="btn btn-s btn-warning  m-1 position-relative" ><i class="bi bi-folder"></i><small class="bag-red" style="position: absolute;top: -16px;">' . number_format($d->total_resume) . '</small> </a>';

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

            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "Disabled" => $disabled,
                "description" => $d->description,
                "level" => $d->level ?? "",
                "type" => $d->type ?? "",
                "gender" => $d->gender ?? "",
                "salary" => $d->salary ?? "",
                "skill" => $d->skill ?? "",
                "benefit" => $d->benefit ?? "",
                "exprience" => $d->exprience ?? "",
                "category" => $d->category_name,
                "country_name" => $d->country_name,
                "total_resume" => number_format($d->total_resume),
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

    public function get_all_sub()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;
        $data['userIdSearch'] = $this->bussinessNumber;

        $result = $this->GetData->HandelToken("Job/get", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];
        $permissions = $this->Curls->curl_with_token_professional("UserBusiness/getMyPermission", ["idSearch" => $this->bussinessNumber]);
        $module = $permissions->data->module;

        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';



            foreach ($module as $m) {
                if ($m->list == "j1") {

                    if ($m->action == "resume")
                        $action .= '<a href="' . URL_Domain . 'JobResumeP/' . $d->id . '" class="btn btn-s btn-warning  m-1 position-relative" ><i class="bi bi-folder"></i><small class="bag-red" style="position: absolute;top: -16px;">' . number_format($d->total_resume) . '</small> </a>';
                    if ($m->action == "edit")
                        $action .= '<a href="' . URL_Domain . 'EditJobP/' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
                    if ($m->action == "image")
                        $action .= '<a data-action="updateImage" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-image-fill"></i></a>';
                    if ($m->action == "top")
                        $action .= '<a data-action="AddToTopList" data-id="' . $d->id . '" class="btn btn-s btn-prim  m-1" ><i class="bi bi-list-ol"></i></a>';
                    if ($m->action == "remove")
                        $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';
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

            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "Disabled" => $disabled,
                "description" => $d->description,
                "level" => $d->level ?? "",
                "type" => $d->type ?? "",
                "gender" => $d->gender ?? "",
                "salary" => $d->salary ?? "",
                "skill" => $d->skill ?? "",
                "benefit" => $d->benefit ?? "",
                "exprience" => $d->exprience ?? "",
                "category" => $d->category_name,
                "country_name" => $d->country_name,
                "total_resume" => number_format($d->total_resume),
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

    public function get_all_confirm()
    {


        $data = $_POST;
        $data['number'] = $_POST['length'];

        $result = $this->Curls->curl("job/get", $data);

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

                if ($m->list == "j1") {
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

            $d->created_at = date_create($d->created_at);
            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "user_name" => $d->name != null ? $d->name : "",
                "level" => $d->level ?? "",
                "type" => $d->type ?? "",
                "gender" => $d->gender ?? "",
                "salary" => $d->salary ?? "",
                "skill" => $d->skill ?? "",
                "benefit" => $d->benefit ?? "",
                "exprience" => $d->exprience ?? "",
                "category_name" => $d->category_name,
                "Disabled" => $disabled,
                "description" => "<small>" . $d->description . "</small>",
                "created_at" => "<small>" . date_format($d->created_at, 'g:ia \o\n l j F Y') . "</small>",
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
                "data" => $aaData
            ];
        echo json_encode($data);
    }


    public function get_all_admin()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result = $this->GetData->HandelToken("Job/getMyJobAdmin", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];

        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a href="' . URL_Domain . 'EditJobAdmin/' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
            $action .= '<a data-action="updateImage" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-image-fill"></i></a>';
            $action .= '<a data-action="AddToTopList" data-id="' . $d->id . '" class="btn btn-s btn-prim  m-1" ><i class="bi bi-list-ol"></i></a>';

            $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';
            $action .= '<a href="' . URL_Domain . 'JobResumeAdmin/' . $d->id . '" class="btn btn-s btn-warning  m-1 position-relative" ><i class="bi bi-folder"></i><small class="bag-red" style="position: absolute;top: -16px;">' . number_format($d->total_resume) . '</small> </a>';

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

            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "Disabled" => $disabled,
                "description" => $d->description,
                "level" => $d->level ?? "",
                "type" => $d->type ?? "",
                "gender" => $d->gender ?? "",
                "salary" => $d->salary ?? "",
                "skill" => $d->skill ?? "",
                "benefit" => $d->benefit ?? "",
                "exprience" => $d->exprience ?? "",
                "category" => $d->category_name,
                "country_name" => $d->country_name,

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

    public function get_all_job_user()
    {

        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result = $this->Curls->curl("Job/get", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];

        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a href="' . URL_Domain . 'EditJobAdminUser/' . $d->user_business_id . '/' . $d->id . '" class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
            $action .= '<a data-action="updateImage" data-id="' . $d->id . '" class="btn btn-s btn-warning  m-1" ><i class="bi bi-image-fill"></i></a>';
            $action .= '<a data-action="AddToTopList" data-id="' . $d->id . '" class="btn btn-s btn-prim  m-1" ><i class="bi bi-list-ol"></i></a>';

            $action .= '<a data-action="remove" data-id="' . $d->id . '" class="btn btn-s btn-danger  m-1" ><i class="bi bi-trash-fill"></i></a>';

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

            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "title" => $title,
                "Disabled" => $disabled,
                "description" => $d->description,
                "level" => $d->level ?? "",
                "type" => $d->type ?? "",
                "gender" => $d->gender ?? "",
                "salary" => $d->salary ?? "",
                "skill" => $d->skill ?? "",
                "benefit" => $d->benefit ?? "",
                "exprience" => $d->exprience ?? "",
                "category" => $d->category_name,
                "country_name" => $d->country_name,

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

    public function get_all_resume()
    {
        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result = $this->GetData->HandelToken("JobApply/getMyJobResume", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];

        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a data-action="update" data-id="' . $d->id . ',' . $d->status . '"  class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
            $action .= '<a href="' . URL_PATH . $d->resume_url . '/' . $d->resume_name . '" title="Resume" class="btn btn-s btn-danger  m-1" ><i class="bi bi-file-pdf-fill"></i></a>';
            $action .= '<a href="' . URL_Domain . '' . $d->display_name_slug . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-eye-fill"></i></a>';



            $action .= "</div>";

            $image = "";
            $title = "<span>" . $d->display_name . "</span>";
            if ($d->file_url !== '' && $d->file_url !== null) {
                $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->display_name . "</span>";
            }




            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "display_name" => $title,
                "status" => '<strong style="color:' . $d->color . '">' . $d->title . '</strong>',

                "created_at" => $d->created_at,
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
    public function get_all_resume_sub()
    {
        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;
        $data['userIdSearch'] = $this->bussinessNumber;

        $result = $this->GetData->HandelToken("JobApply/getMyJobResumeSub", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];

        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a data-action="update" data-id="' . $d->id . ',' . $d->status . '"  class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
            $action .= '<a href="' . URL_PATH . $d->resume_url . '/' . $d->resume_name . '" title="Resume" class="btn btn-s btn-danger  m-1" ><i class="bi bi-file-pdf-fill"></i></a>';
            $action .= '<a href="' . URL_Domain . '' . $d->display_name_slug . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-eye-fill"></i></a>';



            $action .= "</div>";

            $image = "";
            $title = "<span>" . $d->display_name . "</span>";
            if ($d->file_url !== '' && $d->file_url !== null) {
                $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->display_name . "</span>";
            }




            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "display_name" => $title,
                "status" => '<strong style="color:' . $d->color . '">' . $d->title . '</strong>',

                "created_at" => $d->created_at,
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
    
    public function get_all_resume_admin()
    {
        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result = $this->GetData->HandelToken("JobApply/getMyJobResumeAdmin", $data, true);
        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];

        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a data-action="update" data-id="' . $d->id . ',' . $d->status . '"  class="btn btn-s btn-primary  m-1" ><i class="bi bi-pencil-fill"></i></a>';
            $action .= '<a href="' . URL_PATH . $d->resume_url . '/' . $d->resume_name . '" title="Resume" class="btn btn-s btn-danger  m-1" ><i class="bi bi-file-pdf-fill"></i></a>';
            $action .= '<a href="' . URL_Domain . '' . $d->display_name_slug . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-eye-fill"></i></a>';



            $action .= "</div>";

            $image = "";
            $title = "<span>" . $d->display_name . "</span>";
            if ($d->file_url !== '' && $d->file_url !== null) {
                $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->display_name . "</span>";
            }




            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "display_name" => $title,
                "status" => '<strong style="color:' . $d->color . '">' . $d->title . '</strong>',

                "created_at" => $d->created_at,
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
    public function get_all_my_resume()
    {
        $data = $_POST;
        $data['number'] = $_POST['length'];
        $data = $data;

        $result = $this->GetData->HandelToken("JobApply/getMyResume", $data, true);

        $data = $result->data->data;
        $total = $result->data->total;
        if ($total == null)
            $total = 0;
        $aaData = [];

        foreach ((array)$data as $d) {


            $action = '<div class="product-extra-link2 d-flex">';
            $action .= '<a href="' . URL_Domain . 'JobDetail/' . $d->job_title_slug . '" class="btn btn-s btn-success  m-1" ><i class="bi bi-eye-fill"></i></a>';



            $action .= "</div>";

            $image = "";
            $title = "<span>" . $d->display_name . "</span>";
            if ($d->file_url !== '' && $d->file_url !== null) {
                $image = URL_PATH . $d->file_url . "/small" . "/" . $d->file_name;
                $title = "<img class='sm-img-table' src='" . $image . "'> <span>" . $d->display_name . "</span>";
            }




            array_push($aaData, [
                "id" => "<span>" . $d->id . "</span>",
                "display_name" => $title,
                "status" => '<strong style="color:' . $d->color . '">' . $d->title . '</strong>',

                "created_at" => $d->created_at,
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
