import { CheckUserLogin, Fetching, GetUserOnlineInfoAuto } from "../../Fetch/Common.js";
import { URL, URLPATH, VIEWURL } from "../../Fetch/Setting.js";
import getObjFormData from "../../functions/ObjectFormData.js";
import { block, unblock } from '../../functions/Block.js';
import checkValue from '../../functions/Checked.js';


const divAccount = document.getElementById("account");
const divAccountB = document.getElementById("accountB");

const divAccountSide = document.getElementById("loginlink");
const profNav = document.getElementById("profNav");
const profSidemenu = document.getElementById("profSidemenu");
const CloseNavProf = document.getElementById("closeNavProf");
const AddReport = document.getElementById("addreport");
const SearchHeader = document.getElementsByClassName("searchHeader");
const ShowCategory = document.getElementById("show_category");
const ShowCat = document.getElementById("showCat");

let firstCategory = [];

CloseNavProf.onclick = () => {
    profSidemenu.style.width = "0px";
}

profNav.onclick = () => {

    profSidemenu.style.width = "180px";
}


const checkLogin = (data) => {
    divAccount.innerHTML = "";
    if (divAccountB !== null)
        divAccountB.innerHTML = "";
    divAccountSide.innerHTML = "";

    let prof = "Profile";
    let logout = "LogOutUser";
    if (data.type === "business") {
        prof = "BusinessProfile";
        logout = "LogOutBusinessUser";
    }
    let str = "";
    let str2 = "";
    if (data.status === "true") {

        str += ' <div class="user-img dropdown">';
        str += ' <div class="user-image-prof">';
        str += '</div>';

        str += '   <div class="dropdown-content">';
        str += '    <a href="' + URLPATH + prof + '">Profile</a>';
        str += '    <a href="' + URLPATH + logout + '">Log out</a>';
        str += '  </div>';
        str += '</div>';

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


    } else {
        str += '<div class="dropdown">';
        str += '  <button class="btn  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">';
        str += '   My Account';
        str += ' </button>';
        str += ' <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">';
        str += '    <li><a class="dropdown-item" href="' + URLPATH + 'Login">Sign In</a></li>';
        str += '     <li><a class="dropdown-item" href="' + URLPATH + 'Register">Sign Up</a></li>';
        str += '  </ul>';
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
    divAccount.innerHTML = str;
    if (divAccountB !== null)
        divAccountB.innerHTML = str;
    divAccountSide.innerHTML = str2;
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
                $("#" + modal).modal("hide");
                toast("successful", "success");
            } else {
                toast(data.err, "error");
            }

        })
    }
}

for (let i = 0; i < SearchHeader.length; i++) {
    SearchHeader[i].onkeyup = (e) => {
        SearchHeaderData(e)
    }
}


const SearchHeaderData = (e) => {

    let search = e.currentTarget.value;
    let id = e.currentTarget.dataset.id;
    if (search.length > 2) {
        Fetching("fetchData/getSearchDataHeader", { search }).then((data) => {
            showData(data, id);
        })
    } else {
        let div = $("#" + id);
        div.html("");
        div.css("display", "none");
    }

}

const showData = (data, id) => {

    let div = $("#" + id);

    div.html("");
    let str = "";
    data.product.forEach(d => {

        str += ShowRow(d, 'Product', 'title_slug');
    });

    data.prize.forEach(d => {

        str += ShowRow(d, 'Prize', 'id');
    });
    data.coupon.forEach(d => {
        str += ShowRow(d, 'Coupon', 'id');
    });
    data.business.forEach(d => {
        str += ShowRowBusiness(d, 'Businesses');
    });

    data.program.forEach(d => {
        str += ShowRow(d, 'Program');
    });
    if (str.length > 0) {
        div.html(str);
        div.css("display", "");
    }

}

const ShowRow = (data, type, href) => {

    let img = URLPATH + VIEWURL + "imgs/defult.jpg";
    if (data.file_url !== '' && data.file_url !== null) {
        img = URL + data.file_url + "/small/" + data.file_name;
    }

    let str = "";

    str += '<div class="row border-bottom mb-2 p-1 text-muted">';
    str += '<div class="col-md-12 mb-1 p-2 border-bottom">';
    str += '   <strong class="text-dark">' + type + '</strong>';
    str += '</div>';
    str += '<a href="' + URLPATH + type + 'Detail/' + data[href] + '">';
    str += ' <div class="col-md-12 p-1 row align-items-baseline">';
    str += '    <div class="col-md-2"><img  src="' + img + '" class="img-radus"></div>';
    str += '    <div class="col-md-10 text-muted">' + data.title + '</div>';
    str += ' </div>';
    str += '</a>'
    str += '</div>';

    return str;
}

const ShowRowBusiness = (data, type) => {
    let img = URLPATH + VIEWURL + "imgs/logo.png";
    if (data.file_url !== '' && data.file_url !== null) {
        img = URL + data.file_url + "/small/" + data.file_name;
    }
    let str = "";

    str += '<div class="row border-bottom mb-2 p-1 text-muted">';
    str += '<div class="col-md-12 mb-1 p-2 border-bottom">';
    str += '   <strong class="text-dark">' + type + '</strong>';
    str += '</div>';
    str += '<a href="' + URLPATH + data.display_name_slug + '">';
    str += ' <div class="col-md-12 p-1 row align-items-baseline">';
    str += '    <div class="col-md-2"><img  src="' + img + '" class="img-radus"></div>';
    str += '    <div class="col-md-10 text-muted">' + data.display_name + '</div>';
    str += ' </div>';
    str += ' </a>';

    str += '</div>';

    return str;
}

ShowCategory.onmouseover = () => {

    let div = $("#showCat");
    div.css("display", "");
    ShowSpinner();
    Fetching("fetchData/getCategoryMenu").then((data) => {
        ShowFirstMenu(data.level1);
        UnShowSpinner();

    })
}

ShowCat.onmouseleave = () => {
    let div = $("#showCat");
    div.css("display", "none");
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