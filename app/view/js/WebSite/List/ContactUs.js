

let Commons=await import ("../../functions/Common.js?v="+Date.now())
let Setting = await import("../../Fetch/Setting.js?v=" + Date.now());
let CheckedS = await import('../../functions/Checked.js?v='+Date.now());

const URLPATH=Setting.URLPATH;
const CheckCaptcha=CheckedS.CheckCaptcha;
const SendDataForm=Commons.SendDataForm;

const Company = document.getElementById("company");
const Name = document.getElementById("name");
const Phone = document.getElementById("phone");
const Email = document.getElementById("email");
const Description = document.getElementById("description");

const SaveData = document.getElementById("SaveData");



SaveData.onclick = () => {
    if (!CheckCaptcha())
        return false;

    SendDataForm(SaveData,"frmContact","fetchData/newContact",[
        Company,Name,Phone,Email,Description
    ],[],false,()=>{

    });

   
}











