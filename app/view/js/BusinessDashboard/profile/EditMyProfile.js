
let ProfileClasses = await import("./ProfileClass.js?v=" + Date.now());

const ProfileClass = ProfileClasses.ProfileClass;
const BtnAdd=document.getElementById("btnAddNew");


let PrfC=new ProfileClass("frmNew","BusinessProfile");

PrfC.showData("UserAction/getOnlineBusinessUserData",{});


if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        PrfC.SaveData(BtnAdd,"userAction/updateMyBusinessUserInfo")
    }
}