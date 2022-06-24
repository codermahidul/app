import { SendDataForm } from "../../functions/Common.js";

let DataTables= await import('../../Class/DataTable.js?v='+Date.now());


const DataTable=DataTables.DataTable;



const DtClass=new DataTable("dataTable","userBusinessWorkTable/get_all_request");


const Search=document.getElementById("searchbtn");

const BtnAccept=document.getElementById("btnAccept");

const column = [
    { "data": "id" },
    { "data": "title" },
   // { "data": "date_start" },
   // { "data": "date_end" },
    { "data": "status" },
    { "data": "action" },

];
const param = {
    status: "0",
    idSearch: () => { return $("#idSearchs").val() },
    display_name: () => { return $("#titlese").val() },
};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}



const RefreshAfterAdd=()=>{
    let id=BtnAccept.dataset.id;
    $("#"+id).modal("hide");
    DtClass.Refresh();
}

BtnAccept.onclick=()=>{
   
    SendDataForm(BtnAccept,"acceptFrm","userBusinessAction/updateWork",[],[],false,RefreshAfterAdd,false);
    
}


DtClass.ClickTable("update",(d)=>{
    $("#idSearch").val(d.id)
    $("#ModalAccept").modal("show")
})
