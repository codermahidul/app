await import ('./Search.js?v='+Date.now());
let Common=await import('../../Fetch/Common.js?v='+Date.now());

import { URL, URLPATH, VIEWURL } from "../../Fetch/Setting.js";
import { block, unblock } from '../../functions/Block.js';

import { SwalRemoveFetch } from "../../functions/SwalDelete.js";
import checkValue from '../../functions/Checked.js';
import getObjFormData from "../../functions/ObjectFormData.js";

let Climes= await import('../../Class/Clime.js?v='+Date.now());
const Clime=Climes.Clime;
const AddLoginUrl=Common.AddLoginUrl;
const CheckUserLogin=Common.CheckUserLogin;
const Fetching=Common.Fetching;
const GetUserOnlineInfoAuto=Common.GetUserOnlineInfoAuto;
////this Should not be cleaned
///start
const ClimeClass=new Clime();

////end
const divAccount = document.getElementById("account");
const divAccountB = document.getElementById("accountB");
const AddWishHeader=document.getElementById("AddWish");
const RemoveWishHeader=document.getElementById("RemoveWishHeader");

const divAccountSide = document.getElementById("loginlink");
const profNav = document.getElementById("profNav");
const profSidemenu = document.getElementById("profSidemenu");
const CloseNavProf = document.getElementById("closeNavProf");
const AddReport = document.getElementById("addreport");

const ShowCategory = document.getElementById("show_category");
const ShowCat = document.getElementById("showCat");
const $menuTrigger = $('.js-menuToggle');
const $topNav = $('.js-topPushNav');
const $openLevel = $('.js-openLevel');
const closeLevel=$(".closeLevel");

let firstCategory = [];

if(CloseNavProf!==null)
{
    CloseNavProf.onclick = () => {
        profSidemenu.style.width = "0px";
    }
}


if(profNav!==null){
    profNav.onclick = () => {

        profSidemenu.style.width = "180px";
    }
}



const openPushNav=() =>{
    $topNav.addClass('isOpen');
    $('body').addClass('pushNavIsOpen');
  }
  
  const closePushNav=()=> {
    $topNav.removeClass('isOpen');
    $openLevel.siblings().removeClass('isOpen');
    $('body').removeClass('pushNavIsOpen');
  }
  
  


