import { RefreshTable, setDataTable } from "../../DataTable.js";
import { Fetching, FetchingFile } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";
import { EmptyIdsParent, EmptyParent, fetchCat, SetCatParam } from "../../functions/Category.js";
import checkValue from "../../functions/Checked.js";
import { fileInput, GetIdFromUrl, resetForm } from "../../functions/Common.js";
import getObjFormData from "../../functions/ObjectFormData.js";
import { imageShow, RemoveImage, SetImages } from "../../BusinessDashboard/Product/ProductImage.js";
import { GalleryImageShow, SetImageGallery } from "../../BusinessDashboard/Product/ImageGallery.js";
import { ShowInfoDataDiv } from "../../BusinessDashboard/Product/ProductView.js";
import { Reset2 } from "../Confirm/view/Common.js";
import { fetchCatSearch, SetCatParamSearch } from "../../functions/CategorySearch.js";
import { GetCatId, GetCatIdParent, ResetMoreCat, ShowEditCat } from "../../BusinessDashboard/Product/MoreCategory.js";
import { GetCity, GetCountry, GetProvince, SetVal } from "../../BusinessDashboard/Product/City.js";



const Search = document.getElementById("searchbtn");
const AddNewBtn = document.getElementById("addNewBtn");
const BtnSaveNew = document.getElementById("btnaddnew");
const SaveEdit = document.getElementById("btnSaveEdit");
const AddModal = $("#ModalAdd");

const ModalCat = $("#modalCategory");
const IDCatDiv = "category_data";
const TYPECat = "product";

const title = document.getElementById("title");
const title_e = document.getElementById("title_e");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");
const BtnSaveEditImage = document.getElementById("BtnEditImage");
const BtnSaveGaleryImage = document.getElementById("btnaddimagegallery");
const removeBtn = document.getElementById("removeBtn");
const AddMoreLink = document.getElementById("add_more_links");
const AddMoreLinkE = document.getElementById("add_more_links_e");
const Resets = document.getElementById("reset");
const CategoryBoxSearch = document.getElementById("categorysearch_id");
const Reseating = document.getElementById("reset");


let index = 2;
const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "category_name" },
    { "data": "price" },
    { "data": "Disabled" },
    { "data": "action" },

];
const param = {
    trash: () => { return $("#trashSearch").val() },
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
    category_id: () => { return $("#categorys_id").val() },
    userIdSearch: () => { return GetIdFromUrl(); }
};


///datatble
setDataTable("datatable", "adminProductTable/get_all_user", param, column);
fileInput("fileinputs");
////show catedory list


Reseating.onclick = () => {
    Reset2(CategoryBoxSearch, RefreshTable);
}


/////set data for category selected

Search.onclick = () => {
    RefreshTable();
}




BtnDeleteImage.onclick = () => {
    RemoveImage("product/deleteimageadmin", true);
}

BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage, "product/updateImageAdmin", true);
}

BtnSaveGaleryImage.onclick = () => {
    SetImageGallery(BtnSaveGaleryImage, "product/updateimagegallery");
}

const Remove = (id) => {

    resetForm("frmRemove", false)
    let modal = "modalRemove";
    let url = "product/removeAdmin";

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
        action = "product/updateproduct";
        formData = { 'idSearch': rmoveid, "trash": "1", "for_user": "1" };
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

Resets.onclick = () => {
    Reset2(CategoryBoxSearch, RefreshTable);
}

CategoryBoxSearch.onclick = () => {

    fetchCatSearch({ type: "product", parent: "0" }, "0");
}

const SetDataSearch = (data) => {

    ModalCat.modal("hide");
    CategoryBoxSearch.innerHTML = data.name
    $("#categorys_id").val(data.id)
}
SetCatParamSearch(ModalCat, IDCatDiv, TYPECat, SetDataSearch);
/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {

        case "updateimage": {
            imageShow(data.id, "product/get")
            break;
        }

        case "view": {

            ShowInfoDataDiv(data.id, "product/get")
            break;
        }

        case 'addgalleryimage': {
            GalleryImageShow(data.id, "product/getGallery", "product/deleteImageGalleryAdmin", true);
            break;
        }

        case "remove": {

            Remove(data.id,);
            break;
        }
    }

});