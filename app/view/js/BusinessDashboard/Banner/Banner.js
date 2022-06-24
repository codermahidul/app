import { RefreshTable, setDataTable } from "../../DataTable.js";
import { RemoveImage, SetImages, imageShow } from "./Image.js";
import { SendDataFormFile, fileInput, resetForm } from "../../functions/Common.js";

import { SwalRemoveFetch } from "../../functions/SwalDelete.js";

let BannerSection=await import("../../functions/BannerSection.js?v=" + Date.now());





const ChangeSection=BannerSection.ChangeSection;
const GetCatVal=BannerSection.GetCatVal;
const AddNewBtn = document.getElementById("addNewBtn");
const BtnSaveNew = document.getElementById("btnSave");
const AddModal = $("#ModalAdd");

const Section = document.getElementById("section");


const removeBtn = document.getElementById("removeBtn");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");
const BtnSaveEditImage = document.getElementById("BtnEditImage");


const column = [
    { "data": "id" },
    {"data":"image"},
    { "data": "section" },
    { "data": "calculate_type" },
    { "data": "type" },
    { "data": "link" },
    { "data": "category" },
    { "data": "program" },
    { "data": "payment" },
    { "data": "status" },
    { "data": "action" },

];
const param = {
    creator_type: $("#creator_types").val(),

};


///datatble
setDataTable("datatable", "bannerOrderTable/get_all", param, column);
fileInput("fileinputs", 'Drag & drop Image here &hellip;', ['jpg', 'png', 'jpeg', 'gif']);




AddNewBtn.onclick = () => {

    $("#more_cat").css("display", "none");
    $("#programs").css("display", "none");
    resetForm("addFrm", false);
    AddModal.modal("show");
}


const ResettingAdd = () => {
    let modal = BtnSaveNew.dataset.id;
    RefreshTable();
    $("#" + modal).modal("hide");
}

BtnSaveNew.onclick = () => {
    let online = "0";
    if ($('#online').is(":checked")) {
        online = "1";
    }


    SendDataFormFile(BtnSaveNew,
        "addFrm", "fetchData/newBannerOrder",
        [],
        [
            { name: "category_id", value: GetCatVal() },
            { name: "proof_id", value: $("#proof_id").val() },

        ],
        false,
        ResettingAdd,
        false);

}




BtnDeleteImage.onclick = () => {
    RemoveImage("fetchData/RemoveImageBannerOrder", false, { creator_type: $("#creator_types").val() });
}

BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage, "fetchData/AddImageBannerOrder", false,
        [
            { name: "creator_type", value: $("#creator_types").val() }
        ]);
}


/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {

        case "updateimage": {
            imageShow(data.id, "fetchData/GetDataBannerOrder", { creator_type: $("#creator_types").val() })
            break;
        }

        case "remove": {

            SwalRemoveFetch("fetchData/removeBannerOrder", { idSearch: data.id, creator_type: "user_business" }, RefreshTable, "Are you sure?", "", "warning", "Your data is safe!");

            break;
        }

    }

});

Section.onchange = () => {
    ChangeSection();
}