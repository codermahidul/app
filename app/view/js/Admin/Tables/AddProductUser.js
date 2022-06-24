import { CreateSelectOption } from "../../Fetch/Common.js";
import { fileInput, GetIdFromUrl } from "../../functions/Common.js";


let Product = await import("../../BusinessDashboard/Product/ProductClass.js?v=" + Date.now())

const ProductClass = Product.ProductClass;

const PrC = new ProductClass("frmNew","UserProductList/"+GetIdFromUrl());

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
        PrC.AddNewForUser(BtnAdd,"product/newProductAdmin");
    }
}

fileInput("fileInputs");
