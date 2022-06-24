
import { URLPATH } from "../../Fetch/Setting.js";
import { fileInput,GetIdFromUrl,tokenizAjax } from "../../functions/Common.js";

let Common = await import("../../Fetch/Common.js?v=" + Date.now())

const CreateSelectOption=Common.CreateSelectOption;

let Product = await import("../../BusinessDashboard/Product/ProductClass.js?v=" + Date.now())

const ProductClass = Product.ProductClass;

const PrC = new ProductClass("frmNew","MyProductAdmin");

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
        PrC.EditInfoWithoutModal(BtnAdd,"product/updateProduct");
    }
}

const FirstSet=()=>{
    return new Promise(resolve=>{
        fileInput("fileInputs");
//        CreateSelectOption({ url: URLPATH+"fetchData/proof_get", params: { type: "discount" } }, { id: "type", value: "id", title: "title" },"",false,resolve)

    resolve();
    })
    
}


async function GetDatas(){
    
     await FirstSet();
     PrC.ShowDataWithOutModal("product/getDataAdmin",{idSearch:GetIdFromUrl()});

}

GetDatas();