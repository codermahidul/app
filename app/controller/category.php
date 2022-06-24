<?php

class category {
    private $Curls;
     function __construct()
    {
        $this->Curls=new Curls;
    }

    public function addnew()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("category/addCategory",$data,false);
    }

    
    public function get()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("category/get",$data,false);
    }

    public function getComplete()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("category/getWithParent",$data,false);
    }

    public function updatecategory()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("category/updateCategory",$data,false);
    }

    public function remove()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("category/removeCategory",$data,false);
    }

    public function newQuestion()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("question/addQuestion",$data,false);
    }
    
    
    public function getQuestions()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("question/get",$data,false);
    }
    
    
    public function removeQuestion()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("question/removeQuestions",$data,false);
    }
    
}
?>