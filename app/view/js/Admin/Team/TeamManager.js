import { RefreshTable, setDataTable } from "../../DataTable.js";
import { CreateSelectOption, Fetching } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";
import { fileInput, resetForm, SendDataForm, setSelectsClass, setSelectsClassModal } from "../../functions/Common.js";
import { ResetUser } from "../Confirm/view/Common.js";
import { TopShowAction, TopShows } from "../Confirm/TopShow.js";
import { imageShow, RemoveImage, SetImages } from "../../BusinessDashboard/Product/ProductImage.js";
import { GalleryImageShow, SetImageGallery } from "../../BusinessDashboard/Product/ImageGallery.js";
import getObjFormData from "../../functions/ObjectFormData.js";
import { URLPATH } from "../../Fetch/Setting.js";

let Comm=await import("./Common.js?v="+Date.now());


const GetLinkValue=Comm.GetLinkValue;
const ShowEdit=Comm.ShowEdit;

const Resets = document.getElementById("reset");
const Fname = document.getElementById("fname");
const FnameE = document.getElementById("fname_e");
const LnameE = document.getElementById("lname_e");
const Lname = document.getElementById("lname");
const EmailE = document.getElementById("email_e");
const Email = document.getElementById("email");
const TimezoneE = document.getElementById("timezone_e");
const Timezone = document.getElementById("timezone");
const PasswordE = document.getElementById("password_e");
const Password = document.getElementById("password");
const SaveTopShowBtn = document.getElementById("saveTopShowBtn");
const addNewBtn = document.getElementById("addNewBtn");
const BtnModalAdd = document.getElementById("btnModalAdd");
const BtnEdit = document.getElementById("btnModalEdit");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");
const BtnSaveEditImage = document.getElementById("BtnEditImage");
const BtnSaveGalleryImage = document.getElementById("btnaddimagegallery");
const removeBtn = document.getElementById("removeBtn");



let index = 2;
const Search = document.getElementById("searchbtn");
const column = [
    { "data": "id" },
    { "data": "user_name" },
    { "data": "email" },
    { "data": "activity" },
    { "data": "public" },
    { "data": "Disabled" },
    { "data": "action" },

];
const param = {
    trash: () => { return $("#trashSearch").val() },
    idSearch: () => { return $("#idSearchs").val() },
    email: () => { return $("#emails").val() },
    fname: () => { return $("#fnames").val() },
    lname: () => { return $("#lnames").val() },
    telephone: () => { return $("#telephone").val() },
};


setDataTable("dataTable", "teamManagerTableAdmin/get_all", param, column);

Search.onclick = () => {
    RefreshTable();
}

Resets.onclick = () => {
    ResetUser(RefreshTable);
}



addNewBtn.onclick = () => {
    resetForm("addNewForm", false);

    $("#ModalAdd").modal("show");
}

const Refresh = () => {
    RefreshTable();
    let data = BtnModalAdd.dataset;
    let modal = data.id;
    $("#" + modal).modal("hide");
    $("#more_link").html("");
    AddMoreLink.click();
}

BtnModalAdd.onclick = () => {

    SendDataForm(BtnModalAdd,
        "addNewForm", "team/addTeam",
        [Timezone,Fname, Lname, Email, Password],
        [
            { name: "team_link", value: GetLinkValue() },

        ],
        false,
        Refresh,
        false);
}

 const ShowModalEdit = (id) => {

    ShowEdit(id);
}

const RefreshEdit = () => {
    RefreshTable();
    let data = BtnEdit.dataset;
    let modal = data.id;
    $("#" + modal).modal("hide")
}

BtnEdit.onclick = () => {

    SendDataForm(BtnEdit,
        "editForm", "team/updateTeamAdmin",
        [TimezoneE,FnameE, LnameE, EmailE, PasswordE],
        [
            { name: "team_link", value: GetLinkValue(true) },
        ],
        false,
        RefreshEdit,
        false);

}

BtnDeleteImage.onclick = () => {
    RemoveImage("team/deleteImageAdmin");
}

BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage, "team/updateImageAdmin");
}

BtnSaveGalleryImage.onclick = () => {
    SetImageGallery(BtnSaveGalleryImage, "team/updateImageGalleryAdmin");
}

const Remove = (id) => {

    resetForm("frmRemove", false)
    let modal = "modalRemove";
    let url = "team/removeAdmin";

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
        action = "team/updateTeamAdmin";
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






$('#m_table_1 tbody').on('click', 'a', function (e) {
    let data = e.currentTarget.dataset;
    switch (data.action) {
        case "top": {
            TopShows(data.id);
            break;
        }

        case "update": {
            ShowModalEdit(data.id)
            break;
        }

        case "updateImage": {
            imageShow(data.id, "team/get")
            break;
        }

        case 'addGalleryImage': {
            GalleryImageShow(data.id, "team/getGallery", "team/deleteImageGalleryAdmin");
            break;
        }

        case "remove": {

            Remove(data.id);
            break;
        }

    }

});

// SaveTopShowBtn.onclick=()=>{
//     TopShowAction("fetchdata/removetopshow",{type_table:"user"})
// }

fileInput("fileinputs");
CreateSelectOption(
    { url: URLPATH + "fetchData/getTimeZone", params: { } },
    { id: "timezone", value: "id", title: "name" },
    false,
    ()=>{}
  );
  CreateSelectOption(
    { url: URLPATH + "fetchData/getTimeZone", params: { } },
    { id: "timezone_e", value: "id", title: "name" },
    false,
    ()=>{}
  );
  //setSelectsClass("select2","Select one","ModalAdd");
  //setSelectsClassModal("select2","Select one","ModalEdit");