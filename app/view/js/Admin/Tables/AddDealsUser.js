import { CreateSelectOption } from "../../Fetch/Common.js";
import {  URLPATH } from "../../Fetch/Setting.js";
import { fileInput,GetIdFromUrl,tokenizAjax } from "../../functions/Common.js";

let Deals = await import("../../BusinessDashboard/Deals/DealsClass.js?v=" + Date.now())

const DealClass = Deals.DealClass;

const DealsC = new DealClass("frmNew","UserDealsList/"+GetIdFromUrl());
const BtnAdd=document.getElementById("btnAddNew");


if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        DealsC.AddNewForUser(BtnAdd,"deals/newDealsAdmin");
    }
}

fileInput("fileInputs");
tokenizAjax("productSearch", false, "product/get",{userIdSearch:GetIdFromUrl()}, "title", "1");
CreateSelectOption({ url: URLPATH+"fetchData/proof_get", params: { type: "discount" } }, { id: "type", value: "id", title: "title" })
CreateSelectOption({ url:  URLPATH+"fetchData/proof_get", params: { type: "discount" } }, { id: "type_e", value: "id", title: "title" })
