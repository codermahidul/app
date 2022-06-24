
import { URLPATH } from "../../Fetch/Setting.js";
import { fileInput,GetIdFromUrl,tokenizAjax } from "../../functions/Common.js";

let Common = await import("../../Fetch/Common.js?v=" + Date.now())
let Coupon = await import("../../BusinessDashboard/Coupon/CouponClassMain.js?v=" + Date.now())

const CreateSelectOption=Common.CreateSelectOption;
const CouponClassMain = Coupon.CouponClassMain;

const CouponC = new CouponClassMain("frmNew","CouponListP");
const BtnAdd=document.getElementById("btnAddNew");


if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        CouponC.EditInfo(BtnAdd,"coupon/updateCoupon");
    }
}

const FirstSet=()=>{
    return new Promise(resolve=>{
        fileInput("fileInputs");
        tokenizAjax("productSearch", false, "product/getDataCouponSub", {}, "title", "1");
        CreateSelectOption({ url: URLPATH+"fetchData/proof_get", params: { type: "discount" } }, { id: "type", value: "id", title: "title" },"",false,resolve)
        CreateSelectOption({ url: URLPATH+"fetchData/proof_get", params: { type: "typeUse" } }, { id: "type_use", value: "id", title: "title" })

    })
    
}


async function GetDatas(){
     await FirstSet();
     CouponC.ShowData("coupon/get",{idSearch:GetIdFromUrl()});

}

GetDatas();