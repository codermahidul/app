
import { SwalRemoveFetch } from "../functions/SwalDelete.js";

let DataTables= await import('../Class/DataTable.js?v='+Date.now());
let Message= await import('./MessageClass.js?v='+Date.now());



const DataTable=DataTables.DataTable;
const MessageClass=Message.MessageClass;

const DtClass=new DataTable("dataTable","messageTable/get_all_send");
const MC=new MessageClass("result_msg");

const Search=document.getElementById("searchbtn");
const btnAddMessage=document.getElementById("btnAddMessage");

const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "txt" },
    { "data": "date" },
    { "data": "action" },

];
const param = {
    trash_me_from: "0",
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}

btnAddMessage.onclick=()=>{
    MC.AddTxt(btnAddMessage,"userBusinessAction/AddTxtExist","addMsg",()=>{
        MC.EmptyDiv();
        MC.GetData("userBusinessAction/GetMessageTxt",{idSearch:$("#message_id").val()},()=>{})
    })
}

DtClass.ClickTable("view",(data)=>{
    $("#message_id").val(data.id);
    $("#to_user").val(data.to_user);

    MC.EmptyDiv();
    MC.GetData("userBusinessAction/GetMessageTxt",{idSearch:data.id},()=>{$("#ModalView").modal("show")})
})






