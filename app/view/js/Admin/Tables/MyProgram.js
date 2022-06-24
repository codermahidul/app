import { RefreshTable, setDataTable } from "../../DataTable.js";
import { CreateSelectOption, Fetching } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";
import { imageShow, RemoveImage, SetImages } from "../../BusinessDashboard/Product/ProductImage.js";
import { GalleryImageShow, SetImageGallery } from "../../BusinessDashboard/Product/ImageGallery.js";
import { GetCity, GetCountry, GetProvince, SetVal } from "../../BusinessDashboard/Product/City.js";

import {
    fileInput,
    tokenizClearById,
    tokenizSetValue,
    setSelectMulti,
    setSelectsClass,
    tokenizAjaxUser,
    tokenizAjaxTypeUser,
    SendDataFormFile,
    SendDataForm,
    resetForm,
    setSelectsClassModal,
} from "../../functions/Common.js";
import { Reset2 } from "../Confirm/view/Common.js";
import getObjFormData from "../../functions/ObjectFormData.js";
import { ShowInfoDataDiv } from "./ProgramView.js";


const AddModal = $("#ModalAdd");
const CatId = [];

const AddNewBtn = document.getElementById("addNewBtn");

const AddMoreLink = document.getElementById("add_more_links");
const AddMoreLinkE = document.getElementById("add_more_links_e");
const AddMoreGuest = document.getElementById("add_more_guest");
const AddMoreGuestE = document.getElementById("add_more_guest_e");
const AddMoreRole = document.getElementById("add_more_role");
const AddMoreRoleE = document.getElementById("add_more_role_e");
const SaveNew = document.getElementById("btnAddNew");
const SaveEdit = document.getElementById("btnEdit");
const Search = document.getElementById("searchbtn");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");
const BtnSaveEditImage = document.getElementById("BtnEditImage");
const BtnSaveGalleryImage = document.getElementById("btnaddimagegallery");
const removeBtn = document.getElementById("removeBtn");

let index = 2;
let indexGuest = 2;
let indexRole = 2;
const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "link" },
    { "data": "Disabled" },
    { "data": "action" },

];

const param = {
    trash: () => { return $("#trashSearch").val() },
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
    category_id: () => { return $("#categorys_id").val() },
};


setDataTable("datatable", "adminProgramTable/get_all", param, column);

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

const GetRolCrew = (edit = false) => {
    let vals = "";

    for (let i = 1; i < indexRole; i++) {
        let r = "role";
        let cr = "team_id";
        if (edit) {
            r = "role_e";
            cr = "team_id_e";
        }

        let role = $("#" + r + i).val();
        let team = $("#" + cr + i).val();
        if (i < (indexRole - 1)) {
            vals += role + "::" + team + ','
        } else
            vals += role + "::" + team

    }

    return vals;
}

const GetGuest = (edit = false) => {
    let vals = "";

    for (let i = 1; i < indexGuest; i++) {
        let r = "guest";
        let cr = "links";
        if (edit) {
            r = "guest_e";
            cr = "links_e";
        }

        let guest = $("#" + r + i).val();
        let links = $("#" + cr + i).val();
        if(guest.length >0)
        {
            if (i < (indexGuest - 1)) {
                vals += guest[0].trim() + "::" + links + ',?'
            } else
                vals += guest[0].trim() + "::" + links
        }
       

    }

    return vals;
}

fileInput("fileinputs");
////show catedory list





const ResettingAdd = () => {
    let modal = SaveNew.dataset.id;
    RefreshTable();
    $("#" + modal).modal("hide");
    ResetAdd()
}

const ResetAdd=()=>{

    index = 1;
    indexGuest = 1;
    indexRole = 1;
    // $("#program_award_section").val([]);
    // $("#program_award_section").trigger("change");
    // $("#program_award_section_e").val([]);
    // $("#program_award_section_e").trigger("change");

    $("#category_id").val([]);
    $("#category_id").trigger("change");
    $("#category_id_e").val([]);
    $("#category_id_e").trigger("change");

    $("#type").val('');
    $("#type").trigger("change");
    $("#type_e").val('');
    $("#type_e").trigger("change");
    tokenizClearById("guest1");
    tokenizClearById("guest_e1");
    tokenizClearById("team_id1");
    tokenizClearById("team_id_e1");
    $("#more_role").html("");
    $("#more_guest").html("");
    $("#more_link").html("");
    AddMoreLink.click();
    AddMoreRole.click();
    AddMoreGuest.click();
}

