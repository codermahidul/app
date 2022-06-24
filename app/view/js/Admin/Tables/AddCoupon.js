import { fileInput, tokenizAjax } from "../../functions/Common.js";

import { CreateSelectOption } from "../../Fetch/Common.js";

let coupon = await import("../../BusinessDashboard/Coupon/CouponClassMain.js?v=" + Date.now())

const CouponClassMain = coupon.CouponClassMain;

const CouponC = new CouponClassMain("frmNew","MyCouponAdmin");
const BtnAdd=document.getElementById("btnAddNew");

if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{

        CouponC.AddNew(BtnAdd,"coupon/newCouponAdmin");
    }
}

fileInput("fileInputs");
tokenizAjax("productSearch", false, "product/get", {}, "title", "1");
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "discount" } }, { id: "type", value: "id", title: "title" })
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "discount" } }, { id: "type_e", value: "id", title: "title" })
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "typeUse" } }, { id: "type_use", value: "id", title: "title" })
