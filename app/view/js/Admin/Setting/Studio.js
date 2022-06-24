
import { Fetching } from "../../Fetch/Common.js";
import { SendDataForm,setFormElementValueEdit } from "../../functions/Common.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";

let DataTables= await import('../../Class/DataTable.js?v='+Date.now());


const DataTable=DataTables.DataTable;


const DtClass=new DataTable("dataTable","studioTable/get_all");
const Search=document.getElementById("searchbtn");
const AddNewBtn=document.getElementById("addNewBtn");
const AddModal=$("#ModalAdd");
const ModalEdit=$("#ModalEdit");
const BtnAddSave=document.getElementById("btnModalAdd")
const BtnModalEdit=document.getElementById("btnModalEdit")

const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "description" },
    { "data": "link" },
    { "data": "action" },

];
const param = {
    trash: "0",
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titles").val() },
};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}

AddNewBtn.onclick=()=>{
    AddModal.modal('show'); 
}

BtnAddSave.onclick=()=>{
    SendDataForm(BtnAddSave,"addNew","setting/addStudio",[],[],false,()=>{
        DtClass.Refresh();
        AddModal.modal("hide");
    },false);
}

DtClass.ClickTable("update",(data)=>{
    $("#idSearch").val(data.id)
    Fetching("setting/getStudio",{idSearch:data.id}).then((data)=>{
        setFormElementValueEdit(data.data.data[0]);
        ModalEdit.modal("show");
    })
})

BtnModalEdit.onclick=()=>{
    SendDataForm(BtnAddSave,"editFrm","setting/editStudio",[],[],true,()=>{
        DtClass.Refresh();
        ModalEdit.modal("hide");
    },false);
}

DtClass.ClickTable("remove",(data)=>{
    let idSearch=data.id;
    SwalRemoveFetch("setting/removeStudio",{idSearch},()=>{DtClass.Refresh()}, "Are you sure?", "", "warning", "Your data is safe!");
   
})

