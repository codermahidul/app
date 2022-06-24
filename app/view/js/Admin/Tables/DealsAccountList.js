
let Common=await import("../../functions/Common.js?v="+Date.now());


let DataTables= await import('../../Class/DataTable.js?v='+Date.now());


const DataTable=DataTables.DataTable;
const fileInput=Common.fileInput;
const SendDataFormFileMulti=Common.SendDataFormFileMulti;


const DtClass=new DataTable("dataTable","couponTableAdmin/get_all_shop");
const Search=document.getElementById("searchbtn");
const BtnSave=document.getElementById("addClearing");

const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "name" },
    { "data": "price" },
    { "data": "percent" },
    { "data": "amount" },
    { "data": "action" },

];
const param = {
    clearing: "0",
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titles").val() },
    display_name: () => { return $("#nameS").val() },
    
};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}

DtClass.ClickTable("clearing",(data)=>{
    $("#idSearch").val(data.id);
    $("#ModalClearing").modal("show")
})

BtnSave.onclick=()=>{
    SendDataFormFileMulti(BtnSave,"frmClearing","deals/ClearingDealsShop",[],[],false,()=>{
        $("#ModalClearing").modal("hide");
        DtClass.Refresh();
    },false)
}


fileInput("fileInputs","Drag & drop file or image here &hellip;",[
    "jpg", "png", "jpeg","pdf","doc", "docx"
]);