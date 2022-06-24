import { ChangeSection, GetCatVal } from "../../functions/BannerSection.js";
import { CreateSelectOption, Fetching } from "../../Fetch/Common.js";
import { GetCatId, GetCatIdParent, ResetMoreCat, ShowEditCat } from "../../BusinessDashboard/Product/MoreCategory.js";
import { RefreshTable, setDataTable } from "../../DataTable.js";
import { SendDataForm, resetForm } from "../../functions/Common.js";
import { block, unblock } from "../../functions/Block.js";

import { ResetProof } from "../Confirm/view/Common.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";
import checkValue from "../../functions/Checked.js";

const Type = document.getElementById("type");


const addNewBtn = document.getElementById("addNewBtn");
const BtnSave = document.getElementById("btnSave");
const Search = document.getElementById("searchbtn");
const Resets = document.getElementById("reset");
const Section=document.getElementById("section")

const column = [
    { "data": "id" },
    { "data": "section" },
    { "data": "type" },
    { "data": "category" },
    { "data": "proof" },
    { "data": "calculate_type" },
    { "data": "price" },
    { "data": "action" },

];
const param = {

    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titles").val() },
    type: () => { return $("#types").val() },

};
setDataTable("datatable", "bannerPriceTable/get_all", param, column);

Search.onclick = () => {
    RefreshTable();
}

Resets.onclick = () => {
    ResetProof(RefreshTable);
}

addNewBtn.onclick = () => {
    ResetMoreCat();
    $("#more_cat").css("display","none");
    $("#programs").css("display","none");
    resetForm("addFrm", false);
    $("#ModalAdd").modal("show");
}

const ResettingAdd = () => {
    let modal = BtnSave.dataset.id;
    RefreshTable();
    $("#" + modal).modal("hide");
}

BtnSave.onclick = () => {
 
    SendDataForm(BtnSave,
        "addFrm", "setting/addNewBanner",
        [Section, Type],
        [
            
            {name:"category_id",value:GetCatVal()},
            {name:"proof_id",value:$("#proof_id").val()},
        ],
        false,
        ResettingAdd,
        false);

}



const Remove = (id) => {
    SwalRemoveFetch("setting/deleteBanner", { idSearch: id }, RefreshTable, "Are you sure?", "", "warning", "Your data is safe!");
}


/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {
        case "remove": {
            Remove(data.id);
            break;
        }
    }

});


Section.onchange=()=>{
    ChangeSection();
}


