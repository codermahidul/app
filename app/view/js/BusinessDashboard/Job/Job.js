
import { fileInput, resetForm } from "../../functions/Common.js";
import { ShowAddTop } from "../AddingTop.js";
import { imageShow,RemoveImage,SetImages } from "../Coupon/CouponImage.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";

let DataTables= await import('../../Class/DataTable.js?v='+Date.now());
let Jobs = await import("./JobClass.js?v=" + Date.now())



const DataTable=DataTables.DataTable;
const JobClass = Jobs.JobClass;
const JobC = new JobClass("","");



const DtClass=new DataTable("dataTable","jobTable/get_all");

const Search=document.getElementById("searchbtn");
const searchVal=document.getElementById("searchVal");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");
const BtnSaveEditImage = document.getElementById("BtnEditImage");
const removeBtn = document.getElementById("removeBtn");


const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "category" },
    { "data": "type" },
    { "data": "level" },
    { "data": "skill" },
    { "data": "exprience" },
    { "data": "salary" },
    { "data": "gender" },
    { "data": "benefit" },
    { "data": "action" },

];
const param = {
    trash: "0",
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
    category_id:()=>{return JobC.GetCategoryId();}
};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}

DtClass.ClickTable("updateImage",(data)=>{
    imageShow(data.id,"job/getData")
})

DtClass.ClickTable("AddToTopList",(data)=>{
    ShowAddTop(data.id, "job");
})

DtClass.ClickTable("remove",(data)=>{
    resetForm("frmRemove", false)
    let modal = "modalRemove";
    let url = "job/remove";
    
    removeBtn.dataset.rmoveid = data.id;
    removeBtn.dataset.action = url;
    $("#" + modal).modal("show"); 
})

DtClass.ClickTable("view",(data)=>{
    JobC.ViewInfo("job/getData",{idSearch:data.id},()=>{$("#ModalView").modal("show")})
})

removeBtn.onclick = () => {

    JobC.Remove(removeBtn,"job/updateJob",()=>{
        DtClass.Refresh();
        resetForm("frmRemove", false);
    })

}

BtnDeleteImage.onclick = () => {
    RemoveImage("job/deleteImage");
    setTimeout(() => {
        DtClass.Refresh()
    }, 1000);
}

BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage,"job/updateImage");
    setTimeout(() => {
        DtClass.Refresh()
    }, 1000);
}

DtClass.ClickTable("SendAdmin",(data)=>{
    SwalRemoveFetch("job/updateJob",{idSearch:data.id,send_admin:"1"},()=>{
        DtClass.Refresh()
    },"Are you sure?","","info","Ok","",false);
})

fileInput("fileinputs");
