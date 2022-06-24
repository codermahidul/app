import { SwalRemoveFetch } from "../../functions/SwalDelete.js";


let DataTables= await import('../../Class/DataTable.js?v='+Date.now());

const DataTable=DataTables.DataTable;

const DtClass=new DataTable("dataTable","commentTable/get_all");

const Search=document.getElementById("searchbtn");

const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "type" },
    { "data": "text" },
    { "data": "action" },

];
const param = {
    trash: "0",
    idSearch: () => { return $("#idSearchs").val() },
    display_name: () => { return $("#titlese").val() },
    table:()=>{return $("#table").val()},
};


DtClass.CreateDataTable(param,column);

// Search.onclick=()=>{
//     DtClass.Refresh();
// }


DtClass.ClickTable("remove",(data)=>{

    SwalRemoveFetch("fetchData/removeComment", { idSearch: data.id,table:$("#table").val() }, DtClass.Refresh, "Are you sure?", "", "warning", "Your data is safe!","",true,"deleted");

})



