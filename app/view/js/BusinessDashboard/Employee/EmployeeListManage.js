import { Fetching } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";



let DataTables= await import('../../Class/DataTable.js?v='+Date.now());



const DataTable=DataTables.DataTable;




const DtClass=new DataTable("dataTable","userBusinessWorkTable/get_all_success_request");

const Search=document.getElementById("searchbtn");

const BtnPermission = document.getElementById("btnPermissionMenu");


const column = [
    { "data": "id" },
    { "data": "title" },

    { "data": "action" },

];
const param = {
    status: "1",
    idSearch: () => { return $("#idSearchs").val() },
    display_name: () => { return $("#titlese").val() },

};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}

DtClass.ClickTable("permission",(data)=>{
    ShowModalPermission(data.id)
})

const ShowModalPermission = (id) => {
    document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
    Fetching("userBusinessAction/getPermissions", { idSearch: id }).then((data) => {
        
        $("#PermissionMenu").modal("show");
        $("#idSearchP").val(id)
        let list = data.data.list;
        let module = data.data.module;

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

    Fetching("userBusinessAction/setPermission", {
        idSearch: $("#idSearchP").val(),
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


