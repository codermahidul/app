import { GetIdFromUrl, fileInput, resetForm } from "../../functions/Common.js";
import { RemoveImage, SetImages, imageShow } from "../../BusinessDashboard/Coupon/CouponImage.js";

import { ShowAddTop } from "../../BusinessDashboard/AddingTop.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";

let DataTables= await import('../../Class/DataTable.js?v='+Date.now());
let Deals = await import("../../BusinessDashboard/Deals/DealsClass.js?v=" + Date.now())



const DataTable=DataTables.DataTable;
const DealClass = Deals.DealClass;
const DealsC = new DealClass("","");



const DtClass=new DataTable("dataTable","couponAble/get_all_deals_user");

const Search=document.getElementById("searchbtn");
const searchVal=document.getElementById("searchVal");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");
const BtnSaveEditImage = document.getElementById("BtnEditImage");
const removeBtn = document.getElementById("removeBtn");


const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "value" },
    { "data": "price" },
    { "data": "product" },
    { "data": "start" },
    { "data": "expire" },
    { "data": "inventory" },
    { "data": "action" },

];
const param = {
    trash: "0",
    idSearch: () => { return $("#idSearchs").val() },
    display_name: () => { return $("#titlese").val() },
    category_id:()=>{return DealsC.GetCategoryId();},
    userIdSearch: () => { return GetIdFromUrl(); }

};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}

DtClass.ClickTable("updateImage",(data)=>{
    imageShow(data.id,"deals/get")
})

DtClass.ClickTable("AddToTopList",(data)=>{
    ShowAddTop(data.id, "deals");
})

DtClass.ClickTable("remove",(data)=>{
    resetForm("frmRemove", false)
    let modal = "modalRemove";
    let url = "deals/remove";
    
    removeBtn.dataset.rmoveid = data.id;
    removeBtn.dataset.action = url;
    $("#" + modal).modal("show"); 
})

DtClass.ClickTable("view",(data)=>{
    DealsC.ViewInfo("deals/get",{idSearch:data.id},()=>{$("#ModalView").modal("show")})
})

removeBtn.onclick = () => {

    DealsC.Remove(removeBtn,"deals/updateDeals",()=>{
        DtClass.Refresh();
        resetForm("frmRemove", false);
    })

}

BtnDeleteImage.onclick = () => {
    RemoveImage("deals/deleteImage");
    setTimeout(() => {
        DtClass.Refresh()
    }, 1000);
}

BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage,"deals/updateImage");
    setTimeout(() => {
        DtClass.Refresh()
    }, 1000);
}

DtClass.ClickTable("SendAdmin",(data)=>{
    SwalRemoveFetch("deals/updateDeals",{idSearch:data.id,send_admin:"1"},()=>{
        DtClass.Refresh()
    },"Are you sure?","","info","Ok","",false,"Your file has been sent to admin");
})

fileInput("fileinputs");
