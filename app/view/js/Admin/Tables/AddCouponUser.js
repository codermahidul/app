import { CreateSelectOption } from "../../Fetch/Common.js";
import { URLPATH } from "../../Fetch/Setting.js";
import { fileInput,GetIdFromUrl,tokenizAjax } from "../../functions/Common.js";

let coupon = await import("../../BusinessDashboard/Coupon/CouponClassMain.js?v=" + Date.now())

const CouponClassMain = coupon.CouponClassMain;

const CouponC = new CouponClassMain("frmNew","UserCouponList/"+GetIdFromUrl());
const BtnAdd=document.getElementById("btnAddNew");

if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{

        CouponC.AddNewForUser(BtnAdd,"coupon/newCouponAdmin");
    }
}

fileInput("fileInputs");
tokenizAjax("productSearch", false, "product/ge", {}, "title", "1");
CreateSelectOption({ url: URLPATH+"fetchData/proof_get", params: { type: "discount" } }, { id: "type", value: "id", title: "title" })
CreateSelectOption({ url: URLPATH+"fetchData/proof_get", params: { type: "discount" } }, { id: "type_e", value: "id", title: "title" })
CreateSelectOption({ url: URLPATH+"fetchData/proof_get", params: { type: "typeUse" } }, { id: "type_use", value: "id", title: "title" })
