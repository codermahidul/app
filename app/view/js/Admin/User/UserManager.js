import { RefreshTable, setDataTable } from "../../DataTable.js";
import { Fetching } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";
import { resetForm, SendDataForm } from "../../functions/Common.js";
import { ResetUser } from "../Confirm/view/Common.js";
import checkValue from '../../functions/Checked.js'
import getObjFormData from '../../functions/ObjectFormData.js';
import { TopShowAction, TopShows } from "../Confirm/TopShow.js";
import { HomeShowAction, HomeShows } from "../Confirm/HomeShow.js";


const Resets=document.getElementById("reset");
const Fname=document.getElementById("fname");
const Lname=document.getElementById("lname");
const Email=document.getElementById("email");
const Password=document.getElementById("password");
const SaveTopShowBtn=document.getElementById("saveTopShowBtn");
const addNewBtn=document.getElementById("addNewBtn");
const BtnModalAddUser=document.getElementById("btnModalAddUser");
const saveHomeShowBtn=document.getElementById("saveHomeShowBtn");
const SaveEdit=document.getElementById("btnModalEditUser");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");
const BtnSaveEditImage = document.getElementById("BtnEditImage");

const Search = document.getElementById("searchbtn");
const column = [
    { "data": "id" },
    { "data": "user_name" },
    {"data":"email"},
    {"data":"activity"},
    { "data": "verify" },
    { "data": "top_show" },
    { "data": "home_show" },
    { "data": "action" },

];
const param = {
    trash:()=>{return $("#trashSearch").val()},
    idSearch: () => { return $("#idSearchs").val() },
    email: () => { return $("#emails").val() },
    fname: () => { return $("#fnames").val() },
    lname: () => { return $("#lnames").val() },
    telephone: () => { return $("#telephone").val() },
};
setDataTable("datatable","usermanagertableadmin/get_all",param,column);

Search.onclick = () => {
    RefreshTable();
}

Resets.onclick=()=>{
    ResetUser(RefreshTable);
}

addNewBtn.onclick=()=>{
    resetForm("addformuser",false);
    $("#ModalAddUser").modal("show");
}

BtnModalAddUser.onclick=()=>{
    
    if (!checkValue(Fname)) {
        return false;
    }

    if (!checkValue(Lname)) {
        return false;
    }

    
    if (!checkValue(Email)) {
        return false;
    }
    
    if (!checkValue(Password)) {
        return false;
    }

    block();
    let data = BtnModalAddUser.dataset;
    let modal = data.id;
    let formData = getObjFormData("addformuser", true);

    Fetching("useraction/newuseradmin", formData).then((data) => {
        unblock();
       resetForm("addformuser", false);

        RefreshTable();

        if (data.status === "true") {
            toast("successful", "success");
            $("#" + modal).modal("hide")
        } else {
            toast(data.err, "error");
        }

    })

}


const ShowDataUpdate=(id)=>{
    Fetching("userAction/getUserInfoAdmin",{idSearch:id}).then((data)=>{

        if(data.status==='true')
        {
            let d=data.data.data[0];
            $("#idSearch").val(d.id);
            $("#fname_e").val(d.fname);
            $("#lname_e").val(d.lname);
            $("#email_e").val(d.email);
            $("#password_e").val(d.password);
            $("#verify_e").val(d.verify);
            
        }
        $("#ModalEditUser").modal("show")
    })
}

const ResettingEdit = () => {
    let modal = SaveEdit.dataset.id;
    RefreshTable();
    $("#" + modal).modal("hide");
}
SaveEdit.onclick=()=>{
    SendDataForm(SaveEdit,
        "editForm", "useraction/updateUserInfo",
        [],
        [],
        true,
        ResettingEdit,
        false);
}



$('#m_table_1 tbody').on('click', 'a', function (e) {
    let data = e.currentTarget.dataset;
    switch (data.action) {
        case "top":{
            TopShows(data.id);
            break;
        }

        case "home":{
            HomeShows(data.id);
            break;
        }

        case "update":{
            ShowDataUpdate(data.id);
            break;
        }


    }

});

SaveTopShowBtn.onclick=()=>{
    TopShowAction("fetchdata/removetopshow",{type_table:"user"})
}


saveHomeShowBtn.onclick =()=>{
    HomeShowAction("fetchdata/removehomeshow",{type_table:"user"},"user")
}