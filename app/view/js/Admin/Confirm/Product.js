import { ConfirmData, RejectData } from "./common.js";
import { EmptyIdsParent, EmptyParent, SetCatParam, fetchCat } from "../../functions/Category.js";
import { HomeShowAction, HomeShows } from "./HomeShow.js";
import { RefreshTable, setDataTable } from "../../DataTable.js";
import { TopShowAction, TopShows } from "./TopShow.js";
import { block, unblock } from "../../functions/Block.js";

import { EmptyCatId } from "../../functions/Common.js";
import { Reset } from "./view/Common.js";
import { SaveNoteAdmin } from "../Note/Note.js";
import { ShowAddTop } from "../../BusinessDashboard/AddingTop.js";
import { ShowInfoDataDiv } from "../../BusinessDashboard/Product/ProductView.js";

const ModalCat = $("#modalCategory");
const IDCatDiv = "category_data";
const TYPECat = "product";
const CatId = [];
const CategoryBox = document.getElementById("category_id");
const Search = document.getElementById("searchbtn");
const ResetBtn = document.getElementById("reset");
const ModalNote=$("#ModalAddNote");
const SaveNoteBtn=document.getElementById("btnModalAddNote");
const SaveTopShowBtn=document.getElementById("saveTopShowBtn");
const saveHomeShowBtn=document.getElementById("saveHomeShowBtn");

const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "user_name" },
    { "data": "category_name" },
    { "data": "status" },
    { "data": "created_at" },
    { "data": "top_show" },
    { "data": "home_show" },
    { "data": "action" },

];
const param = {
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
    name: () => { return $("#name").val() },
    email: () => { return $("#email").val() },
    category_id: () => { return $("#categorys_id").val() },
    created_at_from: () => { return $("#created_at_from").val() },
    created_at_to: () => { return $("#created_at_to").val() },
    admin_confirm: () => { return $("#admin_confirm").val() },
    trash: () => { return $("#trash").val() },
    order: () => { return 'product.id' },

};

setDataTable("datatable", "producttableadmin/get_all", param, column);

Search.onclick = () => {
    RefreshTable();
}

/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {
        case "view": {
            ShowInfoDataDiv(data.id,"product/get")
            break;
        }
        case "confirm": {
            ConfirmData("product/confirmproduct", { idSearch: data.id, admin_confirm: 1 },RefreshTable);

            break;
        }
        case "reject": {
            
            RejectData("product/confirmproduct", { idSearch: data.id, admin_confirm: 0 },RefreshTable);
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
            ShowAddTop(data.id,'product',true)
            break;
        }

        case "home":{
            HomeShows(data.id);
            break;
        }
    }

});

const SetData = (data) => {

    EmptyCatId(CatId);
    $("#categorys_id").val(data.id)
    ModalCat.modal("hide");

    CategoryBox.innerHTML = data.name
}
CategoryBox.onclick = () => {
    EmptyParent()
    EmptyIdsParent();
    fetchCat({ type: "product", parent: "0" }, "0");
}
SetCatParam(ModalCat, IDCatDiv, TYPECat, SetData);

ResetBtn.onclick = () => {
    Reset(CategoryBox,RefreshTable);
}

SaveNoteBtn.onclick=()=>{
    let id=SaveNoteBtn.dataset.id;
    block();
    SaveNoteAdmin("noteFromAdmin",$("#itemid").val(),"product",$("#text").val(),$("#to_user").val(),()=>{
        unblock();
        RefreshTable();
        $("#"+id).modal("hide");

    });
}

// SaveTopShowBtn.onclick=()=>{
//     TopShowAction("fetchdata/removetopshow",{type_table:"product"},"user_business")
// }

saveHomeShowBtn.onclick =()=>{
    HomeShowAction("fetchdata/removehomeshow",{type_table:"product"},"user_business")
}