SaveNew.onclick = () => {


    
    SendDataFormFile(SaveNew,
        "addNewFrm", "program/newProgramAdmin",
        [],
        [

          //  { name: "program_award_section", value: $("#program_award_section").val().toString() },
            { name: "category_id", value: $("#category_id").val().toString() },
            { name: "program_link", value: GetLinkValue() },
            { name: "program_role", value: GetRolCrew() },
            { name: "program_guest", value: GetGuest() },

            { name: "country_id", value: GetCountry() },
            { name: "province_id", value: GetProvince() },
            { name: "city_id", value: GetCity() },
        ],
        false,
        ResettingAdd,
        false);
}

AddNewBtn.onclick = () => {
    AddModal.modal("show");
    ResetAdd();
}

AddMoreLink.onclick = () => {
    let id = AddMoreLink.dataset.id;
    let div = $("#" + id);
    let str = LinkHtml("");
    div.append(str);
    index++;
}

AddMoreLinkE.onclick = () => {
    let id = AddMoreLinkE.dataset.id;
    let div = $("#" + id);
    let str = LinkHtml("_e");
    div.append(str);
    index++;
}

const LinkHtml = (edit) => {
    let str = '';
    str += ' <div class="col-md-4">';
    str += ' <label for="recipient-name" class="col-form-label">Link type:</label>';
    str += '  <select id="ltype' + edit + index + '" class="input-white min-radus select-css link-type">';
    str += '  <option value=""></option>';
    str += '   <option value="play">Multiple Play Links </option>';
    str += '   <option value="download">Multiple Download Links</option>';

    str += '  </select>';
    str += ' </div>';

    str += ' <div class="col-md-4">';
    str += ' <label for="recipient-name" class="col-form-label">Link Title:</label>';
    str += '  <input id="ltitle' + edit + index + '" type="text" autocomplete="off" class="input-white min-radus link-title">';
    str += ' </div>';
    str += ' <div class="col-md-4">';
    str += ' <label for="recipient-name" class="col-form-label">Link Address:</label>';
    str += ' <input id="ltag' + edit + index + '" type="text" autocomplete="off" class="input-white min-radus link-tag">';
    str += ' </div>';
    return str;
}

AddMoreGuest.onclick = () => {
    let id = AddMoreGuest.dataset.id;
    let div = $("#" + id);
    let str = GuestHtml();
    div.append(str);
    indexGuest++;
    AfterCreate();
}

const GuestHtml=(edit="")=>{
    let str = '';
    str += ' <div class="col-md-6">';
    str += '<label for="recipient-name" class="col-form-label">Search Guest:</label>';
    str += ' <select style="width: 100%" class="input-white min-radus  guest-search select-css" multiple name="guest" id="guest'+edit+ indexGuest + '">';

    str += '</select>';
    str += ' </div>';

    str += ' <div class="col-md-6">';
    str += '<label for="recipient-name" class="col-form-label">Link:</label>';
    str += '<input id="links' +edit+indexGuest + '" type="text" autocomplete="off" class="form-control min-radus ">';
    str += ' </div>';
    return str;
}

AddMoreGuestE.onclick =()=>{
    let id = AddMoreGuestE.dataset.id;
    let div = $("#" + id);
    let str = GuestHtml("_e");
    div.append(str);
    indexGuest++;
    AfterCreate();
}

AddMoreRole.onclick = () => {
    let id = AddMoreRole.dataset.id;
    let div = $("#" + id);
    let str = RoleHtml("");
    div.append(str);
    AfterCreateRole(indexRole);
    indexRole++;
    AfterCreate();
}

