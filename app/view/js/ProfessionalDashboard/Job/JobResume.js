import { CreateSelectOption } from "../../Fetch/Common.js";
import { URLPATH } from "../../Fetch/Setting.js";
import { GetIdFromUrl,SendDataForm } from "../../functions/Common.js";



let DataTables= await import('../../Class/DataTable.js?v='+Date.now());



const DataTable=DataTables.DataTable;



const DtClass=new DataTable("dataTable","jobTable/get_all_my_resume");

const Search=document.getElementById("searchbtn");

const BtnStatus = document.getElementById("btnStatus");
const Status=document.getElementById("status")

const column = [
    { "data": "id" },
    { "data": "display_name" },
    { "data": "created_at" },
    { "data": "status" },
    
    

    { "data": "action" },

];
const param = {
    trash: "0",
    idSearch: () => { return $("#idSearchs").val() },
    status: () => { return $("#status").val() },
   
};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}




CreateSelectOption(
    { url: URLPATH + "fetchData/jobStatus", params: {  } },
    { id: "status", value: "id", title: "title" },
    false,
    ""
  );








