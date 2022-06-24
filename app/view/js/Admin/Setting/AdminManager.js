import { RefreshTable, setDataTable } from "../../DataTable.js";
import { Fetching } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";
import checkValue from "../../functions/Checked.js";
import { resetForm } from "../../functions/Common.js";
import getObjFormData from "../../functions/ObjectFormData.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";
import { ResetProof } from "../Confirm/view/Common.js";


const btnModalAddAdmin = document.getElementById("btnModalAddAdmin");
const addNewBtn = document.getElementById("addNewBtn");
const EditBtn = document.getElementById("btnModalEditAdmin");
const BtnPermission = document.getElementById("btnPermissionMenu");
const Search = document.getElementById("searchbtn");
const Resets = document.getElementById("reset");
const column = [
    { "data": "id" },
    { "data": "name" },
    { "data": "username" },
    { "data": "password" },
    { "data": "action" },

];
const param = {

    idSearch: () => { return $("#idSearchs").val() },
    name: () => { return $("#names").val() },
    username: () => { return $("#usernames").val() },


};
setDataTable("datatable", "admintable/get_all", param, column);

Search.onclick = () => {
    RefreshTable();
}

Resets.onclick = () => {
    $("#name").val("");
    $("#idSearchs").val("");
    $("#usernames").val("");
    RefreshTable();
}

addNewBtn.onclick = () => {
    resetForm("addfrm", false);
    $("#ModalAddAdmin").modal("show");
}

btnModalAddAdmin.onclick = () => {

    block();
    let data = btnModalAddAdmin.dataset;
    let modal = data.id;
    let formData = getObjFormData("addfrm", true);

    Fetching("useradmin/addnewadmin", formData).then((data) => {
        unblock();
        resetForm("addfrm", false);

        RefreshTable();

        if (data.status === "true") {
            toast("successful", "success");
            $("#" + modal).modal("hide")
        } else {
            toast(data.err, "error");
        }

    })

}

EditBtn.onclick = () => {


    block();
    let data = EditBtn.dataset;
    let modal = data.id;
    let formData = getObjFormData("editfrm", true);

    Fetching("useradmin/updateadmin", formData).then((data) => {
        unblock();
        resetForm("editfrm", false);

        RefreshTable();

        if (data.status === "true") {
            toast("successful", "success");
            $("#" + modal).modal("hide")
        } else {
            toast(data.err, "error");
        }

    })

}

const Remove = (id) => {
    SwalRemoveFetch("proof/remove", { idSearch: id }, RefreshTable, "Are you sure?", "", "warning", "Your data is safe!");
}

const ShowModalEdit = (id) => {

    Fetching("useradmin/getdmin", { idSearch: id }).then((data) => {
        $("#ModalEditAdmin").modal("show");
        let d = data.data.data[0]
        $("#name_e").val(d.name);
        $("#idSearch").val(d.id);
        $("#username_e").val(d.username);
        $("#password_e").val(d.password);
    })
}

const ShowModalPermission = (id) => {
    document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
    Fetching("useradmin/getpermissionadmin", { idSearch: id }).then((data) => {
        
        $("#PermissionMenu").modal("show");
        let list = data.data.list;
        let module = data.data.module;
        $("#idSearchp").val(id);

        for (let i = 0; i < list.length; i++) {
            $("#ch_" + list[i].list).prop('checked', true);
        }

        for (let i = 0; i < module.length; i++) {
            $("#" + module[i].list+"_"+module[i].action).prop('checked', true);
        }

    })
}

BtnPermission.onclick = () => {
    let menu = [];
    let list = [];
    let modul = [];
    block();
    let data = BtnPermission.dataset;
    let modal = data.id;
    $('input[name="listm"]:checked').each(function () {
        let data = this.value.split(",");
        if (!list.includes(data[0])) {
            list.push(data[0]);
        }

        if (!menu.includes(data[1])) {
            menu.push(data[1]);
        }
    });


    $('input[name="modul"]:checked').each(function () {
        let data = this.value.split(",");
        let exist = false;
        modul.forEach(e => {
            if (e.action === data[0] && e.list === data[1]) {
                exist = true;
            }

        });
        if (!exist) {
            modul.push({ action: data[0], list: data[1] })
        }
    });

    Fetching("useradmin/setpermissionadmin", {
        idSearch: $("#idSearchp").val(),
        menu: JSON.stringify(menu),
        list: JSON.stringify(list),
        modul: JSON.stringify(modul)
    }).then((data) => {
        unblock();
        if (data.status === "true") {
            toast("successful", "success");
            $("#" + modal).modal("hide")
        } else {
            toast(data.err, "error");
        }

    })

}
/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {
        case "update": {
            ShowModalEdit(data.id)
            break;
        }

        case "permission": {
            ShowModalPermission(data.id)
            break;
        }

        case "remove": {
            Remove(data.id);
            break;
        }
    }

});



