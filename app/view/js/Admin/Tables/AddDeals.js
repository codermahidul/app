import { CreateSelectOption } from "../../Fetch/Common.js";
import { fileInput,tokenizAjax } from "../../functions/Common.js";

let Deals = await import("../../BusinessDashboard/Deals/DealsClass.js?v=" + Date.now())

const DealClass = Deals.DealClass;

const DealsC = new DealClass("frmNew","MyDealsAdmin");
const BtnAdd=document.getElementById("btnAddNew");


if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        DealsC.AddNew(BtnAdd,"deals/newDealsAdmin");
    }
}

fileInput("fileInputs");
tokenizAjax("productSearch", false, "product/getDataAdmin", {}, "title", "1");
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "discount" } }, { id: "type", value: "id", title: "title" })
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "discount" } }, { id: "type_e", value: "id", title: "title" })