const checkLogin = (data) => {



    let prof = "Profile";
    let logout = "LogOutUser";
    if (data.type === "business") {
        prof = "BusinessProfile";
        logout = "LogOutBusinessUser";
    }

    if (data.type === "professional") {
        prof = "professionalUserProfile";
        logout = "LogOutBusinessUser";
    }
    let str = "";
    let str2 = "";
    if (data.status === "true") {
        $("#wishDiv").css("display","");
        $("#wishDivMobile").css("display","");
        $("#noteDiv").css("display","");
        $("#noteDivMobile").css("display","");
        
        $("#registerMobile").css("display","none");
        $("#loginMobile").css("display","none");
        $("#profMobile").css("display","");
        $("#profMobile").html('<a href="'+ URLPATH + prof+'"><i class="fi-rs-user"></i>Profile </a>');


        
        str += ' <a href="javascript:void(0)" class="user-image-prof"> ';
        str += ' <img class="svgInject" alt="Account" src="'+URLPATH + VIEWURL+'assets/imgs/theme/icons/icon-user.svg" />';
        str += ' </a>';
        str += ' <a href="javascript:void(0)"><span class="lable ml-0"></span></a>';
        str += ' <div class="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">';
        str += '  <ul>';
        str += '   <li><a href="'+URLPATH+prof+'"><i class="fi fi-rs-user mr-10"></i>Profile</a></li>';
        str += '  <li><a href="'+URLPATH+logout+'"><i class="fa fa-user-lock mr-10"></i>Log out</a></li>';

        str += ' </ul>';
        str += ' </div>';
        

        GetUserOnlineInfoAuto(data.type);


        str2 += ' <div class="side-menu-header">';
        str2 += '<div class="icon-side-menu-header">';
        str2 += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">';
        str2 += '<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>';
        str2 += '  </svg>';
        str2 += ' </div>';
        str2 += '<div class="tag-side-menu">';
        str2 += '    <a href="' + URLPATH + prof + '">Profile</a>';
        str2 += ' </div>';
        str2 += '  </div>';


        $("#wishNum").html(data.wish);
        $("#wishNumMobile").html(data.wish);
        $("#noteNum").html(data.note);
        $("#noteNumMobile").html(data.note);
    } else {
        $("#wishDiv").css("display","none");
        $("#wishDivMobile").css("display","none");
        $("#noteDiv").css("display","none");
        $("#noteDivMobile").css("display","none");

        $("#registerMobile").css("display","");
        $("#loginMobile").css("display","");
        $("#profMobile").css("display","none");

        str += ' <a href="javascript:void(0)">';
        str += ' <img class="svgInject" alt="Account" src="'+URLPATH + VIEWURL+'assets/imgs/theme/icons/icon-user.svg" />';
        str += ' </a>';
        str += ' <a href="javascript:void(0)"><span class="lable ml-0"></span></a>';
        str += ' <div class="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">';
        str += '  <ul>';
        str += '   <li><a href="'+URLPATH+'register"><i class="fi fi-rs-user mr-10"></i>Register</a></li>';
        str += '  <li><a href="'+URLPATH+'login"><i class="fa fa-user-lock mr-10"></i>Login</a></li>';

        str += ' </ul>';
        str += ' </div>';




        str2 += ' <div class="side-menu-header">';
        str2 += '<div class="icon-side-menu-header">';
        str2 += ' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-open-fill" viewBox="0 0 16 16">';
        str2 += ' <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />';
        str2 += '   </svg>';
        str2 += ' </div>';
        str2 += '<div class="tag-side-menu">';
        str2 += '    <a href="' + URLPATH + 'Login">Login</a>';
        str2 += ' </div>';
        str2 += '  </div>';


        str2 += '<div class="side-menu-header">';
        str2 += '<div class="icon-side-menu-header">';
        str2 += ' <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">';
        str2 += ' <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />';
        str2 += '     </svg>';
        str2 += '  </div>';
        str2 += ' <div class="tag-side-menu">';
        str2 += '      <a href="' + URLPATH + 'Register">Register</a>';
        str2 += '  </div>';
        str2 += '  </div>';


    }

    if (divAccount !== null) {
        divAccount.innerHTML = "";
        divAccount.innerHTML = str;
    }

    if (divAccountB !== null) {
        divAccountB.innerHTML = "";
        divAccountB.innerHTML = str;
    }

    if (divAccountSide !== null) {
        divAccountSide.innerHTML = "";
        divAccountSide.innerHTML = str2;
    }




}

CheckUserLogin(checkLogin);


if (AddReport !== null) {
    AddReport.onclick = () => {
        let Radio = document.getElementById("report");
        if (!$('[name=proof_id]:checked').length) {
            toast("please choose report type", "error");
            return false;
        }

        let data = AddReport.dataset;
        let modal = data.id;
        let table_type = data.table;
        let item_id = data.item;
        let param = getObjFormData("frmNewReport");
        param['table_type'] = table_type;
        param['item_id'] = item_id;
        block();
        Fetching("fetchdata/addnewreport", param).then((data) => {
            unblock();
            if (data.status == "true") {
               // $("#" + modal).modal("hide");
                toast("successful", "success");
            } else {
                toast(data.err, "error");
            }

        })
    }
}


if (ShowCategory !== null) {
    ShowCategory.onmouseover = () => {

        let div = $("#showCat");
        div.css("display", "");
        ShowSpinner();
        Fetching("fetchData/getCategoryMenu").then((data) => {
            ShowFirstMenu(data.level1);
            UnShowSpinner();

        })
    }
}


if (ShowCat !== null) {
    ShowCat.onmouseleave = () => {
        let div = $("#showCat");
        div.css("display", "none");
    }
}