const RoleHtml = (edit) => {
    let str = '';
    str += ' <div class="col-md-6">';
    str += '<label for="recipient-name" class="col-form-label ">Role:</label>';
    str += ' <select style="width: 100%" class="input-white min-radus roles select-css" name="role" id="role'+edit + indexRole + '">';

    str += ' </select>';
    str += ' </div>';

    str += ' <div class="col-md-6">';
    str += '<label for="recipient-name" class="col-form-label">Crew:</label>';
    str += '<select style="width: 100%" class="input-white min-radus  team-search select-css" multiple name="team_id" id="team_id'+edit + indexRole + '">';
    str += '</select>';
    str += ' </div>';
    return str;
}

AddMoreRoleE.onclick = () => {
    let id = AddMoreRoleE.dataset.id;
    
    setRoleEditItem(id)
}

const setRoleEditItem=(id,values="")=>{
    let div = $("#" + id);
    let str = RoleHtml("_e")
    div.append(str);
    AfterCreateRole(indexRole,"_e",values);
    indexRole++;
    AfterCreate();
}

const AfterCreate = () => {
    tokenizAjaxTypeUser("guest-search", true, "program/getGuestList", {}, "display_name", "1");
    tokenizAjaxUser("team-search", false, "team/get", {}, "display_name", "1", "display_name");
}

const AfterCreateRole = (id,edit="",values="") => {
    
    CreateSelectOption({ url: "fetchData/proof_get", params: { type: "role" } }, { id: "role"+edit + id, value: "id", title: "title" },values)

  
}

const show_more_link = (str) => {
    
    if (str === null || str === '') {
        $("#ltitle_e1").val("")
        $("#ltag_e1").val("")
        $("#ltype_e1").val("")
        return false;
    }
    let data = str.split(",");
    if(data.length>0)
    {
        index=1;
        $("#more_link_e").html("");
    }
    for (let i = 0; i < data.length; i++) {
        let d = data[i].split("::");
        
        AddMoreLinkE.click();

        $("#ltitle_e" + (i + 1)).val(d[1])
        $("#ltag_e" + (i + 1)).val(d[2])
        $("#ltype_e" + (i + 1)).val(d[3])

    }
}

const show_more_role = (str) => {
    
    if (str === null || str === '') {
        $("#role_e1").val("").trigger("change");
        tokenizClearById("team_id_e1");
        return false;
    }

    let data = str.split(",");
    if(data.length>0)
    {
        indexRole=1;
        $("#more_role_e").html("");
    }
    for (let i = 0; i < data.length; i++) {
        let d = data[i].split("::");

        setRoleEditItem("more_role_e",d[0]);
        tokenizSetValue("team_id_e"+ (i + 1),d[1],d[2]); 
       

    }
}

const show_more_guest = (str) => {
    
    if (str === null || str === '') {
        $("#links_e1").val("");
        tokenizClearById("guest_e1");
        return false;
    }

    let data = str.split(",");
    if(data.length>0)
    {
        indexGuest=1;
        $("#more_guest_e").html("");
    }
    for (let i = 0; i < data.length; i++) {
        
        let d = data[i].split("::");
        let user_id=d[0];
        let user_display=d[1];
        let business_id=d[2];
        let business_display=d[3];
        let guest=d[4];
        let links=d[5];
        AddMoreGuestE.click();
        $("#links_e"+(i+1)).val(links);
        if(user_id !=='0')
        {
            tokenizSetValue("guest_e"+ (i + 1),user_id+',user',user_display);
        }
        if(business_id !=='0')
        {
            tokenizSetValue("guest_e"+ (i + 1),business_id+',user_business',business_display);
        }
        if(guest !=='')
        {
            tokenizSetValue("guest_e"+ (i + 1),guest,guest); 
        }  
       

    }
}

