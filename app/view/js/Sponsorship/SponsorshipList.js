import { SwalRemoveFetch } from "../functions/SwalDelete.js";

let DataTables= await import('../Class/DataTable.js?v='+Date.now());


const DataTable=DataTables.DataTable;


const DtClass=new DataTable("dataTable","sponsorshipTable/get_all_my_data");
const Search=document.getElementById("searchbtn");


const column = [
    { "data": "id" },
    { "data": "company" },
    { "data": "category" },
    { "data": "contact" },
    { "data": "mobile" },
    { "data": "fax" },
    { "data": "email" },
    { "data": "address" },
    { "data": "payment" },
   // { "data": "status" },
    { "data": "action" },

];
const param = {
    trash: "0",
    idSearch: () => { return $("#idSearchs").val() },
    company: () => { return $("#titlese").val() },
   // category_id:()=>{return DealsC.GetCategoryId();}
};


DtClass.CreateDataTable(param,column);

if(Search !==null)
{
    Search.onclick=()=>{
        DtClass.Refresh();
    }
}


DtClass.ClickTable("remove",(data)=>{
    SwalRemoveFetch("sponsorship/removeRequest", { idSearch: data.id}, DtClass.Refresh, "Are you sure?", "", "warning", "Your data is safe!");

})