import { ShowInfoDataDiv } from "../../BusinessDashboard/Prize/PrizeView.js";
import { RefreshTable, setDataTable } from "../../DataTable.js";
import { block, unblock } from "../../functions/Block.js";
import { SaveNoteAdmin } from "../Note/Note.js";
import { ConfirmData, RejectData } from "./common.js";




const Search = document.getElementById("searchbtn");
const ResetBtn = document.getElementById("reset");
const ModalNote=$("#ModalAddNote");
const SaveNoteBtn=document.getElementById("btnModalAddNote");


const column = [
    { "data": "id" },
    {"data":"image"},
    { "data": "section" },
    //{ "data": "calculate_type" },
   // { "data": "type" },
    { "data": "link" },
    { "data": "category" },
    { "data": "program" },
    //{ "data": "payment" },
    {"data":"status"},
    { "data": "action" },

];
const param = {
    idSearch: () => { return $("#idSearchs").val() },
    
    payment: () =>{return "1"},
    creator_type: () =>{return $("#creator_types").val()},

};

setDataTable("datatable", "bannerOrderListAdmin/get_all", param, column);

// Search.onclick = () => {
//     RefreshTable();
// }

/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {

        case "confirm": {
            ConfirmData("fetchData/confirmBannerOrderAdmin", { idSearch: data.id, admin_confirm: 1 },RefreshTable);

            break;
        }
        case "reject": {
            
            RejectData("fetchData/confirmBannerOrderAdmin", { idSearch: data.id, admin_confirm: 0 },RefreshTable);
            break
        }
        case "note":{
            ModalNote.modal("show");
            $("#itemid").val(data.id);
            $("#to_user").val(data.user);
            $("#text").val("")
            break;
        }




    }

});



// ResetBtn.onclick = () => {
//     ResetWithoutCategory(RefreshTable);
// }

SaveNoteBtn.onclick=()=>{
    let id=SaveNoteBtn.dataset.id;
    block();
    let type="noteFromAdmin";
    if($("#creator_types").val()=="user")
    {
        type="noteFromAdminUser";  
    }
    SaveNoteAdmin(type,$("#itemid").val(),"banner_order",$("#text").val(),$("#to_user").val(),()=>{
        unblock();
        RefreshTable();
        $("#"+id).modal("hide");
    });
}


