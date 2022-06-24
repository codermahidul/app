import { CreateSelectOption } from "../../Fetch/Common.js";
import { URLPATH } from "../../Fetch/Setting.js";
import { GetIdFromUrl,SendDataForm } from "../../functions/Common.js";



let DataTables= await import('../../Class/DataTable.js?v='+Date.now());



const DataTable=DataTables.DataTable;



const DtClass=new DataTable("dataTable","jobTable/get_all_resume_admin");

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
    display_name: () => { return $("#titlese").val() },
    job_id:()=>{return GetIdFromUrl()},
    status:()=>{return $("#statusS").val()}
    
};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}

DtClass.ClickTable("update",data=>{
    
    let d=data.id.split(",");
    $("#idSearch").val(d[0]);
    $("#ModalStatus").modal("show")
})

if(BtnStatus !==null)
{
    BtnStatus.onclick=()=>{
        SendDataForm(BtnStatus,"statusFrm","job/changeStatus",[Status],[],false,
        ()=>{
            $("#ModalStatus").modal("hide")
            DtClass.Refresh();
        },false)
    }
}

CreateSelectOption(
    { url: URLPATH + "fetchData/jobStatus", params: {  } },
    { id: "status", value: "id", title: "title" },
    false,
    ""
  );

  
CreateSelectOption(
    { url: URLPATH + "fetchData/jobStatus", params: {  } },
    { id: "statusS", value: "id", title: "title" },
    false,
    ""
  );
  






