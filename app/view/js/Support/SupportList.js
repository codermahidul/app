
import { CreateSelectOption } from "../Fetch/Common.js";
import { URLPATH } from "../Fetch/Setting.js";
import { fileInput } from "../functions/Common.js";

let DataTables= await import('../Class/DataTable.js?v='+Date.now());
let Support= await import('./SupportClass.js?v='+Date.now());


const DataTable=DataTables.DataTable;
const SupportClass=Support.SupportClass;

const DtClass=new DataTable("dataTable","supportTable/get_all");
const Sp=new SupportClass();

const Search=document.getElementById("searchbtn");
const btnAdd=document.getElementById("btnAdd");
const BtnSave=document.getElementById("btnSave");


const column = [
    { "data": "id" },
    { "data": "topic" },
    { "data": "priority" },
    { "data": "description" },
    { "data": "action" },

];
const param = {
    trash_me_to: "0",
    idSearch: () => { return $("#idSearchs").val() },
    topic: () => {
        return $("#topicS").val();
      },
      priority: () => {
        return $("#priorityS").val();
      },
};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}

btnAdd.onclick=()=>{
 $("#ModalAdd").modal("show")
}

BtnSave.onclick=()=>{
    Sp.AddTicket(BtnSave,"addFrm","support/addNew",()=>{
        $("#ModalAdd").modal("hide");
        DtClass.Refresh();
    })
}

DtClass.ClickTable("view",(data)=>{
    $("#message_id").val(data.id);
    $("#to_user").val(data.to_user);

})

Sp.SetProof();
fileInput("fileInput","Drag & drop file or image here &hellip;",[
    "jpg", "png", "jpeg","pdf","doc", "docx"
]);
CreateSelectOption({ url: URLPATH + "fetchData/proof_get", params: { type: "priority" } },
    { id: "priorityS", value: "id", title: "title" },
    false
  );

  CreateSelectOption(
    { url: URLPATH + "fetchData/proof_get", params: { type: "topic" } },
    { id: "topicS", value: "id", title: "title" },
    false
  );