const ShowModalEdit = (id) => {

    Fetching("program/getDataAdmin", { idSearch: id }).then((data) => {
        $("#ModalEdit").modal("show");
        let d = data.data.data[0]
        $("#title_e").val(d.title);
        $("#idSearch").val(d.id);
        $("#description_e").val(d.description);
        $("#photographer_name_e").val(d.photographer_name);
        $("#type_e").val(d.type).trigger('change');
        $("#video_link_e").val(d.video_link);
        $("#tags_e").val(d.tags);
        
        SetVal(d.province_id, d.city_id)
        $("#country_id_e").val(d.country_id).trigger("change");
        // if(d.program_award_section!==null && d.program_award_section!=="")
        // $("#program_award_section_e").val(d.program_award_section.split(",")).trigger('change');
        if(d.program_category!==null && d.program_category!=="")
        $("#category_id_e").val(d.program_category.split(",")).trigger('change');
        index = 2;
        indexGuest = 2;
        indexRole = 2;
        show_more_link(d.program_tag);
        show_more_role(d.program_role);
        show_more_guest(d.program_guests);
        if (d.trash === "1")
            $("#trash2").prop('checked', true);
        else
            $("#trash").prop('checked', true);

    })
}

const ResettingEdit=()=>{
    let modal = SaveEdit.dataset.id;
    RefreshTable();
    $("#" + modal).modal("hide");
    ResetAdd()
}

SaveEdit.onclick = () => {
    SendDataForm(SaveNew,
        "editFrm", "program/updateProgramAdmin",
        [],
        [

        //    { name: "program_award_section", value: $("#program_award_section_e").val().toString() },
            { name: "category_id", value: $("#category_id_e").val().toString() },
            { name: "program_link", value: GetLinkValue(true) },
            { name: "program_role", value: GetRolCrew(true) },
            { name: "program_guest", value: GetGuest(true) },
            { name: "country_id", value: GetCountry(true) },
            { name: "province_id", value: GetProvince(true) },
            { name: "city_id", value: GetCity(true) },
        ],
        false,
        ResettingEdit,
        false);
}

BtnDeleteImage.onclick = () => {
    RemoveImage("program/deleteImageAdmin");
}

BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage,"program/updateImageAdmin");
}

BtnSaveGalleryImage.onclick=()=>{
    SetImageGallery(BtnSaveGalleryImage,"program/updateImageGalleryAdmin");
}

const Remove = (id) => {

    resetForm("frmRemove", false)
    let modal = "modalRemove";
    let url = "program/removeAdmin";

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
        action = "program/updateProgramAdmin";
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
        case "update": {
            ShowModalEdit(data.id)
            break;
        }
        case "updateimage": {
            imageShow(data.id, "program/getDataAdmin")
            break;
        }

        case "view": {

            ShowInfoDataDiv(data.id, "program/getDataAdmin")
            break;
        }

        case 'addgalleryimage': {
            GalleryImageShow(data.id, "program/getGallery", "program/deleteImageGalleryAdmin");
            break;
        }

        case "remove": {

            Remove(data.id);
            break;
        }
    }

});

CreateSelectOption({ url: "fetchData/proof_get", params: { type: "program" } }, { id: "category_id", value: "id", title: "title" })
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "program" } }, { id: "category_id_e", value: "id", title: "title" })
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "programType" } }, { id: "type", value: "id", title: "title" })
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "programType" } }, { id: "type_e", value: "id", title: "title" })
//CreateSelectOption({ url: "fetchData/proof_get", params: { type: "programAwardSection" } }, { id: "program_award_section", value: "id", title: "title" })
//CreateSelectOption({ url: "fetchData/proof_get", params: { type: "programAwardSection" } }, { id: "program_award_section_e", value: "id", title: "title" })
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "role" } }, { id: "role1", value: "id", title: "title" })
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "role" } }, { id: "role_e1", value: "id", title: "title" })
tokenizAjaxTypeUser("guest-search", true, "program/getGuestList", {}, "display_name", "1");
tokenizAjaxUser("team-search", false, "team/get", {}, "display_name", "1", "display_name");

setSelectMulti();
setSelectsClass("roles");
setSelectsClass("types");

setSelectsClassModal("select2One", "", "ModalAdd");
setSelectsClassModal("select2One_e", "", "ModalEdit");