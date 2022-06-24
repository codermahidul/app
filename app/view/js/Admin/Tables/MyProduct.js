import { RefreshTable, setDataTable } from "../../DataTable.js";
import { Fetching, FetchingFile } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";
import checkValue from "../../functions/Checked.js";
import { fileInput, resetForm } from "../../functions/Common.js";
import getObjFormData from "../../functions/ObjectFormData.js";
import { imageShow, RemoveImage, SetImages } from "../../BusinessDashboard/Product/ProductImage.js";
import { GalleryImageShow, SetImageGallery } from "../../BusinessDashboard/Product/ImageGallery.js";
import { ShowInfoDataDiv } from "../../BusinessDashboard/Product/ProductView.js";
import { Reset2 } from "../Confirm/view/Common.js";
import { fetchCatSearch, SetCatParamSearch } from "../../functions/CategorySearch.js";
import { GetCatId, GetCatIdParent, ResetMoreCat, ShowEditCat } from "../../BusinessDashboard/Product/MoreCategory.js";
import { GetCity, GetCountry, GetProvince, SetVal } from "../../BusinessDashboard/Product/City.js";

const ModalCat = $("#modalCategory");
const IDCatDiv = "category_data";
const TYPECat = "product";
const Search = document.getElementById("searchbtn");
const AddNewBtn = document.getElementById("addNewBtn");
const BtnSaveNew = document.getElementById("btnaddnew");
const SaveEdit = document.getElementById("btnSaveEdit");
const AddModal = $("#ModalAdd");


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
    order: () => { return 'product.id' },
};


///datatble
setDataTable("datatable", "adminProductTable/get_all", param, column);
fileInput("fileinputs");
////show catedory list


const show_more_link = (str) => {
    if (str === null || str === '') {
        $("#ltitle_e1").val("")
        $("#ltag_e1").val("")
        $("#ltype_e1").val("")
        return false;
    }
    let data = str.split(",");
    for (let i = 0; i < data.length; i++) {
        let d = data[i].split("::");
        if ((i + 1) > 1)
            AddMoreLinkE.click();

        $("#ltitle_e" + (i + 1)).val(d[1])
        $("#ltag_e" + (i + 1)).val(d[2])
        $("#ltype_e" + (i + 1)).val(d[3])

    }
}
/////set data for category selected

Search.onclick = () => {
    RefreshTable();
}




BtnDeleteImage.onclick = () => {
    RemoveImage("product/deleteimageadmin");
}

BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage, "product/updateImageAdmin");
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
            imageShow(data.id, "product/getDataAdmin")
            break;
        }

        case "view": {

            ShowInfoDataDiv(data.id, "product/getDataAdmin")
            break;
        }

        case 'addgalleryimage': {
            GalleryImageShow(data.id, "product/getGallery", "product/deleteImageGalleryAdmin");
            break;
        }

        case "remove": {

            Remove(data.id);
            break;
        }
    }

});