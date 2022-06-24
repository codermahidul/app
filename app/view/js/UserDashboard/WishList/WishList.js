import { CreateSelectOption, Fetching } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";

import { SendDataForm } from "../../functions/Common.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";
import checkValue from "../../functions/Checked.js";

let DataTables = await import('../../Class/DataTable.js?v=' + Date.now());


const DataTable = DataTables.DataTable;

const DtClass = new DataTable("dataTable", "wishTable/get_all");

const Search = document.getElementById("searchbtn");
const AddTypeBtn = document.getElementById("addType");
const SaveBtn = document.getElementById("btnSave");
const Name = document.getElementById("name");
const Type = document.getElementById("type");
const BtnSaveChoose = document.getElementById("btnSaveChoose");

const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "type" },
    { "data": "action" },

];
const param = {

    idSearch: () => { return $("#idSearchs").val() },
    type: () => { return $("#types").val() },
};

const showHtml = (data) => {
    $("#resultType").html('');

    let str = "";
    data.forEach(d => {

        str += '<div class="col-md-12 row mb-2">';
        str += '<div class="col-md-10">' + d.name + '</div>';
        str += '<div class="col-md-2"><button class="btn btn-remove" data-id="' + d.id + '"><i class="bi bi-trash-fill text-danger"></i></button></div>'
        str += '</div>';
    });
    $("#resultType").html(str);
    let removes = document.getElementsByClassName("btn-remove");
    for (let i = 0; i < removes.length; i++) {
        removes[i].onclick = (e) => {
            Remove(e);
        }
    }
}
const getData = () => {
    block();
    Fetching("fetchData/getMyType", {}).then((data) => {

        unblock();
        if (data.status === 'true') {
            showHtml(data.data.data);
        }
    })
}


DtClass.CreateDataTable(param, column);

Search.onclick = () => {
    DtClass.Refresh();
}

AddTypeBtn.onclick = () => {
    $("#ModalType").modal("show");
    getData();
}

if(SaveBtn !==null){

    SaveBtn.onclick = () => {
        if (!checkValue(Name)) {
    
            return false;
        }
    
        Fetching("fetchData/AddTypeWish", { name: Name.value }).then((data) => {
            getData();
            SetFirst();
        })
    }
}






const Remove = (e) => {
    let id = e.currentTarget.dataset.id;
    SwalRemoveFetch("fetchData/RemoveType", { idSearch: id }, () => { getData();SetFirst() }, "Are You Sure?", "", "warning", "ok");
}

BtnSaveChoose.onclick = () => {
    if (!checkValue(Type)) {
        return false;
    }
    Fetching("fetchData/updateWishType", { idSearch: $("#idSearch").val(), type: Type.value }).then((data) => {
        $("#ChooseType").modal("hide");
        DtClass.Refresh();
    })
}

DtClass.ClickTable("type", (data) => {
    $("#idSearch").val(data.id);
    $("#ChooseType").modal("show");
})

const SetFirst = () => {
    CreateSelectOption({ url: "fetchData/getMyType", params: {} }, { id: "type", value: "id", title: "name" });
    CreateSelectOption({ url: "fetchData/getMyType", params: {} }, { id: "types", value: "id", title: "name" });

}
SetFirst();