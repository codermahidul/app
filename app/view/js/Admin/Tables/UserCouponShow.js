import { imageShow, RemoveImage, SetImages } from "../../BusinessDashboard/Coupon/CouponImage.js";
import { RefreshTable, setDataTable } from "../../DataTable.js";
import { CreateSelectOption, Fetching } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";

import { fileInput, resetForm,tokenizAjax } from "../../functions/Common.js";
import getObjFormData from "../../functions/ObjectFormData.js";

let MoreCategoryC = await import("../../Class/MoreCategory.js?v=" + Date.now())

const MoreCategory = MoreCategoryC.MoreCategory;

const MoreCategories = new MoreCategory("coupon");
const Search = document.getElementById("searchbtn");
const SaveEdit = document.getElementById("btnSaveEdit");


const title_e = document.getElementById("title_e");
const amount_e = document.getElementById("amount_e");
const type_e = document.getElementById("type_e");
const expire_e = document.getElementById("expire_e");
const removeBtn = document.getElementById("removeBtn");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");
const BtnSaveEditImage = document.getElementById("BtnEditImage");


const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "amount" },
    { "data": "type" },
    { "data": "link" },
    { "data": "product" },
    { "data": "expire" },
    { "data": "description" },

    { "data": "action" },

];
const param = {
    trash: "0",

    order:"coupon.id",
    order_type:"desc",
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
};


///datatble
setDataTable("datatable", "adminCouponTable/get_all_user", param, column);
fileInput("fileinputs");
tokenizAjax("productsearch", false, "product/getData", {}, "title", "1");
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "discount" } }, { id: "type", value: "id", title: "title" })
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "discount" } }, { id: "type_e", value: "id", title: "title" })

Search.onclick = () => {
    RefreshTable();
}

const Remove = (id) => {

    resetForm("frmRemove", false)
    let modal = "modalRemove";
    let url = "coupon/removeAdmin";

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
    formData = { ...formData, ...{ 'idSearch': rmoveid, "for_user": "1" } };
    if (formData.delete_type === "disabled") {
        action = "coupon/updateCouponAdmin";
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

BtnDeleteImage.onclick = () => {
    RemoveImage("coupon/deleteImageAdmin");
}

BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage, "coupon/updateImageAdmin");
}


/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {

        case "updateimage": {
            imageShow(data.id, "coupon/get")
            break;
        }

        case "remove": {

            Remove(data.id);
            break;
        }
        case "AddToTopList": {

            ShowAddTop(data.id, "coupon");
            break;
        }

     
    }

});

MoreCategories.AddCategoryInput($("#more_cat"));