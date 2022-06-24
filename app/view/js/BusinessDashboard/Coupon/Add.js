import { CreateSelectOption } from "../../Fetch/Common.js";
import checkValue from "../../functions/Checked.js";
import { fileInput,tokenizAjax } from "../../functions/Common.js";

let coupon = await import("./CouponClassMain.js?v=" + Date.now())

const CouponClassMain = coupon.CouponClassMain;

const CouponC = new CouponClassMain("frmNew","CouponList");
const BtnAdd=document.getElementById("btnAddNew");

if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{

        CouponC.AddNew(BtnAdd,"coupon/newCoupon");
    }
}

fileInput("fileInputs");
tokenizAjax("productSearch", false, "product/getData", {}, "title", "1");
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "discount" } }, { id: "type", value: "id", title: "title" })
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "discount" } }, { id: "type_e", value: "id", title: "title" })
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "typeUse" } }, { id: "type_use", value: "id", title: "title" })
