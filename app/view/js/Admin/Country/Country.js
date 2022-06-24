import { RefreshTable, setDataTable } from "../../DataTable.js";
import { Fetching } from "../../Fetch/Common.js";

import { resetForm, SendDataForm } from "../../functions/Common.js";

import { SwalRemoveFetch } from "../../functions/SwalDelete.js";
import { ResetWithoutCategory } from "../Confirm/view/Common.js";


const Name = document.getElementById("name");
const SortName = document.getElementById("sort_name");
const NameE = document.getElementById("name_e");
const SortE = document.getElementById("sort_name_e");
const BtnModalAdd = document.getElementById("btnModalAdd");
const addNewBtn = document.getElementById("addNewBtn");
const EditBtn = document.getElementById("btnModalEdit");
const Search = document.getElementById("searchbtn");
const Resets = document.getElementById("reset");
const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "sortName" },
    { "data": "phoneCode" },
    { "data": "action" },

];
const param = {

    idSearch: () => { return $("#idSearchs").val() },
    name: () => { return $("#titlese").val() },


};
setDataTable("datatable", "countryTable/get_all", param, column);

Search.onclick = () => {
    RefreshTable();
}

Resets.onclick = () => {
    ResetWithoutCategory();
}

addNewBtn.onclick = () => {
    resetForm("addFrm", false);
    $("#ModalAdd").modal("show");
}

const ResettingAdd = () => {
    let modal = BtnModalAdd.dataset.id;
    RefreshTable();
    $("#" + modal).modal("hide");
}

BtnModalAdd.onclick = () => {
    SendDataForm(BtnModalAdd,
        "addFrm", "country/addNew",
        [Name, SortName],
        [],
        false,
        ResettingAdd,
        false);

}

const ResettingEdit = () => {
    let modal = EditBtn.dataset.id;
    RefreshTable();
    $("#" + modal).modal("hide");
}

EditBtn.onclick = () => {
    SendDataForm(EditBtn,
        "editFrm", "country/updateCountry",
        [NameE, SortE],
        [],
        false,
        ResettingEdit,
        false);
}

const Remove = (id) => {
    SwalRemoveFetch("country/remove", { idSearch: id }, RefreshTable, "Are you sure?", "", "warning", "Your data is safe!");
}

const ShowModalEdit = (id) => {

    Fetching("country/get", { idSearch: id }).then((data) => {
        $("#ModalEdit").modal("show");
        let d = data.data.data[0]
        $("#name_e").val(d.name);
        $("#idSearch").val(d.id);
        $("#sort_name_e").val(d.sort_name);
        $("#phone_code_e").val(d.phone_code);
    })
}
/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {
        case "update": {
            ShowModalEdit(data.id)
            break;
        }


        case "remove": {
            Remove(data.id);
            break;
        }
    }

});



