

import { block, unblock } from "../../functions/Block.js";
import { ConfirmData, RejectData } from "../Confirm/common.js";
import { SaveNoteAdmin } from "../Note/Note.js";

let DataTables = await import('../../Class/DataTable.js?v=' + Date.now());



const DataTable = DataTables.DataTable;
const ModalNote=$("#ModalAddNote");
const SaveNoteBtn=document.getElementById("btnModalAddNote");


const DtClass = new DataTable("dataTable", "businessUserManagerTableAdmin/get_all_verify");

const Search = document.getElementById("searchbtn");

const column = [
    { "data": "id" },
    { "data": "name" },
    { "data": "files" },
    { "data": "action" },

];
const param = {
    admin_confirm: "0",
    order: "id",
    idSearch: () => { return $("#idSearchs").val() },
};


DtClass.CreateDataTable(param, column);

if (Search !== null) {
    Search.onclick = () => {
        DtClass.Refresh();
    }
}

DtClass.ClickTable("confirm", (data) => {
    ConfirmData("userBusinessAction/updateVerifyFile", { idSearch: data.id, admin_confirm: 1 }, DtClass.Refresh);

})

DtClass.ClickTable("reject", (data) => {

    RejectData("userBusinessAction/updateVerifyFile", { idSearch: data.id, admin_confirm: 0 }, DtClass.Refresh);

})
DtClass.ClickTable("note", (data) => {

    ModalNote.modal("show");
    $("#itemid").val(data.id);
    $("#to_user").val(data.user);
    $("#text").val("")
})

SaveNoteBtn.onclick=()=>{
    let id=SaveNoteBtn.dataset.id;
    block();
    let type="noteFromAdmin";
    if($("#creator_types").val()=="user")
    {
        type="noteFromAdminUser";  
    }
    SaveNoteAdmin(type,$("#itemid").val()," user_business_verify ",$("#text").val(),$("#to_user").val(),()=>{
        unblock();
        DtClass.Refresh
        $("#"+id).modal("hide");
    });
}





