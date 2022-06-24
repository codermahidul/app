import { RefreshTable, setDataTable } from "../../DataTable.js";
import { Fetching, FetchingFile } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";
import checkValue from "../../functions/Checked.js";
import { fileInput, resetForm, SendDataForm } from "../../functions/Common.js";
import getObjFormData from "../../functions/ObjectFormData.js";
import { ShowAddTop } from "../AddingTop.js";
import { imageShow, RemoveImage, SetImages } from "./PrizeImage.js";
import { ShowInfoDataDiv } from "./PrizeView.js";


const Search = document.getElementById("searchbtn");
const AddNewBtn = document.getElementById("addNewBtn");
const BtnSaveNew = document.getElementById("btnaddnew");
const SaveEdit = document.getElementById("btnSaveEdit");
const AddModal = $("#ModalAdd");

const title = document.getElementById("title");
const title_e = document.getElementById("title_e");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");
const BtnSaveEditImage = document.getElementById("BtnEditImage");
const removeBtn = document.getElementById("removeBtn");



const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "jvalues" },
    // { "data": "Disabled" },
    { "data": "action" },

];
const param = {
    trash: "0",
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
};


///datatble
setDataTable("datatable", "prizetable/get_all", param, column);
fileInput("fileinputs");



Search.onclick = () => {
    RefreshTable();
}


AddNewBtn.onclick = () => {
    AddModal.modal("show");
}

BtnSaveNew.onclick = () => {
    if (!checkValue(title)) {
        return false;
    }

    let modal = BtnSaveNew.dataset.id;

    block();

    let form_data = new FormData();
    form_data.append('title', $("#title").val());
    form_data.append('description', $("#description").val());
    form_data.append('jvalues', $("#jvalues").val());
    form_data.append('jnumber', $("#jnumber").val());
    form_data.append('img', $('#main_image')[0].files[0]);


    FetchingFile("prize/newprize", form_data).then((data) => {
        unblock();
        resetForm("addnewfrm", false);
        RefreshTable();

        if (data.status === "true") {
            toast("successful", "success");
            $("#" + modal).modal("hide");
        } else {
            toast(data.err, "error");
        }
    })
}



const ShowModalEdit = (id) => {

    Fetching("prize/getData", { idSearch: id }).then((data) => {
        $("#ModalEdit").modal("show");
        let d = data.data.data[0]
        $("#title_e").val(d.title);
        $("#idSearch").val(d.id);
        $("#description_e").val(d.description);
        $("#jvalues_e").val(d.jvalues);
        $("#jnumber_e").val(d.jnumber);
        
        if (d.trash === "1")
            $("#trash2").prop('checked', true);
        else
            $("#trash").prop('checked', true);

    })
}

const Resets = () => {
    let data = SaveEdit.dataset;
    let modal = data.id;
    unblock();
    RefreshTable();
    $("#" + modal).modal("hide")
}

SaveEdit.onclick = () => {
    block();
    SendDataForm(SaveEdit, "frmEdit", "prize/updateprize", [title_e], [], true, Resets,false);
}

BtnDeleteImage.onclick = () => {
    RemoveImage();
}

BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage);
}



const Remove = (id) => {

    resetForm("frmRemove", false)
    let modal = "modalRemove";
    let url = "prize/remove";

    removeBtn.dataset.rmoveid = id;
    removeBtn.dataset.action = url;
    $("#" + modal).modal("show");

}

removeBtn.onclick = () => {

    block();
    let data = removeBtn.dataset;
    let rmoveid = data.rmoveid
    let id = data.id
    let action = data.action
    let formData = getObjFormData("frmRemove");
    formData = { ...formData, ...{ 'idSearch': rmoveid } };
    if (formData.delete_type === "disabled") {
        action = "prize/updateprize";
        formData = { 'idSearch': rmoveid, "trash": "1" };
    }

    Fetching(action, formData).then((data) => {
        if (data.status === "true") {
            $("#" + id).modal("hide");
            toast("successful", "success");
            RefreshTable();
            resetForm("frmRemove", false);
        } else {
            toast(data.err, "error");
        }

        unblock();
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
            imageShow(data.id)
            break;
        }

        case "view": {

            ShowInfoDataDiv(data.id)
            break;
        }



        case "remove": {

            Remove(data.id);
            break;
        }

        case "AddToTopList":{

            ShowAddTop(data.id,"prize");
            break;
         } 
    }

});