import { RefreshTable, setDataTable } from "../../DataTable.js";
import { CreateSelectOption, Fetching, FetchingFile } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";
import { EmptyIdsParent, EmptyParent, fetchCat, SetCatParam } from "../../functions/Category.js";
import checkValue from "../../functions/Checked.js";
import { fileInput, resetForm, setSelectsClassModal } from "../../functions/Common.js";
import getObjFormData from "../../functions/ObjectFormData.js";
import { imageShow, RemoveImage, SetImages } from "./ProductImage.js";
import { GalleryImageShow, SetImageGallery } from "./ImageGallery.js";
import { ShowInfoDataDiv } from "./ProductView.js";

import { GetCatId, GetCatIdParent, ResetMoreCat, ShowEditCat } from "./MoreCategory.js";
import { GetCity, GetCountry, GetProvince, SetVal } from "./City.js";
import { ShowAddTop } from "../AddingTop.js";


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

let index = 2;
const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "category_name" },
    { "data": "price" },
    // { "data": "Disabled" },
    { "data": "action" },

];
const param = {
    trash: "0",
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
    order:()=>{return 'product.id'}
};


///datatble
setDataTable("datatable", "producttable/get_all", param, column);
fileInput("fileinputs");
////show catedory list



Search.onclick = () => {
    RefreshTable();
}

const GetLinkValue = (edit = false) => {
    let vals = "";

    for (let i = 1; i < index; i++) {
        let t = "ltitle";
        let ta = "ltag";
        let typ = "ltype";
        if (edit) {
            t = "ltitle_e";
            ta = "ltag_e";
            typ = "ltype_e";
        }

        let title = $("#" + t + i).val();
        let tags = $("#" + ta + i).val();
        let types = $("#" + typ + i).val();
        if (i < (index - 1)) {
            vals += title + "::" + tags + "::" + types + ','
        } else
            vals += title + "::" + tags + "::" + types

    }

    return vals;
}








BtnDeleteImage.onclick = () => {
    RemoveImage();
}

BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage);
}

BtnSaveGaleryImage.onclick = () => {
    SetImageGallery(BtnSaveGaleryImage);
}

const Remove = (id) => {

    resetForm("frmRemove", false)
    let modal = "modalRemove";
    let url = "product/remove";

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

/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {
    
        case "updateimage": {
            imageShow(data.id)
            break;
        }

        case "view": {

            ShowInfoDataDiv(data.id)
            break;
        }

        case 'addgalleryimage': {
            GalleryImageShow(data.id);
            break;
        }

        case "remove": {

            Remove(data.id);
            break;
        }

     case "AddToTopList":{

        ShowAddTop(data.id,"product");
        break;
     }   
        
    }

});

