import { RefreshTable, setDataTable } from "../../DataTable.js";
import { CreateSelectOption, Fetching } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";

import { fileInput, resetForm, SendDataForm, tokenizAjaxPrize, tokenizClear, tokenizClearById, tokenizSetValue } from "../../functions/Common.js";
import getObjFormData from "../../functions/ObjectFormData.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";



const Search = document.getElementById("searchbtn");
const AddNewBtn = document.getElementById("addNewBtn");
const BtnSaveNew = document.getElementById("btnModalAdd");
const SaveEdit = document.getElementById("btnSaveEdit");
const AddModal = $("#ModalAdd");

const title = document.getElementById("title");
const number_donations = document.getElementById("number_donations");
const type = document.getElementById("type");
const date_donation = document.getElementById("date_donation");

const title_e = document.getElementById("title_e");
const number_donations_e = document.getElementById("number_donations_e");
const type_e = document.getElementById("type_e");
const date_donation_e = document.getElementById("date_donation_e");

const removeBtn = document.getElementById("removeBtn");



const column = [
    { "data": "id" },
    { "data": "prize_title" },
    { "data": "number_donations" },
    { "data": "date_donation" },
    { "data": "action" },

];
const param = {
    trash:()=>{return $("#trashSearch").val()},
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
};


///datatble
setDataTable("datatable", "adminPrizeTable/get_all_prize_date", param, column);
tokenizAjaxPrize("prize-search", false, "prize/get", {jnumber_big:"0",trash:"0",admin_confirm:'1'}, "title", "1");

Search.onclick = () => {
    RefreshTable();
}


AddNewBtn.onclick = () => {
    AddModal.modal("show");
}


const ResettingAdd = () => {
    let modal = BtnSaveNew.dataset.id;
    RefreshTable();
    $("#" + modal).modal("hide");
    tokenizClearById("prize_id");
}

BtnSaveNew.onclick = () => {

    if($("#prize_id").val().toString()==='')
    {
        toast("choose Prize", "error");
        return false;
    }
    SendDataForm(BtnSaveNew,
        "addFrm", "prize/addPrizeDateAdmin",
        [ number_donations, date_donation],
        [{ name: "prize_id", value: $("#prize_id").val().toString() }],
        false,
        ResettingAdd,
        false);

}






/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {


        case "remove": {

            SwalRemoveFetch("prize/deletePrizeDate",{idSearch:data.id},RefreshTable,"Are you sure?", "", "warning", "Your data is safe!")
            break;
        }
    }

});