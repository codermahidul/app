import { CreateSelectOption } from "../../Fetch/Common.js";
import { fileInput } from "../../functions/Common.js";

let Product = await import("../../BusinessDashboard/Product/ProductClass.js?v=" + Date.now())

const ProductClass = Product.ProductClass;

const PrC = new ProductClass("frmNew","ProductListP");
const BtnAdd=document.getElementById("btnSave");
const AddMoreLinks = document.getElementById("add_more_links");
const AddMoreCat=document.getElementById("add_more_cat");
const ResetCat=document.getElementById("reset_cat");

AddMoreCat.onclick=()=>{
    PrC.AddCategory("more_cat");
}

ResetCat.onclick=()=>{
    PrC.resetAllCat("more_cat");
    PrC.AddCategory("more_cat");
}

AddMoreLinks.onclick=()=>{
    PrC.CreateLink("more_link");
}

if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        PrC.AddNew(BtnAdd,"product/newProductSub");
    }
}

fileInput("fileInputs");
//CreateSelectOption({ url: "fetchData/proof_get", params: { type: "discount" } }, { id: "type", value: "id", title: "title" })
//CreateSelectOption({ url: "fetchData/proof_get", params: { type: "discount" } }, { id: "type_e", value: "id", title: "title" })
