let ProfileClasses = await import("../../BusinessDashboard/profile/ProfileClass.js?v=" + Date.now());

const ProfileClass = ProfileClasses.ProfileClass;
const BtnAdd=document.getElementById("btnAddNew");


let PrfC=new ProfileClass("frmNew","BusinessUserManager");

PrfC.showData("userBusinessAction/getUserInfo",{});


if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        PrfC.SaveData(BtnAdd,"userAction/updateBusinessUserInfo")
    }
}