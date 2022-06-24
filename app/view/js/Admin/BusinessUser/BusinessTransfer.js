import { URLPATH } from "../../Fetch/Setting.js";
import { SendDataForm } from "../../functions/Common.js";

let AutoCompletes= await import('../../Class/AutoComplete.js?v='+Date.now());

const AutoComplete=AutoCompletes.AutoComplete;


let param=[{name:"type",value:"business"}];

const SaveBtn=document.getElementById("saveBtn");
const AutoC1=new AutoComplete("userAction/userBusinessGet","searchVal","resultB","display_name","display_name",param);
const AutoC2=new AutoComplete("userAction/userBusinessGet","searchVal2","resultB2","display_name","display_name",param);


SaveBtn.onclick=()=>{
    if(AutoC1.GetValue()==="")
    {
        toast("Please Choose Business for get data", "error");
        return false;
    }

    if(AutoC2.GetValue()==="")
    {
        toast("Please Choose Business for move", "error");
        return false;
    }


    SendDataForm(SaveBtn,"frmEdit","userBusinessAction/moving",[],[
        {name:"business_id_get",value:AutoC1.GetValue()},
        {name:"business_id_move",value:AutoC2.GetValue()}
    ],false,()=>{
        window.location.href=URLPATH+"BusinessUserManager";
    },false);
    
}