const ShowSpinner = () => {
    $("#secondCat").html("");
    let str = "";
    str += '<div></div><div></div>';
    str += '<div style="height:100%" class="d-flex justify-content-center align-items-center">';
    str += '<div class="spinner-border text-primary" role="status">';
    str += '<span class="sr-only">Loading...</span>';
    str += '</div>';
    str += '</div>';

    $("#secondCat").html(str);

}

const UnShowSpinner = () => {
    $("#secondCat").html("");

}

const ShowFirstMenu = (data) => {
    let div = $("#firstCat");
    div.html("");
    let str = "";
    str += '<div class="categories-column">';
    let i = 0;
    data.forEach(d => {

        if (d.have_children == 'true') {
            str += '<div data-id="' + d.id + '" class="point current-tab" >';
            str += '<span>' + d.name + '</span> ';
            str += '<span><i class="bi bi-chevron-right"></i></span>';
            if (i == 0) {
                GetDataTwoLevel(d.id);
                i++;
            }
        }
        else {
            str += '<div class=" current-tab" >';
            str += '<a href="' + URLPATH + 'Products/' + d.name_slug + '">' + d.name + '</a> ';
        }

        str += '</div>';
    });
    str += '</div>';
    div.html(str);
    RunAfterLoad();
}

const RunAfterLoad = () => {
    let points = document.getElementsByClassName("point");
    for (let i = 0; i < points.length; i++) {
        points[i].onmouseover = (e) => { ShowChildren(e) };
    }
}

const ShowChildren = (e) => {
    let data = e.currentTarget.dataset;
    let id = data.id;
    GetDataTwoLevel(id)
}

const GetDataTwoLevel = (id) => {
    $("#secondCat").html("");
    ShowSpinner();

    Fetching("fetchData/getTowLevelCat", { parent: id, type: "product" }).then((data) => {
        UnShowSpinner();
        ShowDataHeader(data);
    })
}

const ShowDataHeader = (data) => {
    $("#secondCat").html("");
    let str = "";
    data.forEach(d => {
        let header = d.header;
        str += '<div class="">';
        str += '<div class="text-dark fw-bold">' + header.name + '</div>';
        d.items.forEach(item => {
            str += '<div class="mb-2">';
            str += '<a class="text-muted" href="' + URLPATH + 'Products/' + item.name_slug + '">' + item.name + '</a>';
            str += '</div>'
        });
        str += '</div>'
    });
    $("#secondCat").html(str);
}

if(AddWishHeader!==null)
{
    AddWishHeader.onclick=()=>{
        
        if($("#logged").val()!=='true')
        {
            AddLoginUrl();
            window.location.href=URLPATH+'Login';
            return false;
        }
        let data=AddWishHeader.dataset;
        let item_id=data.id;
        let item_type=data.type;
        Fetching("fetchData/AddToWish",{item_id,item_type}).then((data)=>{
            window.location.reload();
        })
    }
}
if(RemoveWishHeader !==null)
{
    RemoveWishHeader.onclick = () => {

        let item_id = RemoveWishHeader.dataset.id;
        let item_type = RemoveWishHeader.dataset.type;
        SwalRemoveFetch("fetchData/removeWish", {item_id,item_type}, () => { window.location.reload(); }, "Are You Sure?", "", "warning", "ok");
    }
}


export const ClickBanner = () => {
    let banner = document.getElementsByClassName("clickBanner");
    for (let i = 0; i < banner.length; i++) {
        banner[i].onclick = (e) => {
            let idSearch = e.currentTarget.dataset.id;

            Fetching("setting/UpdateBannerNumber", { idSearch });
        }
    }
}

ClickBanner();

for(let i=0;i<$menuTrigger.length;i++)
{
    $menuTrigger[i].onclick=(e)=>{
        if ($topNav.hasClass('isOpen')) {
            closePushNav();
          } else {
            openPushNav();
          }
    }
    
 
}


for(let i=0;i<closeLevel.length;i++)
{
    closeLevel[i].onclick=(e)=>{
        if ($topNav.hasClass('isOpen')) {
            closePushNav();
          } else {
            openPushNav();
          }
    }
    
 
}
   

