
let Common=await import("../../functions/Common.js?v="+Date.now());


let DataTables= await import('../../Class/DataTable.js?v='+Date.now());


const DataTable=DataTables.DataTable;
const fileInput=Common.fileInput;
const SendDataFormFileMulti=Common.SendDataFormFileMulti;


const DtClass=new DataTable("dataTable","couponTableAdmin/get_all_shop");
const Search=document.getElementById("searchbtn");

const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "name" },
    { "data": "amount" },
    { "data": "clearing_date" },
    { "data": "files" },

];
const param = {
    clearing: "1",
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titles").val() },
    display_name: () => { return $("#nameS").val() },
    
};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}






