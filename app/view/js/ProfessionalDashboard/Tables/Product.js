import { ShowAddTop } from "../../BusinessDashboard/AddingTop.js";
import { imageShow, RemoveImage } from "../../BusinessDashboard/Coupon/CouponImage.js";
import { GalleryImageShow, SetImageGallery } from "../../BusinessDashboard/Product/ImageGallery.js";
import { fileInput, resetForm } from "../../functions/Common.js";



let DataTables= await import('../../Class/DataTable.js?v='+Date.now());
let PrClass= await import('../../BusinessDashboard/Product/ProductClass.js?v='+Date.now());



const DataTable=DataTables.DataTable;
const ProductClass=PrClass.ProductClass;



const DtClass=new DataTable("dataTable","productTable/get_all_for_business");
const PrC=new ProductClass();
const Search=document.getElementById("searchbtn");

const AddNewBtn = document.getElementById("addNewBtn");
const AddModal = $("#ModalAdd");
const AddMoreCat=document.getElementById("add_more_cat");
const AddMoreCatE=document.getElementById("add_more_cat_e");

const ResetCat=document.getElementById("reset_cat");
const ResetCatE=document.getElementById("reset_cat_e");
const AddMoreLinks=document.getElementById("add_more_links");
const BtnSaveNew = document.getElementById("btnaddnew");
const removeBtn = document.getElementById("removeBtn");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");
const BtnSaveEditImage = document.getElementById("BtnEditImage");
const BtnSaveGaleryImage = document.getElementById("btnaddimagegallery");
const BtnSaveEdit = document.getElementById("btnSaveEdit");


const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "category_name" },
    { "data": "price" },
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
    PrC.reset();
    PrC.resetAllCat("more_cat");
    PrC.AddCategory("more_cat");
    PrC.ResetLink();
}

AddMoreCat.onclick=()=>{
    PrC.AddCategory("more_cat");
}

AddMoreCatE.onclick=()=>{
    PrC.AddCategory("more_cat_e");
}

ResetCat.onclick=()=>{
    PrC.resetAllCat("more_cat");
    PrC.AddCategory("more_cat");
}

ResetCatE.onclick=()=>{
    
    PrC.resetAllCat("more_cat");
    PrC.resetAllCat("more_cat_e");
}

AddMoreLinks.onclick=()=>{
    PrC.CreateLink("more_link");
}
BtnSaveNew.onclick=()=>{
    PrC.AddNew(BtnSaveNew,"product/newProductSub","addnewfrm",()=>{
        PrC.resetAllCat("more_cat");
        AddModal.modal("hide");
        DtClass.Refresh();
    })
}
BtnSaveEdit.onclick=()=>{
    PrC.EditInfo(BtnSaveEdit,"product/updateProduct","frmEdit",()=>{
        PrC.resetAllCat("more_cat_e");
        $("#ModalEdit").modal("hide");
        DtClass.Refresh();
    });
}

DtClass.ClickTable("AddToTopList",(data)=>{
    ShowAddTop(data.id, "product");
})

DtClass.ClickTable("update",(data)=>{
    PrC.reset();
    PrC.resetAllCat("more_cat");
    PrC.resetAllCat("more_cat_e");
 
 
    PrC.ResetLink("more_link_e","_e");
    PrC.ShowData("product/get",{idSearch:data.id})
})
DtClass.ClickTable("remove",(data)=>{
    resetForm("frmRemove", false)
    let modal = "modalRemove";
    let url = "product/remove";
    
    removeBtn.dataset.rmoveid = data.id;
    removeBtn.dataset.action = url;
    $("#" + modal).modal("show"); 
})

DtClass.ClickTable("view",(data)=>{
    PrC.ViewInfo("product/get",{idSearch:data.id},()=>{$("#ModalView").modal("show")})
})

removeBtn.onclick = () => {

    PrC.Remove(removeBtn,"product/updateProduct",()=>{
        DtClass.Refresh();
        resetForm("frmRemove", false);
    })

}

BtnDeleteImage.onclick = () => {
    RemoveImage("product/deleteImage");
    setTimeout(() => {
        DtClass.Refresh()
    }, 1000);
}
BtnSaveGaleryImage.onclick = () => {
    SetImageGallery(BtnSaveGaleryImage);
}

BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage,"product/updateImage");
    setTimeout(() => {
        DtClass.Refresh()
    }, 1000);
}

DtClass.ClickTable("addgalleryimage",(data)=>{
    GalleryImageShow(data.id);
})
DtClass.ClickTable("updateimage",(data)=>{
    imageShow(data.id,"product/get")
})

fileInput("fileinputs");








