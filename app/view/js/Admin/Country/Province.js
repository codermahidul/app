import { RefreshTable, setDataTable } from "../../DataTable.js";
import { CreateSelectOption, Fetching } from "../../Fetch/Common.js";

import { resetForm, SendDataForm, setSelectsClass, setSelectsClassModal } from "../../functions/Common.js";

import { SwalRemoveFetch } from "../../functions/SwalDelete.js";
import { ResetWithoutCategory } from "../Confirm/view/Common.js";


const Name = document.getElementById("name");
const CountryId = document.getElementById("country_id");
const NameE = document.getElementById("name_e");
const CountryIdE = document.getElementById("country_id_e");
const BtnModalAdd = document.getElementById("btnModalAdd");
const addNewBtn = document.getElementById("addNewBtn");
const EditBtn = document.getElementById("btnModalEdit");
const Search = document.getElementById("searchbtn");
const Resets = document.getElementById("reset");
const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "countryName" },
    { "data": "action" },

];
const param = {

    idSearch: () => { return $("#idSearchs").val() },
    name: () => { return $("#titlese").val() },
};
setDataTable("datatable", "provinceTable/get_all", param, column);

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
        "addFrm", "province/addNew",
        [Name, CountryId],
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
        "editFrm", "province/updateProvince",
        [NameE, CountryIdE],
        [],
        false,
        ResettingEdit,
        false);
}

const Remove = (id) => {
    SwalRemoveFetch("province/remove", { idSearch: id }, RefreshTable, "Are you sure?", "", "warning", "Your data is safe!");
}

const ShowModalEdit = (id) => {

    Fetching("province/get", { idSearch: id }).then((data) => {
        $("#ModalEdit").modal("show");
        let d = data.data.data[0]
        $("#name_e").val(d.name);
        $("#idSearch").val(d.id);
        $("#country_id_e").val(d.country_id).trigger("change");
       
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



CreateSelectOption({
    url: "fetchData/country_get",
    params: { order: "sort_name", order_type: "asc", number: "300" }
},
    { id: "country_id", value: "id", title: "name" })

CreateSelectOption({
    url: "fetchData/country_get",
    params: { order: "sort_name", order_type: "asc", number: "300" }
},
    { id: "country_id_e", value: "id", title: "name" })

setSelectsClassModal("select2","","ModalAdd");
setSelectsClassModal("select2_e","","ModalEdit");