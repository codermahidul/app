import { GalleryImageShow,SetImageGallery } from "../../BusinessDashboard/Product/ImageGallery.js";
import { CreateSelectOption } from "../../Fetch/Common.js";
import { URLPATH } from "../../Fetch/Setting.js";
import { fileInput } from "../../functions/Common.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";


let DataTables= await import('../../Class/DataTable.js?v='+Date.now());


const DataTable=DataTables.DataTable;

const DtClass=new DataTable("dataTable","sponsorshipTable/get_all");
const Search=document.getElementById("searchbtn");
const BtnSaveGalleryImage = document.getElementById("btnaddimagegallery");

const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "type" },
    { "data": "keywords" },
    { "data": "price" },
    { "data": "description" },
    { "data": "action" },
];
const param = {
    trash: "0",
    title: () => { return $("#titlese").val() },
    type: () => { return $("#typeS").val() },
    idSearch: () => { return $("#idSearchs").val() },
    status: () => { return $("#status").val() },
   
};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}

DtClass.ClickTable("addGalleryImage",(data)=>{
    GalleryImageShow(data.id,"sponsorship/getGallery");
})

BtnSaveGalleryImage.onclick = () => {
    SetImageGallery(BtnSaveGalleryImage,"sponsorship/updateImageGallery");
}


DtClass.ClickTable("remove",(data)=>{
    SwalRemoveFetch("sponsorship/remove",{idSearch:data.id},DtClass.Refresh,"Are you sure?", "", "warning", "Your data is safe!")

})

fileInput("fileinputs");

CreateSelectOption(
    { url: URLPATH+"fetchData/proof_get", params: { type: "sponsorship" } },
    { id: "typeS", value: "id", title: "title" }
  );
