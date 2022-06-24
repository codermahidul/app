import { ShowAddTop } from "../../BusinessDashboard/AddingTop.js";
import { imageShow, RemoveImage, SetImages } from "../../BusinessDashboard/Coupon/CouponImage.js";
import { fileInput, resetForm } from "../../functions/Common.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";



let DataTables= await import('../../Class/DataTable.js?v='+Date.now());
let PrClass= await import('../../BusinessDashboard/Coupon/CouponClass.js?v='+Date.now());



const DataTable=DataTables.DataTable;
const CouponClass=PrClass.CouponClass;



const DtClass=new DataTable("datatable","couponAble/get_all_for_business");
const CouponC=new CouponClass();
const Search=document.getElementById("searchbtn");

const removeBtn = document.getElementById("removeBtn");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");
const BtnSaveEditImage = document.getElementById("BtnEditImage");


const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "amount" },
    { "data": "type" },
    { "data": "link" },
    { "data": "product" },
    { "data": "expire" },
    { "data": "description" },

    { "data": "action" },

];
const param = {
    trash: "0",
    order:()=>{return "coupon.id";},
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
   
};


DtClass.CreateDataTable(param,column);
CouponC.FirstSet();
Search.onclick=()=>{
    DtClass.Refresh();
}




DtClass.ClickTable("AddToTopList",(data)=>{
    ShowAddTop(data.id, "coupon");
})

DtClass.ClickTable("update",(data)=>{
    CouponC.reset();
    CouponC.resetAllCat("more_cat_e");
 
    CouponC.ShowData("coupon/get",{idSearch:data.id})
})

DtClass.ClickTable("remove",(data)=>{
    resetForm("frmRemove", false)
    let modal = "modalRemove";
    let url = "coupon/remove";
    
    removeBtn.dataset.rmoveid = data.id;
    removeBtn.dataset.action = url;
    $("#" + modal).modal("show"); 
})



removeBtn.onclick = () => {

    CouponC.Remove(removeBtn,"coupon/updateCoupon",()=>{
        DtClass.Refresh();
        resetForm("frmRemove", false);
    })

}

BtnDeleteImage.onclick = () => {
    RemoveImage("coupon/deleteImage");
    setTimeout(() => {
        DtClass.Refresh()
    }, 1000);
}


BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage,"coupon/updateImage");
    setTimeout(() => {
        DtClass.Refresh()
    }, 1000);
}


DtClass.ClickTable("updateimage",(data)=>{
    imageShow(data.id,"coupon/get")
})

DtClass.ClickTable("SendAdmin",(data)=>{
    SwalRemoveFetch("coupon/updateCoupon",{idSearch:data.id,send_admin:"1"},()=>{
        RefreshTable();
    },"Are you sure?","","info","Ok","",false);

})

fileInput("fileinputs");







