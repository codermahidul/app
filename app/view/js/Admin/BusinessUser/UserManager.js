import { RefreshTable, setDataTable } from "../../DataTable.js";
import { Fetching } from "../../Fetch/Common.js";

import { fileInput, resetForm, SendDataForm } from "../../functions/Common.js";
import { ResetUser } from "../Confirm/view/Common.js";

import { TopShowAction, TopShows } from "../Confirm/TopShow.js";
import { fetchCatSearch, SetCatParamSearch } from "../../functions/CategorySearch.js";
import { HomeShowAction, HomeShows } from "../Confirm/HomeShow.js";
import { ShowAddTop } from "../../BusinessDashboard/AddingTop.js";
import { SwalRemoveFetchParams } from "../../functions/SwalDelete.js";

let ProductImage=await import("../../BusinessDashboard/Product/ProductImage.js?v="+ Date.now());
let MoreCategoryC = await import("../../Class/MoreCategory.js?v=" + Date.now())


const MoreCategory = MoreCategoryC.MoreCategory;

const imageShow=ProductImage.imageShow;
const RemoveImage=ProductImage.RemoveImage;
const SetImages=ProductImage.SetImages;

const MoreCategories = new MoreCategory("business");
const ModalCat = $("#modalCategory");
const IDCatDiv = "category_data";
const TYPECat = "product";

const CategoryBoxSearch = document.getElementById("categorysearch_id");
const Resets = document.getElementById("reset");
const name = document.getElementById("name");
const Email = document.getElementById("email");
const Password = document.getElementById("password");

const SaveTopShowBtn = document.getElementById("saveTopShowBtn");
const addNewBtn = document.getElementById("addNewBtn");
const BtnModalAddUser = document.getElementById("btnModalAddUser");
const saveHomeShowBtn = document.getElementById("saveHomeShowBtn");
const SaveEdit = document.getElementById("btnModalEditUser");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");
const BtnSaveEditImage = document.getElementById("BtnEditImage");

const Search = document.getElementById("searchbtn");
const column = [
    { "data": "id" },
    { "data": "user_name" },
    { "data": "email" },
    { "data": "type" },
    { "data": "category_name" },
    { "data": "activity" },
    { "data": "verify" },
    { "data": "top_show" },
    { "data": "home_show" },
    { "data": "action" },

];
const param = {
    trash: () => { return $("#trashSearch").val() },
    idSearch: () => { return $("#idSearchs").val() },
    email: () => { return $("#emails").val() },
    type: () => { return $("#typeS").val() },
    name: () => { return $("#names").val() },
    category_id: () => { return $("#categorys_id").val() },
    order: () => { return "user_business.id"},
};
setDataTable("datatable", "businessUserManagerTableAdmin/get_all", param, column);
fileInput("fileinputs");

let idSearch='';

Search.onclick = () => {
    RefreshTable();
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

Resets.onclick = () => {
    ResetUser(RefreshTable);
}

addNewBtn.onclick = () => {
    resetForm("addformuser", false);
    $("#ModalAddUser").modal("show");
    MoreCategories.ResetMoreCat();
}

const ResettingAdd = () => {
    let modal = BtnModalAddUser.dataset.id;
    RefreshTable();
    $("#" + modal).modal("hide");
}
BtnModalAddUser.onclick = () => {
    SendDataForm(BtnModalAddUser,
        "addformuser", "useraction/newBusinessUserAdmin",
        [name, Email, Password],
        [
            { name: "categorys", value: JSON.stringify(MoreCategories.GetCatIdParent()) },
            { name: "category_id", value: MoreCategories.GetCatId().toString() },
        ],
        false,
        ResettingAdd,
        false);

}

const ShowDataUpdate = (id) => {
    Fetching("userAction/getBusinessUserInfo", { idSearch: id }).then((data) => {

        if (data.status === 'true') {
            let d = data.data.data[0];
            $("#idSearch").val(d.id);
            $("#category_id_e").val(d.category_id);
            $("#name_e").val(d.name);
            $("#email_e").val(d.email);
            $("#type_e").val(d.type);
            $("#password_e").val(d.password);
            $("#verify_e").val(d.verify);
            $("#more_cat_e").html("");
            MoreCategories.ResetMoreCat();
            MoreCategories.ShowEditCat(d.catagories, d.cats_id, $("#more_cat_e"));
        }
        $("#ModalEditUser").modal("show");


    })
}

const ResettingEdit = () => {
    let modal = SaveEdit.dataset.id;
    RefreshTable();
    $("#" + modal).modal("hide");
}
SaveEdit.onclick = () => {
    SendDataForm(SaveEdit,
        "editUser", "userAction/updateBusinessUserInfo",
        [],
        [
            { name: "categorys", value: JSON.stringify(MoreCategories.GetCatIdParent()) },
            { name: "category_id", value: MoreCategories.GetCatId().toString() },
        ],
        true,
        ResettingEdit,
        false);
}

BtnDeleteImage.onclick = () => {
    RemoveImage("userAction/removeImageForBusiness",false,[{name:"idSearch",value:idSearch}]);
}

BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage, "userAction/forBusinessImage",false,[{name:"idSearch",value:idSearch}]);
}

$('#m_table_1 tbody').on('click', 'a', function (e) {
    let data = e.currentTarget.dataset;
    switch (data.action) {
        case "top": {
            // TopShows(data.id);
            ShowAddTop(data.id, 'user_business', true)
            break;
        }

        case "home": {
            HomeShows(data.id);
            break;
        }

        case "update": {
            ShowDataUpdate(data.id);
            break;
        }

        case "updateImage": {
            imageShow(data.id, "userAction/getBusinessUserCompleteInfo");
            idSearch=data.id;
            break;
        }

        case "block": {
            idSearch=data.id;
            SwalRemoveFetchParams("userAction/updateBusinessUserInfo",{idSearch,block:"1"},RefreshTable,"Are You Sure for block?","","warning","ok");
            break;
        }

        case "unblock": {
            idSearch=data.id;
            SwalRemoveFetchParams("userAction/updateBusinessUserInfo",{idSearch,block:"0"},RefreshTable,"Are You Sure for unblock?","","info","ok");
            break;
        }
    }

});

// SaveTopShowBtn.onclick=()=>{
//     TopShowAction("fetchdata/removetopshow",{type_table:"user_business"})
// }

saveHomeShowBtn.onclick = () => {
    HomeShowAction("fetchdata/removehomeshow", { type_table: "user_business" }, "user_business")
}

MoreCategories.AddCategoryInput($("#more_cat"));