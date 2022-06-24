
import { URLPATH } from "../../Fetch/Setting.js";
import { fileInput,GetIdFromUrl,tokenizAjax } from "../../functions/Common.js";

let Common = await import("../../Fetch/Common.js?v=" + Date.now())
let Deals = await import("../../BusinessDashboard/Deals/DealsClass.js?v=" + Date.now())

const CreateSelectOption=Common.CreateSelectOption;
const DealClass = Deals.DealClass;

const DealsC = new DealClass("frmNew","DealsListP");
const BtnAdd=document.getElementById("btnAddNew");


if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        DealsC.EditInfo(BtnAdd,"deals/updateDeals");
    }
}

const FirstSet=()=>{
    return new Promise(resolve=>{
        fileInput("fileInputs");
        tokenizAjax("productSearch", false, "product/getDataCouponSub", {}, "title", "1");
        CreateSelectOption({ url: URLPATH+"fetchData/proof_get", params: { type: "discount" } }, { id: "type", value: "id", title: "title" },"",false,resolve)
    })
    
}


async function GetDatas(){
     await FirstSet();
     DealsC.ShowData("deals/getAll",{idSearch:GetIdFromUrl()});

}

GetDatas();