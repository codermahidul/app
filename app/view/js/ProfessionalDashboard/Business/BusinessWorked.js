import { SendDataForm } from "../../functions/Common.js";

let DataTables= await import('../../Class/DataTable.js?v='+Date.now());
let AutoCompletes= await import('../../Class/AutoComplete.js?v='+Date.now());


const DataTable=DataTables.DataTable;
const AutoComplete=AutoCompletes.AutoComplete;



const DtClass=new DataTable("dataTable","userBusinessWorkTable/get_all");

const AutoC=new AutoComplete("userAction/userBusinessGet","searchVal","resultB","display_name","display_name");
const Search=document.getElementById("searchbtn");
const searchVal=document.getElementById("searchVal");
const AddNewBtn=document.getElementById("addNewBtn");
const AddBusiness=document.getElementById("addBusiness");

const column = [
    { "data": "id" },
    { "data": "title" },
   // { "data": "date_start" },
   // { "data": "date_end" },
    { "data": "status" },

];
const param = {
    trash: "0",
    idSearch: () => { return $("#idSearchs").val() },
    display_name: () => { return $("#titlese").val() },
};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}

AddNewBtn.onclick=()=>{
    $("#modalAddBusiness").modal("show");
    AutoC.Empty();
}

const RefreshAfterAdd=()=>{
    let id=AddBusiness.dataset.id;
    $("#"+id).modal("hide");
    $("#now").val("");
    DtClass.Refresh();
}

AddBusiness.onclick=()=>{
    if(AutoC.GetValue()==="")
    {
        toast("Please Choose Business", "error");
        return false;
    }
    SendDataForm(AddBusiness,"frmBusiness","userBusinessAction/newWork",[],[
        {name:"on_business_id",value:AutoC.GetValue()}
    ],false,RefreshAfterAdd,false);
    
}
