import { Fetching, GetBusinessUserOnlineInfo, JustCreateOptionSelect } from "../../Fetch/Common.js";
import { URLPATH } from "../../Fetch/Setting.js";
import { block, unblock } from '../../functions/Block.js';
import { nlbrs, SendDataForm, setFormElementValue, setSelects } from "../../functions/Common.js";
import { ShowAddTop } from "../AddingTop.js";
let MoreCategoryC = await import("../../Class/MoreCategory.js?v=" + Date.now())
let Cites = await import("../../BusinessDashboard/Product/City.js?v=" + Date.now());


const GetCity = Cites.GetCity;
const GetCountry = Cites.GetCountry;
const GetProvince = Cites.GetProvince;
const SetVal = Cites.SetVal;


const MoreCategory = MoreCategoryC.MoreCategory;



const MoreCategories = new MoreCategory("business");
const EditModal = $("#modalEditInfo");
const EditAboutModal = $("#modalEditAbout");
const BtnEditInfo = document.getElementById("EditInfo");
const BtnSaveEditInfo = document.getElementById("editInfoBtn");
const Category = document.getElementById("category_id");
const Email = document.getElementById("email");
const country = document.getElementById("country_id");
const DisplayName = document.getElementById("display_name");
const Name = document.getElementById("name");
const EditAbout = document.getElementById("EditAbout");
const SaveEditAbout = document.getElementById("aboutBtn");
const AddTopMe=document.getElementById("AddTopMe");

let idSearch="";

if(BtnEditInfo !==null)
{
  BtnEditInfo.onclick = () => {
    block();
    GetBusinessUserOnlineInfo().then((data) => {
      unblock();
      setFormElementValue(data.data[0]);
      EditModal.modal("show");
      idSearch=data.data[0].id;
      let d=data.data[0];
      $("#more_cat_e").html("");
      MoreCategories.ResetMoreCat();
      MoreCategories.ShowEditCat(d.catagories, d.cats_id, $("#more_cat_e"));
  
      SetVal(d.province_id, d.city_id);
      $("#country_id").val(d.country_ids).trigger("change");
    })
  
  }
}



EditAbout.onclick = () => {
  block();
  GetBusinessUserOnlineInfo().then((data) => {
    unblock();
    setFormElementValue(data.data[0]);
    EditAboutModal.modal("show");

  })

}

BtnSaveEditInfo.onclick = () => {
  if(MoreCategories.GetCatId().toString()==="")
  {
    toast("Please Choose Category", "error");
    return false;
  }
  let require = [
    Name,
    DisplayName,
    Email,
    country,
    
  ];
  SendDataForm(BtnSaveEditInfo, "frmEditInfo", "useraction/updateMyBusinessUserInfo",require, [
    { name: "categorys", value: JSON.stringify(MoreCategories.GetCatIdParent()) },
    { name: "category_id", value: MoreCategories.GetCatId().toString() },
    { name: "country_id", value: GetCountry() },
    { name: "province_id", value: GetProvince() },
    { name: "city_id", value: GetCity() },
  ], true, Refrash);
}
const Refrash=()=>{
  EditModal.modal("hide");
  GetData();
}

const Refrash2=()=>{
  EditAboutModal.modal("hide");
  GetData();
}
SaveEditAbout.onclick=()=>{
  SendDataForm(BtnSaveEditInfo, "frmAbout", "useraction/updateMyBusinessUserInfo",[], [], true, Refrash2);

}

const GetData = () => {
  block()
  GetBusinessUserOnlineInfo().then((response) => {
    unblock();
    let data = response.data[0];
    $("#user_name").html(data.name);
    $("#user_birthday").html(data.establishment);
    $("#user_country_name").html(data.country_name);
    $("#user_more_info").html(data.more_info);
    $("#user_display_name").html('<a class="text-dark" href="'+URLPATH+data.display_name_slug+'">'+data.display_name+'</a>');
    $("#user_email").html(data.email);
    $("#user_category_name").html(data.category_name);
    $("#user_about").html("<div class='covers p-3'>" + nlbrs(data.about) + "</div>");


  })
}

const GetStarted = () => {
  // Fetching("fetchData/country_get", {}).then((data) => {
  //   JustCreateOptionSelect(data.data.data, "country_id", { value: "id", title: "name" })
  // })

  // Fetching("category/get", { paent: '1' }).then((data) => {
  //   JustCreateOptionSelect(data.data.data, "category_id", { value: "id", title: "name" })
  // })

  //setSelects();
  GetData();
}

GetStarted();

AddTopMe.onclick=()=>{
  ShowAddTop(idSearch,"user_business");
}