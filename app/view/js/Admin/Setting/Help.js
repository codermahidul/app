import { RefreshTable, setDataTable } from "../../DataTable.js";
import { RemoveImage, SetImages, imageShow } from "../../BusinessDashboard/Product/ProductImage.js";
import { SendDataForm, fileInput, resetForm } from "../../functions/Common.js";
import { block, unblock } from "../../functions/Block.js";

import { Fetching } from "../../Fetch/Common.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";

const Title = document.getElementById("title");
const Description = document.getElementById("descriptions");
const TitleE = document.getElementById("title_e");
const DescriptionE = document.getElementById("descriptions_e");
const BtnModalAdd = document.getElementById("btnModalAdd");
const addNewBtn = document.getElementById("addNewBtn");
const EditBtn = document.getElementById("btnModalEdit");
const Search = document.getElementById("searchbtn");
const Resets = document.getElementById("reset");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");
const BtnSaveEditImage = document.getElementById("BtnEditImage");

const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "descriptions" },
    { "data": "action" },

];
const param = {

    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titles").val() },
    type: () => { return $("#types").val() },

};
setDataTable("datatable", "helpTable/get_all", param, column);

Search.onclick = () => {
    RefreshTable();
}



const Remove = (id) => {
    SwalRemoveFetch("help/remove", { idSearch: id }, RefreshTable, "Are you sure?", "", "warning", "Your data is safe!");
}

const ShowModalEdit = (id) => {

    Fetching("help/get", { idSearch: id }).then((data) => {
        
        $("#ModalEdit").modal("show");
        let d = data.data.data[0]
        $("#title_e").val(d.title);
        $("#idSearch").val(d.id);
        $("#descriptions_e").val(d.descriptions);
    })
}
BtnDeleteImage.onclick = () => {
    RemoveImage("help/deleteImage");
}

BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage, "help/updateImage");
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
            imageShow(data.id, "help/get")
            break;
        }
        case "remove": {
            Remove(data.id);
            break;
        }
    }

});

fileInput("fileinputs");


