<?php

class userBusinessAction {
    private $Curls,$GetData;
     function __construct()
    {
        $this->Curls=new Curls;
        $this->GetData=new GetData;
    }


    public function editInfoUser()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("UserBusiness/updateUserBusiness",$data,false);
    }

    public function editMyInfo()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("UserBusiness/updatMyInfo",$data,false);
    }

    
    public function addWebsite()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserWebSite/addUserWebSite",$data,false);
    }
    
    public function updateWebsite()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserWebSite/updateUserWebSite",$data,false);
    }
    
    public function removeUserWebSite()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserWebSite/removeUserWebSite",$data,false);
    }
    public function addExprience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserExperience/addUserExperience",$data,false);
    }
    
    public function updateExperience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserExperience/updateUserExperience",$data,false);
    }
    public function removeUserExperience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserExperience/removeUserExperience",$data,false);
    }
    public function addEducation()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserEducation/addUserEducation",$data,false);
    }
    
    public function updateEducation()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserEducation/updateUserEducation",$data,false);
    }
    public function removeUserEducation()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserEducation/removeUserEducation",$data,false);
    }
    public function addVExperience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserVExperience/addUserVExperience",$data,false);
    }
    
    public function updateVExperience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserVExperience/updateUserVExperience",$data,false);
    }

    public function removeUserVExperience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserVExperience/removeUserVExperience",$data,false);
    }

    public function addLicense()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserLicense/addUserLicense",$data,false);
    }
    
    public function updateLicense()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserLicense/updateUserLicense",$data,false);
    }
        
    public function removeUserLicense()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserLicense/removeUserLicense",$data,false);
    }
    public function addPublication()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserPublication/addUserPublication",$data,false);
    }
    
    public function updatePublication()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserPublication/updateUserPublication",$data,false);
    }
      
    public function removeUserPublication()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserPublication/removeUserPublication",$data,false);
    }
    public function addPatent()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserPatent/addUserPatent",$data,false);
    }

    public function updatePatent()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserPatent/updateUserPatent",$data,false);
    }
    
    public function removeUserPatent()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserPatent/removeUserPatent",$data,false);
    }
    public function addCourse()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserCourse/addUserCourse",$data,false);
    }

    public function updateCourse()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserCourse/updateUserCourse",$data,false);
    }
    
    public function removeUserCourse()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserCourse/removeUserCourse",$data,false);
    }
    public function addProject()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserProject/addUserProject",$data,false);
    }

    public function updateProject()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserProject/updateUserProject",$data,false);
    }

    public function removeUserProject()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserProject/removeUserProject",$data,false);
    }
    public function addHonors()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserHonors/addUserHonors",$data,false);
    }

    public function updateHonors()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserHonors/updateUserHonors",$data,false);
    }

    public function removeUserHonors()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserHonors/removeUserHonors",$data,false);
    }

    public function addScore()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserScore/addUserScore",$data,false);
    }

    public function updateScore()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserScore/updateUserScore",$data,false);
    }
    
    public function removeUserScore()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserScore/removeUserScore",$data,false);
    }
    public function addLanguage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserLanguage/addUserLanguage",$data,false);
    }
    public function updateLanguage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserLanguage/updateUserLanguage",$data,false);
    }
    public function removeUserLanguage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserLanguage/removeUserLanguage",$data,false);
    }
    public function addOrganization()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserOrganization/addUserOrganization",$data,false);
    }

    public function updateOrganization()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserOrganization/updateUserOrganization",$data,false);
    }
    
    public function removeUserOrganization()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserOrganization/removeUserOrganization",$data,false);
    }
    public function getUserInfo()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("UserBusiness/get",$data,false);
    }



    public function getUserUserWebSite()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserWebSite/MyWebSite",$data,false);
    }
    
    public function getUserExperience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserExperience/getMyExperience",$data,false);
    }

    public function getUserUserEducation()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserEducation/getMyEducation",$data,false);
    }

    public function getUserVExperience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserVExperience/getMyVExprience",$data,false);
    }
    
    public function getUserLicense()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserLicense/getMyLicense",$data,false);
    }
    
    public function getUserPublication()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserPublication/getMyPublication",$data,false);
    }
    
    public function getUserPatent()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserPatent/getMyPatent",$data,false);
    }

    public function getUserCourse()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserCourse/getMyCourse",$data,false);
    }

    public function getUserProject()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserProject/getMyProject",$data,false);
    }

    
    public function getUserHonors()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserHonors/getMyHonors",$data,false);
    }

    public function getUserScore()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserScore/getMyScore",$data,false);
    }

    public function getUserLanguage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserLanguage/getMyLanguage",$data,false);
    }
    
    public function getUserOrganization()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserOrganization/getMyOrganization",$data,false);
    }

    public function getUserSkill()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserSkill/getMySkill",$data,false);
    }
    public function addUserSkill()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserSkill/addUserSkill",$data,false);
    }

    public function removeUserSkill()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserSkill/removeUserSkill",$data,false);
    }

    public function getUserInterest()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserInterest/getMyInterest",$data,false);
    }
    public function addUserInterest()
    {
        $data = json_decode(file_get_contents('php://input'), true);
   
        echo $this->GetData->HandelToken("businessUserInterest/addUserInterest",$data,false);
    }
    public function removeUserInterest()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("businessUserInterest/removeUserInterest",$data,false);
    }
    public function changePass()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("UserBusiness/changeUserPass",$data,false);
        
    }
    public function pdf()
    {
        $data = json_decode(file_get_contents('php://input'), true);
 
        if (basename($_FILES['pdf']['name']) != '') {

            $cfile = curl_file_create($_FILES['pdf']['tmp_name'], $_FILES['pdf']['type'], basename($_FILES['pdf']['name']));
            $data['pdf'] = ($cfile);
        } else
            $data['pdf'] = '';
     
        echo $this->GetData->HandelToken("UserBusiness/changeUserResume",$data,false);
        
    }

    public function deleteMyResume()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("UserBusiness/removeMyResume",$data,false);

    }

    public function image()
    {
        $data = json_decode(file_get_contents('php://input'), true);
 
        if (basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';
     
        echo $this->GetData->HandelToken("UserBusiness/changeUserImage",$data,false);
        
    }

    public function banner()
    {
        $post = json_decode(file_get_contents('php://input'), true);
 
        if (basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';
     
        echo $this->GetData->HandelToken("UserBusiness/changeUserBanner",$data,false);
        
    }
    
    public function requestFollow()
    {
        $data = json_decode(file_get_contents('php://input'), true);
     
        echo $this->GetData->HandelToken("Follow/addFollow",$data,false);


    }
       
    public function unfollow()
    {
        $data = json_decode(file_get_contents('php://input'), true);
  
        echo $this->GetData->HandelToken("Follow/Remove",$data,false);
    }

    public function getMyNote()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("note/getMyNote",$data,false);
    }

    
    public function updateNote()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("note/updateNotes",$data,false);
    }

    public function setMailNote()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("note/updateNotesEmailBusiness",$data,false);
    }

    public function setEmailNote()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("note/updateNotesEmailBusiness",$data,false);
    }

    public function newWork()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("BusinessWorked/addWork",$data,false);
    }

    public function updateWork()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("BusinessWorked/updateWork",$data,false);
    }

    public function productShare()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("product/Share",$data,false);
    }

    public function couponShare()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("coupon/Share",$data,false);
    }

    public function prizeShare()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("prize/Share",$data,false);
    }
    
    public function GetFollowProduct()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $type_online=$this->GetData->GetTypeOnline();
       
        if($type_online=="user")
        echo $this->GetData->HandelToken("Fetch/GetBusinessProduct",$data,false);

        if($type_online=="userBusiness")
        echo $this->GetData->HandelToken("Fetch/GetBusinessProduct",$data,false);

        if($type_online=="userProfessional")
        echo $this->GetData->HandelToken("Fetch/GetBusinessProduct",$data,false);


        
    }

    public function GetFollowShareProduct()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $type_online=$this->GetData->GetTypeOnline();
       
        if($type_online=="user")
        echo $this->GetData->HandelToken("Fetch/GetShareProductFollow",$data,false);

        if($type_online=="userBusiness")
        echo $this->GetData->HandelToken("Fetch/GetShareProductFollow",$data,false);

        if($type_online=="userProfessional")
        echo $this->GetData->HandelToken("Fetch/GetShareProductFollow",$data,false);


        
    }

    public function GetFollowPrize()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $type_online=$this->GetData->GetTypeOnline();
       
        if($type_online=="user")
        echo $this->GetData->HandelToken("Fetch/GetBusinessPrize",$data,false);

        if($type_online=="userBusiness")
        echo $this->GetData->HandelToken("Fetch/GetBusinessPrize",$data,false);

        if($type_online=="userProfessional")
        echo $this->GetData->HandelToken("Fetch/GetBusinessPrize",$data,false);


        
    }
    public function GetFollowSharePrize()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $type_online=$this->GetData->GetTypeOnline();
       
        if($type_online=="user")
        echo $this->GetData->HandelToken("Fetch/GetSharePrizeFollow",$data,false);

        if($type_online=="userBusiness")
        echo $this->GetData->HandelToken("Fetch/GetSharePrizeFollow",$data,false);

        if($type_online=="userProfessional")
        echo $this->GetData->HandelToken("Fetch/GetSharePrizeFollow",$data,false);


        
    }
    public function GetFollowCoupon()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $type_online=$this->GetData->GetTypeOnline();
       
        if($type_online=="user")
        echo $this->GetData->HandelToken("Fetch/GetBusinessCoupon",$data,false);

        if($type_online=="userBusiness")
        echo $this->GetData->HandelToken("Fetch/GetBusinessCoupon",$data,false);

        if($type_online=="userProfessional")
        echo $this->GetData->HandelToken("Fetch/GetBusinessCoupon",$data,false);


        
    }
    public function GetFollowShareCoupon()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $type_online=$this->GetData->GetTypeOnline();
       
        if($type_online=="user")
        echo $this->GetData->HandelToken("Fetch/GetShareCouponFollow",$data,false);

        if($type_online=="userBusiness")
        echo $this->GetData->HandelToken("Fetch/GetShareCouponFollow",$data,false);

        if($type_online=="userProfessional")
        echo $this->GetData->HandelToken("Fetch/GetShareCouponFollow",$data,false);
    }

    public function moving()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("UserBusiness/moveData",$data,false);
    }

    public function setPermission()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_business("UserBusiness/AddPermission",$data,false);
    }
    public function getPermissions()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_business("UserBusiness/getPermission",$data,false);
    }

    public function SetCookieBusiness()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        setcookie("bussinessNumber", $data['id'], time() + (86400 * 365), "/");
        echo json_encode(["status"=>"true"]);

    }

    
    public function addFileVerify()
    {
 
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($_FILES['img']) && basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';


        $data['type']=$_POST['type'];    
        $data['description']=$_POST['description'];    
     
        echo $this->Curls->curl_with_token_business("UserBusiness/fileVerify",$data,false);
        
    }

    public function getMyVerifyFile()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_business("UserBusiness/getMyVerifyFile",$data,false);
    }

    public function updateVerifyFile()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("UserBusiness/UpdateVerify",$data,false);
    }

    public function removeVerifyFile()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_business("UserBusiness/removeVerify",$data,false);
    }

    public function getAllMyFollower()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Follow/getMyFollowerList",$data,false);
    }

    public function getAllMyFollowing()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Follow/getMyFollowingList",$data,false);
    }

    public function updateFollowing()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Follow/SetBlock",$data,false);
    }
    
    public function AddTxt()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Message/add",$data,false);
    }

    public function AddTxtExist()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Message/addTxt",$data,false);
    }

    public function GetMessageTxt()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Message/getText",$data,false);
    }

    public function blockMessage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Message/block",$data,false);
    }

    public function removeBlockMessage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("Message/unblock",$data,false);
    }

    public function getNoteNew()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("UserBusiness/getNoteNew",$data,false);
    }

    public function updateNoteNew()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("UserBusiness/updateNoteNew",$data,false);
    }

}
?>