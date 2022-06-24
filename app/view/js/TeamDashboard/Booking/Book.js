import { SwalRemoveFetch } from "../../functions/SwalDelete.js";

let DataTables= await import('../../Class/DataTable.js?v='+Date.now());

const DataTable=DataTables.DataTable;
const DtClass=new DataTable("dataTable","teamBookingTable/get_all");

const Search=document.getElementById("searchbtn");

const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "date" },
    { "data": "studio" },
    { "data": "action" },

];
const param = {
    trash: "0",
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
   
};

DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}

DtClass.ClickTable("remove",(data)=>{
    let idSearch=data.id;
    SwalRemoveFetch("team/removeBooking",{idSearch},()=>{DtClass.Refresh()}, "Are you sure?", "", "warning", "Your data is safe!");
   
})