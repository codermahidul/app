import { imageShow, RemoveImage, SetImages } from "../../BusinessDashboard/Coupon/CouponImage.js";
import { RefreshTable, setDataTable } from "../../DataTable.js";
import { CreateSelectOption, Fetching } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";

import { fileInput, GetIdFromUrl, resetForm, SendDataForm, SendDataFormFile, tokenizAjax, tokenizSetValue } from "../../functions/Common.js";
import getObjFormData from "../../functions/ObjectFormData.js";
import { GetCity, GetCountry, GetProvince, SetVal } from "../../BusinessDashboard/Product/City.js";
import { MoreCategory } from "../../Class/MoreCategory.js";


const MoreCategories=new MoreCategory("coupon");
const Search = document.getElementById("searchbtn");
const AddNewBtn = document.getElementById("addNewBtn");
const BtnSaveNew = document.getElementById("btnaddnew");
const SaveEdit = document.getElementById("btnSaveEdit");
const AddModal = $("#ModalAdd");

const title = document.getElementById("title");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const expire = document.getElementById("expire");

const title_e = document.getElementById("title_e");
const amount_e = document.getElementById("amount_e");
const type_e = document.getElementById("type_e");
const expire_e = document.getElementById("expire_e");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");
const BtnSaveEditImage = document.getElementById("BtnEditImage");
const removeBtn = document.getElementById("removeBtn");



const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "amount" },
    { "data": "type" },
    { "data": "link" },
    { "data": "product" },
    { "data": "expire" },
    { "data": "description" },
    { "data": "Disabled" },
    { "data": "action" },

];
const param = {
    order: () => { return "coupon.id" },
    trash: () => { return $("#trashSearch").val() },
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
};


///datatble
setDataTable("datatable", "adminCouponTable/get_all", param, column);
fileInput("fileinputs");
tokenizAjax("productsearch", false, "product/get", {userIdSearch:GetIdFromUrl()}, "title", "1");
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "discount" } }, { id: "type", value: "id", title: "title" })
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "discount" } }, { id: "type_e", value: "id", title: "title" })

Search.onclick = () => {
    RefreshTable();
}


AddNewBtn.onclick = () => {
    AddModal.modal("show");
    MoreCategories.ResetMoreCat();

  
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
        "addnewfrm", "coupon/newCouponAdmin",
        [title, amount, type, expire],
        [
            { name: "product_id", value: $("#product_id").val().toString() },
            { name: "online", value: online },
            { name: "country_id", value: GetCountry() },
            { name: "province_id", value: GetProvince() },
            { name: "city_id", value: GetCity() },
            { name: "categorys", value: JSON.stringify(MoreCategories.GetCatIdParent()) },
            { name: "category_id", value: MoreCategories.GetCatId().toString() },

           
        ],
        false,
        ResettingAdd,
        false);

}



const ShowModalEdit = (id) => {

    Fetching("coupon/getDataAdmin", { idSearch: id }).then((data) => {
        $("#ModalEdit").modal("show");
        let d = data.data.data[0]
        $("#title_e").val(d.title);
        $("#idSearch").val(d.id);
        $("#description_e").val(d.description);
        $("#amount_e").val(d.amount);
        $("#type_e").val(d.type);
        $("#expire_e").val(d.expire);
        $("#link_e").val(d.link);
        if (d.product_id !== null)
            tokenizSetValue("product_id_e", d.product_id, d.product_title)

        if (d.trash === "1")
            $("#trash2").prop('checked', true);
        else
            $("#trash").prop('checked', true);



        SetVal(d.province_id, d.city_id)
        $("#country_id_e").val(d.country_id).trigger("change");

        if (d.online === "1")
            $("#online_e").prop('checked', true);
        else
            $("#online_e").prop('checked', false);

            $("#more_cat_e").html("");
            MoreCategories.ResetMoreCat();
            MoreCategories.ShowEditCat(d.catagories, d.cats_id,$("#more_cat_e"));
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
    let online = "0";
    if ($('#online_e').is(":checked")) {
        online = "1";
    }
    block();
    SendDataForm(SaveEdit,
        "frmEdit",
        "coupon/updateCouponAdmin",
        [title_e, amount_e, type_e, expire_e],
        [
            { name: "product_id", value: $("#product_id_e").val().toString() },
            { name: "online", value: online },
            { name: "country_id", value: GetCountry(true) },
            { name: "province_id", value: GetProvince(true) },
            { name: "city_id", value: GetCity(true) },

            { name: "categorys", value: JSON.stringify(MoreCategories.GetCatIdParent()) },
            { name: "category_id", value: MoreCategories.GetCatId().toString() },
        ],
        true,
        Resets,
        false);
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
    formData = { ...formData, ...{ 'idSearch': rmoveid } };
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
        case "update": {
            ShowModalEdit(data.id)
            break;
        }

        case "updateimage": {
            imageShow(data.id, "coupon/getDataAdmin")
            break;
        }
        case "remove": {

            Remove(data.id);
            break;
        }
    }

});

MoreCategories.AddCategoryInput($("#more_cat"));