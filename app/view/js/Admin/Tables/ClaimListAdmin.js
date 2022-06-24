import { SwalRemoveFetch } from "../../functions/SwalDelete.js";


let DataTables= await import('../../Class/DataTable.js?v='+Date.now());

const DataTable=DataTables.DataTable;

const DtClass=new DataTable("dataTable","claimTable/get_all");

const Search=document.getElementById("searchbtn");

const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "type" },
    { "data": "display_name" },
    { "data": "email" },
    { "data": "description" },
    { "data": "files" },
    { "data": "action" },

];
const param = {
    trash: "0",
    idSearch: () => { return $("#idSearchs").val() },
    display_name: () => { return $("#titlese").val() },
    table:()=>{return $("#table").val()},
    accept:()=>{return '0'},
};


DtClass.CreateDataTable(param,column);

// Search.onclick=()=>{
//     DtClass.Refresh();
// }


DtClass.ClickTable("accept",(data)=>{

    
    let d=data.id.split(",");
    let param={
        idSearch:d[0],
        items_id:d[1],
        items_type:d[2],
    }
    SwalRemoveFetch("claim/accept", param, DtClass.Refresh, "Are you sure?", "", "info", "Ok!","",false,"Transferred");

})



