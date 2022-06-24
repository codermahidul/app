import { GalleryImageShow, SetImageGallery } from "../../BusinessDashboard/Product/ImageGallery.js";
import { imageShow, RemoveImage, SetImages } from "../../BusinessDashboard/Product/ProductImage.js";
import { CreateSelectOption } from "../../Fetch/Common.js";
import { URLPATH } from "../../Fetch/Setting.js";
import { block } from "../../functions/Block.js";
import { fileInput, SendDataForm, setSelects, setSelectsClassModal } from "../../functions/Common.js";

let  TeamCommon=await import("../../Admin/Team/Common.js?v="+Date.now);

const ShowEditInfo=document.getElementById("editInfo");
const BtnEdit = document.getElementById("btnModalEdit");
const EditImg=document.getElementById("editImg");
const BtnDeleteImage = document.getElementById("btndeleteimageevent");
const BtnSaveEditImage = document.getElementById("BtnEditImage");
const BtnSaveGalleryImage = document.getElementById("btnaddimagegallery");
const BtnEditGallery=document.getElementById("editGallery");
const TimeZoneE=document.getElementById("timezone_e");

const GetLinkValue=TeamCommon.GetLinkValue;
const ShowEditProfile=TeamCommon.ShowEditProfile;
const ShowGallery=TeamCommon.ShowGallery;
const ShowInfoProfile=TeamCommon.ShowInfoProfile

ShowEditInfo.onclick=()=>{
    ShowEditProfile(1);

}

const RefreshEdit = () => {
    let data = BtnEdit.dataset;
    let modal = data.id;
    $("#" + modal).modal("hide")
    ShowInfoProfile();
}

BtnEdit.onclick = () => {

    SendDataForm(BtnEdit,
        "editForm", "team/updateMyInfo",
        [TimeZoneE],
        [
            { name: "team_link", value: GetLinkValue(true) },
        ],
        false,
        RefreshEdit,
        false);

}

EditImg.onclick=()=>{
    imageShow($("#idSearch").val(),"team/get");
}

const Refresh=()=>{
    block();
    setTimeout(() => {
        window.location.reload();  
    }, 2000);
}

BtnDeleteImage.onclick = () => {
    RemoveImage("team/deleteImage");
    Refresh()
}

BtnSaveEditImage.onclick = () => {
    SetImages(BtnSaveEditImage, "team/updateImage");
    Refresh();
}

BtnEditGallery.onclick=()=>{
    GalleryImageShow($("#idSearch").val(), "team/getGallery", "team/deleteImageGallery");

}

BtnSaveGalleryImage.onclick = () => {
    SetImageGallery(BtnSaveGalleryImage, "team/updateImageGallery",ShowGallery);

}

ShowInfoProfile();

fileInput("fileinputs");

CreateSelectOption(
    { url: URLPATH + "fetchData/getTimeZone", params: { } },
    { id: "timezone_e", value: "id", title: "name" },
    false,
    ()=>{}
  );
setSelectsClassModal("select2","Select one","ModalEdit");