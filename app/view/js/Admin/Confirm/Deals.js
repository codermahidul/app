import { ShowAddTop } from "../../BusinessDashboard/AddingTop.js";
import { RefreshTable, setDataTable } from "../../DataTable.js";
import { Fetching } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";
import { SendDataForm } from "../../functions/Common.js";
import { SaveNoteAdmin } from "../Note/Note.js";
import { ConfirmData, RejectData } from "./common.js";
import { HomeShowAction, HomeShows } from "./HomeShow.js";

import { ResetWithoutCategory } from "./view/Common.js";



const Search = document.getElementById("searchbtn");
const ResetBtn = document.getElementById("reset");
const ModalNote=$("#ModalAddNote");
const SaveNoteBtn=document.getElementById("btnModalAddNote");
const BtnModalAddPresent=document.getElementById("btnModalAddPresent");
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
    send_admin:()=>{return '1';}

};

setDataTable("datatable", "couponTableAdmin/get_all_deals", param, column);

Search.onclick = () => {
    RefreshTable();
}

/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {

        case "confirm": {
            ConfirmData("deals/confirmDeals", { idSearch: data.id, admin_confirm: 1 },RefreshTable);

            break;
        }
        case "reject": {
            
            RejectData("deals/confirmDeals", { idSearch: data.id, admin_confirm: 0 },RefreshTable);
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
            ShowAddTop(data.id,'deals',true)
            break;
        }

        case "percent":{

            GetPresent(data.id)
            break;
        }

        case "home":{
            HomeShows(data.id);
            break;
        }
    }

});

const GetDataInfo=(id)=>{
    block()
    return new Promise(resolve=>{
        Fetching("deals/get",{idSearch:id}).then((data)=>{unblock();resolve(data)});
    }) 

}

async function GetPresent(id){
    
    let result=await GetDataInfo(id);
    console.log(result);
    $("#ModalAddPresent").modal("show");
    $("#percent").val(result.data.data[0].percent)
    $("#deals_id").val(id);
}

BtnModalAddPresent.onclick=()=>{
    SendDataForm(BtnModalAddPresent,"frmPercent","deals/updateDealsPresentAdmin",[],
    [{name:"idSearch",value:$("#deals_id").val()}],false,()=>{
        $("#ModalAddPresent").modal("hide");

    },false)
}

ResetBtn.onclick = () => {
    ResetWithoutCategory(RefreshTable);
}

SaveNoteBtn.onclick=()=>{
    let id=SaveNoteBtn.dataset.id;
    block();
    SaveNoteAdmin("noteFromAdmin",$("#itemid").val(),"deals",$("#text").val(),$("#to_user").val(),()=>{
        unblock();
        RefreshTable();
        $("#"+id).modal("hide");
    });
}

saveHomeShowBtn.onclick =()=>{
    HomeShowAction("fetchdata/removehomeshow",{type_table:"deals"},"user_business")
}
