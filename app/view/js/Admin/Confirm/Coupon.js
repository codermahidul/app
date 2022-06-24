import { ShowAddTop } from "../../BusinessDashboard/AddingTop.js";
import { RefreshTable, setDataTable } from "../../DataTable.js";
import { block, unblock } from "../../functions/Block.js";
import { SaveNoteAdmin } from "../Note/Note.js";
import { ConfirmData, RejectData } from "./common.js";
import { HomeShowAction, HomeShows } from "./HomeShow.js";

import { ResetWithoutCategory } from "./view/Common.js";



const Search = document.getElementById("searchbtn");
const ResetBtn = document.getElementById("reset");
const ModalNote=$("#ModalAddNote");
const SaveNoteBtn=document.getElementById("btnModalAddNote");

const saveHomeShowBtn=document.getElementById("saveHomeShowBtn");

const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "user_name" },
    { "data": "amount" },
    { "data": "type" },
    { "data": "link" },
    { "data": "product" },
    { "data": "expire" },
    { "data": "description" },
    { "data": "status" },
    { "data": "created_at" },
    { "data": "home_show" },
    { "data": "action" },

];
const param = {
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
    name: () => { return $("#name").val() },
    email: () => { return $("#email").val() },
    created_at_from: () => { return $("#created_at_from").val() },
    created_at_to: () => { return $("#created_at_to").val() },
    admin_confirm: () => { return $("#admin_confirm").val() },
    trash: () => { return $("#trash").val() },

};

setDataTable("datatable", "couponTableAdmin/get_all", param, column);

Search.onclick = () => {
    RefreshTable();
}

/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {

        case "confirm": {
            ConfirmData("coupon/confirmCoupon", { idSearch: data.id, admin_confirm: 1 },RefreshTable);

            break;
        }
        case "reject": {
            
            RejectData("coupon/confirmCoupon", { idSearch: data.id, admin_confirm: 0 },RefreshTable);
            break
        }
        case "note":{
            ModalNote.modal("show");
            $("#itemid").val(data.id);
            $("#to_user").val(data.user);
            $("#text").val("")
            break;
        }

        case "top":{
            //TopShows(data.id);
            ShowAddTop(data.id,'coupon',true)
            break;
        }

        case "home":{
            HomeShows(data.id);
            break;
        }
    }

});



ResetBtn.onclick = () => {
    ResetWithoutCategory(RefreshTable);
}

SaveNoteBtn.onclick=()=>{
    let id=SaveNoteBtn.dataset.id;
    block();
    SaveNoteAdmin("noteFromAdmin",$("#itemid").val(),"coupon",$("#text").val(),$("#to_user").val(),()=>{
        unblock();
        RefreshTable();
        $("#"+id).modal("hide");
    });
}

saveHomeShowBtn.onclick =()=>{
    HomeShowAction("fetchdata/removehomeshow",{type_table:"coupon"},"user_business")
}
