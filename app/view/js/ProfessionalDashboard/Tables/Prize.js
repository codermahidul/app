import { ShowAddTop } from "../../BusinessDashboard/AddingTop.js";
import { imageShow, RemoveImage, SetImages } from "../../BusinessDashboard/Coupon/CouponImage.js";
import { fileInput, resetForm } from "../../functions/Common.js";



let DataTables= await import('../../Class/DataTable.js?v='+Date.now());
let PrClass= await import('../../BusinessDashboard/Prize/PrizeClass.js?v='+Date.now());



const DataTable=DataTables.DataTable;
const PrizeClass=PrClass.PrizeClass;



const DtClass=new DataTable("dataTable","prizeTable/get_all_for_business");
const PrC=new PrizeClass();
const Search=document.getElementById("searchbtn");

const AddNewBtn = document.getElementById("addNewBtn");
const AddModal = $("#ModalAdd");

const BtnSaveNew = document.getElementById("btnaddnew");
const removeBtn = document.getElementById("removeBtn");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");
const BtnSaveEditImage = document.getElementById("BtnEditImage");
const BtnSaveEdit = document.getElementById("btnSaveEdit");


const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "jvalues" },
    { "data": "action" },

];
const param = {
    trash: "0",
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
   
};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}

AddNewBtn.onclick = () => {
    AddModal.modal("show");

}



BtnSaveNew.onclick=()=>{
    PrC.AddNew(BtnSaveNew,"prize/newPrizeSub","addnewfrm",()=>{
        AddModal.modal("hide");
        DtClass.Refresh();
    })
}
BtnSaveEdit.onclick=()=>{
    PrC.EditInfo(BtnSaveEdit,"prize/updatePrize","frmEdit",()=>{
        $("#ModalEdit").modal("hide");
        DtClass.Refresh();
    });
}

DtClass.ClickTable("AddToTopList",(data)=>{
    ShowAddTop(data.id, "prize");
})

DtClass.ClickTable("update",(data)=>{

 
    PrC.ShowData("prize/get",{idSearch:data.id})
})
DtClass.ClickTable("remove",(data)=>{
    resetForm("frmRemove", false)
    let modal = "modalRemove";
    let url = "prize/remove";
    
    removeBtn.dataset.rmoveid = data.id;
    removeBtn.dataset.action = url;
    $("#" + modal).modal("show"); 
})

DtClass.ClickTable("view",(data)=>{
    PrC.ViewInfo("prize/get",{idSearch:data.id},()=>{$("#ModalView").modal("show")})
})

removeBtn.onclick = () => {

    PrC.Remove(removeBtn,"prize/updatePrize",()=>{
        DtClass.Refresh();
        resetForm("frmRemove", false);
    })

}

BtnDeleteImage.onclick = () => {
    RemoveImage("prize/deleteImage");
    setTimeout(() => {
        DtClass.Refresh()
    }, 1000);
}


BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage,"prize/updateImage");
    setTimeout(() => {
        DtClass.Refresh()
    }, 1000);
}


DtClass.ClickTable("updateimage",(data)=>{
    imageShow(data.id,"prize/get")
})

fileInput("fileinputs");








