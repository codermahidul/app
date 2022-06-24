
import { URLPATH } from "../../Fetch/Setting.js";
import { fileInput,GetIdFromUrl } from "../../functions/Common.js";



let Product = await import("../../BusinessDashboard/Product/ProductClass.js?v=" + Date.now())

const ProductClass = Product.ProductClass;

const PrC = new ProductClass("frmNew","ProductListP");

const BtnSave=document.getElementById("btnSave");


if(BtnSave!==null)
{
    BtnSave.onclick=()=>{
        PrC.EditInfoWithoutModal(BtnSave,"product/updateProduct");
    }
}

const FirstSet=()=>{
    return new Promise(resolve=>{
        fileInput("fileInputs");
        //CreateSelectOption({ url: URLPATH+"fetchData/proof_get", params: { type: "discount" } }, { id: "type", value: "id", title: "title" },"",false,resolve)
        resolve();
    })
    
}


async function GetDatas(){
    
     await FirstSet();

     PrC.ShowDataWithOutModal("product/get",{idSearch:GetIdFromUrl()})

}

GetDatas();