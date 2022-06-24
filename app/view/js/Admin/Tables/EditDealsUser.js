
import { URLPATH } from "../../Fetch/Setting.js";
import { fileInput,GetIdFromUrl,tokenizAjax } from "../../functions/Common.js";

let Common = await import("../../Fetch/Common.js?v=" + Date.now())
let Deals = await import("../../BusinessDashboard/Deals/DealsClass.js?v=" + Date.now())

const CreateSelectOption=Common.CreateSelectOption;
const DealClass = Deals.DealClass;

const DealsC = new DealClass("frmNew","UserDealsList/"+GetIdFromUrl());
const BtnAdd=document.getElementById("btnAddNew");

let IdSearch=window.location.pathname.split("/");
IdSearch= IdSearch[IdSearch.length - 2];

if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        DealsC.EditInfo(BtnAdd,"deals/updateDeals");
    }
}

const FirstSet=()=>{
    return new Promise(resolve=>{
        fileInput("fileInputs");
        tokenizAjax("productSearch", false, "product/get",{userIdSearch:GetIdFromUrl()}, "title", "1");
        CreateSelectOption({ url: URLPATH+"fetchData/proof_get", params: { type: "discount" } }, { id: "type", value: "id", title: "title" },"",false,resolve)
    })
    
}


async function GetDatas(){
     await FirstSet();
     DealsC.ShowData("deals/get",{idSearch:IdSearch});

}

GetDatas();