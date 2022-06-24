import { SwalRemoveFetch } from "../../functions/SwalDelete.js";
import { resetForm } from "../../functions/Common.js";

let DataTables= await import('../../Class/DataTable.js?v='+Date.now());
let Deals = await import("../../BusinessDashboard/Deals/DealsClass.js?v=" + Date.now())



const DataTable=DataTables.DataTable;
const DealClass = Deals.DealClass;
const DealsC = new DealClass("","");



const DtClass=new DataTable("dataTable","announcementTable/get_all");

const Search=document.getElementById("searchbtn");

const removeBtn = document.getElementById("removeBtn");


const column = [
    { "data": "id" },
    { "data": "description" },
    { "data": "online" },
    { "data": "all_user" },
    { "data": "users" },
    { "data": "cites" },
    {"data":"types"},
    { "data": "expire" },
  //  { "data": "action" },

];
const param = {
    trash: "0",
    idSearch: () => { return $("#idSearchs").val() },
    display_name: () => { return $("#titlese").val() },
    category_id:()=>{return DealsC.GetCategoryId();}
};


DtClass.CreateDataTable(param,column);

if(Search !==null){

    Search.onclick=()=>{
        DtClass.Refresh();
    }
    
}

DtClass.ClickTable("remove",(data)=>{
    resetForm("frmRemove", false)
    let modal = "modalRemove";
    let url = "deals/remove";
    
    removeBtn.dataset.rmoveid = data.id;
    removeBtn.dataset.action = url;
    $("#" + modal).modal("show"); 
})

DtClass.ClickTable("view",(data)=>{
    DealsC.ViewInfo("deals/getDataAdmin",{idSearch:data.id},()=>{$("#ModalView").modal("show")})
})


