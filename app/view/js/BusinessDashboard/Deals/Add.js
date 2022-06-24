import { CreateSelectOption } from "../../Fetch/Common.js";
import { fileInput,tokenizAjax } from "../../functions/Common.js";

let Deals = await import("./DealsClass.js?v=" + Date.now())

const DealClass = Deals.DealClass;

const DealsC = new DealClass("frmNew","DealsList");
const BtnAdd=document.getElementById("btnAddNew");


if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        DealsC.AddNew(BtnAdd,"deals/addNew");
    }
}

fileInput("fileInputs");
tokenizAjax("productSearch", false, "product/getData", {}, "title", "1");
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "discount" } }, { id: "type", value: "id", title: "title" })
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "discount" } }, { id: "type_e", value: "id", title: "title" })
