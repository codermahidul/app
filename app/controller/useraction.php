<?php

class userAction
{
    private $Curls, $GetData;
    function __construct()
    {
        $this->Curls = new Curls;
        $this->GetData = new GetData;
    }

    public function newUser()
    {
        echo $this->Curls->curl("user/register", $_POST, false);
    }


    public function newBusinessUser()
    {
        echo $this->Curls->curl("userBusiness/addUserBusiness", $_POST, false);
    }


    public function login()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $type = $this->GetData->GetTypeOnline();
        if ($type !== '') {
            echo json_encode(["status" => 'false', "data" => "", "err" => "You are logged in with another account.(".$type.")"]);
            return false;
        }

        $response = $this->Curls->curl("userBusiness/login", $data, true);

        if ($response->status == "true") {

            $userData = $response->userData;
            switch ($userData->type) {
                case "professional": {
                        setcookie("professional_token", $response->data, time() + (86400 * 365), "/");
                        $href = "ProfessionalDashboard";
                        break;
                    }

                case "business": {
                        $href = "BusinessUserDashboard";
                        setcookie("bussiness_token", $response->data, time() + (86400 * 365), "/");
                        break;
                    }

                case "user": {
                        $href = "UserDashboard";
                        setcookie("token", $response->data, time() + (86400 * 365), "/");
                        break;
                    }

                case "team": {
                        $href = "TeamProfile";
                        setcookie("team_token", $response->data, time() + (86400 * 365), "/");
                        break;
                    }

                case "admin": {
                        $href = "AdminDashboard";
                        setcookie("tokeAdmin", $response->data, time() + (86400 * 365), "/");
                        break;
                    }
            }


            echo json_encode(["status" => 'true', "data" => "", "href" => $href, "err" => ""]);
        } else {
            echo json_encode($response);
        }
    }

    public function loginFetch()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        $type = $this->GetData->GetTypeOnline();
        if ($type !== '') {
            echo json_encode(["status" => 'false', "data" => "", "err" => "You are logged in with another account.(".$type.")"]);
            return false;
        }

        $response = $this->Curls->curl("userBusiness/login", $data, true);

        if ($response->status == "true") {

            $userData = $response->userData;
            switch ($userData->type) {
                case "professional": {
                        setcookie("professional_token", $response->data, time() + (86400 * 365), "/");
                        $href = "ProfessionalDashboard";
                        break;
                    }

                case "business": {
                        $href = "BusinessUserDashboard";
                        setcookie("bussiness_token", $response->data, time() + (86400 * 365), "/");
                        break;
                    }

                case "user": {
                        $href = "UserDashboard";
                        setcookie("token", $response->data, time() + (86400 * 365), "/");
                        break;
                    }

                case "team": {
                        $href = "TeamProfile";
                        setcookie("team_token", $response->data, time() + (86400 * 365), "/");
                        break;
                    }

                case "admin": {
                        $href = "AdminDashboard";
                        setcookie("tokeAdmin", $response->data, time() + (86400 * 365), "/");
                        break;
                    }
            }


            echo json_encode(["status" => 'true', "data" => "", "href" => $href, "err" => ""]);
        } else {
            echo json_encode($response);
        }
    }


    public function forgotPassword()
    {


        echo $this->Curls->curl("userBusiness/ForgotPassword", $_POST, false);
    }

    public function businessForgotPassword()
    {


        echo $this->Curls->curl("userBusiness/ForgotPassword", $_POST, false);
    }

    public function getOnlineUserData()
    {
        echo $this->GetData->HandelToken("userBusiness/getUserOnlineInfo", [], false);
    }

    public function getOnlineUserDataType()
    {
        $login = 'false';
        if (isset($_COOKIE['token'])) {
            $login = 'true';
            $this->getOnlineUserData();
        }
        if (isset($_COOKIE['bussiness_token']) && $login == 'false') {
            $login = 'true';
            $this->getOnlineBusinessUserData();
        }

        if (isset($_COOKIE['professional_token']) && $login == 'false') {
            $this->getOnlineBusinessUserDataProfessional();
            $login = 'true';
        }
    }

    public function getOnlineBusinessUserData()
    {

        echo $this->GetData->HandelToken("userBusiness/getUserOnlineInfo", [], false);
    }

    public function getOnlineBusinessUserDataProfessional()
    {

        echo $this->Curls->curl_with_token_professional("userBusiness/getUserOnlineInfo", [], false);
    }

    public function getOnlineTeamUserData()
    {

        echo $this->Curls->curl_with_token_team("team/getUserOnlineInfo", [], false);
    }

    public function editInfoUser()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("user/updateMyInfo", $data, false);
    }

    public function addWebsite()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userWebSite/addUserWebSite", $data, false);
    }

    public function updateMyBusinessUserInfo()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userBusiness/updateMyBusiness", $data, false);
    }


    public function updateMyProfessionalUserInfo()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_professional("userBusiness/updateMyBusiness", $data, false);
    }
    public function getBusinessUserInfo()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("userBusiness/getBusinessInfoAdmin", $data, false);
    }

    public function getBusinessUserCompleteInfo()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("userBusiness/get", $data, false);
    }
    public function updateBusinessUserInfo()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("userBusiness/updateUserBusiness", $data, false);
    }

    public function updateUserInfo()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("user/updateUser", $data, false);
    }
    public function updateWebsite()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userWebSite/updateUserWebSite", $data, false);
    }

    public function removeUserWebSite()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userWebSite/removeUserWebSite", $data, false);
    }
    public function addExprience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userExperience/addUserExperience", $data, false);
    }

    public function updateExperience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userExperience/updateUserExperience", $data, false);
    }
    public function removeUserExperience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userExperience/removeUserExperience", $data, false);
    }
    public function addEducation()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userEducation/addUserEducation", $data, false);
    }

    public function updateEducation()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userEducation/updateUserEducation", $data, false);
    }
    public function removeUserEducation()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userEducation/removeUserEducation", $data, false);
    }
    public function addVExperience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userVExperience/addUserVExperience", $data, false);
    }

    public function updateVExperience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userVExperience/updateUserVExperience", $data, false);
    }

    public function removeUserVExperience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userVExperience/removeUserVExperience", $data, false);
    }

    public function addLicense()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userLicense/addUserLicense", $data, false);
    }

    public function updateLicense()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userLicense/updateUserLicense", $data, false);
    }

    public function removeUserLicense()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userLicense/removeUserLicense", $data, false);
    }
    public function addPublication()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userPublication/addUserPublication", $data, false);
    }

    public function updatePublication()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userPublication/updateUserPublication", $data, false);
    }

    public function removeUserPublication()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userPublication/removeUserPublication", $data, false);
    }
    public function addPatent()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userPatent/addUserPatent", $data, false);
    }

    public function updatePatent()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userPatent/updateUserPatent", $data, false);
    }

    public function removeUserPatent()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userPatent/removeUserPatent", $data, false);
    }
    public function addCourse()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userCourse/addUserCourse", $data, false);
    }

    public function updateCourse()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userCourse/updateUserCourse", $data, false);
    }

    public function removeUserCourse()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userCourse/removeUserCourse", $data, false);
    }
    public function addProject()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userProject/addUserProject", $data, false);
    }

    public function updateProject()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userProject/updateUserProject", $data, false);
    }

    public function removeUserProject()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userProject/removeUserProject", $data, false);
    }
    public function addHonors()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userHonors/addUserHonors", $data, false);
    }

    public function updateHonors()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userHonors/updateUserHonors", $data, false);
    }

    public function removeUserHonors()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userHonors/removeUserHonors", $data, false);
    }

    public function addScore()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userScore/addUserScore", $data, false);
    }

    public function updateScore()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userScore/updateUserScore", $data, false);
    }

    public function removeUserScore()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userScore/removeUserScore", $data, false);
    }
    public function addLanguage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userLanguage/addUserLanguage", $data, false);
    }
    public function updateLanguage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userLanguage/updateUserLanguage", $data, false);
    }
    public function removeUserLanguage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userLanguage/removeUserLanguage", $data, false);
    }
    public function addOrganization()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userOrganization/addUserOrganization", $data, false);
    }

    public function updateOrganization()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userOrganization/updateUserOrganization", $data, false);
    }

    public function removeUserOrganization()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userOrganization/removeUserOrganization", $data, false);
    }
    public function getUserInfo()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("user/get", $data, false);
    }

    public function getUserInfoAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("user/getInfoUser", $data, false);
    }
    public function getUseruserWebSite()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userWebSite/MyWebSite", $data, false);
    }

    public function getUserExperience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userExperience/getMyExperience", $data, false);
    }

    public function getUseruserEducation()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userEducation/getMyEducation", $data, false);
    }

    public function getUserVExperience()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userVExperience/getMyVExprience", $data, false);
    }

    public function getUserLicense()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userLicense/getMyLicense", $data, false);
    }

    public function getUserPublication()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userPublication/getMyPublication", $data, false);
    }

    public function getUserPatent()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userPatent/getMyPatent", $data, false);
    }

    public function getUserCourse()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userCourse/getMyCourse", $data, false);
    }

    public function getUserProject()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userProject/getMyProject", $data, false);
    }


    public function getUserHonors()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userHonors/getMyHonors", $data, false);
    }

    public function getUserScore()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userScore/getMyScore", $data, false);
    }

    public function getUserLanguage()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userLanguage/getMyLanguage", $data, false);
    }

    public function getUserOrganization()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userOrganization/getMyOrganization", $data, false);
    }

    public function getUserSkill()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userSkill/getMySkill", $data, false);
    }
    public function addUserSkill()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userSkill/addUserSkill", $data, false);
    }

    public function removeUserSkill()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userSkill/removeUserSkill", $data, false);
    }

    public function getUserInterest()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userInterest/getMyInterest", $data, false);
    }
    public function addUserInterest()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        echo $this->GetData->HandelToken("userInterest/addUserInterest", $data, false);
    }
    public function removeUserInterest()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userInterest/removeUserInterest", $data, false);
    }
    public function changePass()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("user/changeUserPass", $data, false);
    }

    public function changepassbusiness()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userBusiness/changeUserPass", $data, false);
    }

    public function image()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        echo $this->GetData->HandelToken("user/changeUserImage", $data, false);
    }


    public function businessimage()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        echo $this->GetData->HandelToken("userBusiness/changeUserImage", $data, false);
    }

    public function forBusinessImage()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        $data['idSearch'] = $_POST['idSearch'];
        echo $this->GetData->HandelToken("userBusiness/changeForUserImage", $data, false);
    }

    public function removeImageBusiness()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userBusiness/RemoveBusinessImage", $data, false);
    }
    
    public function removeImageForBusiness()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userBusiness/RemoveForBusinessImage", $data, false);
    }
    public function banner()
    {
        $post = json_decode(file_get_contents('php://input'), true);

        if (basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        echo $this->GetData->HandelToken("user/changeUserBanner", $data, false);
    }

    public function removeBannerBusiness()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("userBusiness/RemoveBusinessIBanner", $data, false);
    }

    public function businessBanner()
    {
        $post = json_decode(file_get_contents('php://input'), true);

        if (basename($_FILES['img']['name']) != '') {

            $cfile = curl_file_create($_FILES['img']['tmp_name'], $_FILES['img']['type'], basename($_FILES['img']['name']));
            $data['img'] = ($cfile);
        } else
            $data['img'] = '';

        echo $this->GetData->HandelToken("userBusiness/changeUserBanner", $data, false);
    }


    public function newuseradmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("user/registerAdmin", $data, false);
    }


    public function newBusinessUserAdmin()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl_with_token_admin("userBusiness/addUserBusinessAdmin", $data, false);
    }

    public function requestfollow()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        echo $this->GetData->HandelToken("user/RequestFollowUser", $data, false);
    }

    public function unfollow()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        echo $this->GetData->HandelToken("user/UnFollowUser", $data, false);
    }

    public function getMyNote()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("note/getMyNote", $data, false);
    }

    public function getmynoteBusiness()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("note/getMyNote", $data, false);
    }

    public function updatenote()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("note/updateNotes", $data, false);
    }

    public function setemailnote()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("note/updateNotesEmail", $data, false);
    }

    public function setEmailNoteBusiness()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("note/updateNotesEmailBusiness", $data, false);
    }

    public function addLinks()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("BusinessUserLink/addUserLink", $data, false);
    }

    public function getUserLink()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("BusinessUserLink/getMyLink", $data, false);
    }

    public function removeUserLink()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("BusinessUserLink/removeUserLink", $data, false);
    }

    public function userBusinessGet()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("userBusiness/get", $data, false);
    }

    public function addNewComment()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("BusinessComment/addNewComment", $data, false);
    }

    public function addReplyComment()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("BusinessComment/addNewReplyComment", $data, false);
    }

    public function addReplyCommentBusiness()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("BusinessComment/addBusinessReplyComment", $data, false);
    }

    public function getComment()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->Curls->curl("BusinessComment/get", $data, false);
    }


    public function addNewCommentLike()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if ($data['creator_type'] == "user")
            echo $this->GetData->HandelToken("BusinessComment/addNewLikeComment", $data, false);
        if ($data['creator_type'] == "business")
            echo $this->GetData->HandelToken("BusinessComment/addNewLikeComment", $data, false);
    }

    public function removeCommentLike()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        if ($data['creator_type'] == "user")
            echo $this->GetData->HandelToken("BusinessComment/RemoveLikeComment", $data, false);
        if ($data['creator_type'] == "business")
            echo $this->GetData->HandelToken("BusinessComment/RemoveLikeComment", $data, false);
    }

    public function rate()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        echo $this->GetData->HandelToken("rate/addBusinessRate", $data, false);
    }
}
