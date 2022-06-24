import { imageShow, RemoveImage, SetImages } from "../../BusinessDashboard/Product/ProductImage.js";
import { RefreshTable, setDataTable } from "../../DataTable.js";
import { Fetching } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";
import checkValue from "../../functions/Checked.js";
import { fileInput, resetForm, SendDataForm } from "../../functions/Common.js";
import getObjFormData from "../../functions/ObjectFormData.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";
import { ResetProof } from "../Confirm/view/Common.js";


const Title = document.getElementById("title");
const Type = document.getElementById("type");
const TitleE = document.getElementById("title_e");
const TypeE = document.getElementById("type_e");
const BtnModalAddProof = document.getElementById("btnModalAddProof");
const addNewBtn = document.getElementById("addNewBtn");
const EditBtn = document.getElementById("btnModalEditProof");
const Search = document.getElementById("searchbtn");
const Resets = document.getElementById("reset");
const BtnSaveEditImage = document.getElementById("BtnEditImage");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");

const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "type" },
    { "data": "orders" },
    { "data": "action" },

];
const param = {

    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titles").val() },
    type: () => { return $("#types").val() },

};
setDataTable("datatable", "prooftable/get_all", param, column);

Search.onclick = () => {
    RefreshTable();
}

Resets.onclick = () => {
    ResetProof(RefreshTable);
}

addNewBtn.onclick = () => {
    resetForm("addfrm", false);
    $("#ModalAddProof").modal("show");
}

const ResettingAdd = () => {
    let modal = BtnModalAddProof.dataset.id;
    RefreshTable();
    $("#" + modal).modal("hide");
}

BtnModalAddProof.onclick = () => {
    SendDataForm(BtnModalAddProof,
        "addfrm", "proof/addnew",
        [Title, Type],
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
        "editfrm", "proof/updateproof",
        [TitleE, TypeE],
        [],
        false,
        ResettingEdit,
        false);
}

BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage, "proof/updateImage");
}

BtnDeleteImage.onclick = () => {
    RemoveImage("proof/deleteImage");
}

const Remove = (id) => {
    SwalRemoveFetch("proof/remove", { idSearch: id }, RefreshTable, "Are you sure?", "", "warning", "Your data is safe!");
}

const ShowModalEdit = (id) => {

    Fetching("proof/get", { idSearch: id }).then((data) => {
        $("#ModalEditProof").modal("show");
        let d = data.data.data[0]
        $("#title_e").val(d.title);
        $("#idSearch").val(d.id);
        $("#type_e").val(d.type);
        $("#orders_e").val(d.orders);
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

        case "updateimage": {
            imageShow(data.id, "proof/get")
            break;
        }

        case "remove": {
            Remove(data.id);
            break;
        }
    }

});


fileInput("fileinputs");

