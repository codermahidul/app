import {
  EmptyIdsParent,
  EmptyParent,
  SetCatParam,
} from "../../functions/Category.js";
import {
  GetBanner,
  checkNull,
  tokenizAjax,
  tokenizAjaxCity,
} from "../../functions/Common.js";
import {
  Reset,
  ResetWithoutCategory,
} from "../../Admin/Confirm/view/Common.js";
import { URL, URLPATH, VIEWURL } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";

let FCommon=await import("../../Fetch/Common.js?v="+Date.now());

const Fetching=FCommon.Fetching;
const getCookie=FCommon.getCookie;


let MoreCategoryC = await import("../../Class/MoreCategory.js?v=" + Date.now());

const MoreCategory = MoreCategoryC.MoreCategory;

const DivShow = $("#dataList");
const BtnLoad = document.getElementById("BtnnLoad");

const SerachBtn = document.getElementById("SerachBtn");
const SearchBtn = document.getElementsByClassName("SearchBtn");
const resetBtn = document.getElementsByClassName("resetBtn");
const SortCombo = document.getElementsByClassName("orderCl");

let exist = 30;
let start = 30;
let number = "30";
let continueGet = true;
let orders = "";

let idNotIn = $("#idNotIn").val();

let country = "";
let province = "";
let city = "";

let MoreCategories = new MoreCategory("job");

MoreCategories.AddCategoryInput($("#more_cat"));
//MoreCategories.AddCategoryInput($("#more_cat2"));

const getData = () => {
  block();
  let param = {
    start: start.toString(),
    number,
    idNotIn,
    admin_confirm: "1",
    start_date: "",
    expire_date: "",
    trash: "0",
  };
  if ($("#titlese").val() !== "") {
    param["title"] = $("#titlese").val();
  }

  if (MoreCategories.GetCatId().toString() !== "") {
    param["category_id"] = MoreCategories.GetCatId().toString();
  }

  if ($("#titles2").val() !== "") {
    param["title"] = $("#titles2").val();
  }

  if ($("#display_name_slug").val() !== "") {
    param["display_name_slug"] = $("#display_name_slug").val();
  }

  if (country !== "") {
    param["country_id"] = country;
  }

  if (province !== "") {
    param["province_id"] = province;
  }

  if (city !== "") {
    param["city_id"] = city;
  }

  if (orders !== "") {
    let data = orders.split(",");
    param["order"] = "job." + data[0];

    param["order_type"] = data[1];
  }

  if(getCookie("rate_cityChooseName") !=="" ){
    param["city_id"] = getCookie("rate_cityChoose");
  }
  
  Fetching("job/get", param).then((data) => {
    unblock();
    if (data.status === "true") {
      exist = exist + data.data.data.length;
      if (data.data.total - exist <= 0) {
        continueGet = false;
        if (BtnLoad !== null) BtnLoad.style.display = "none";
      }
      start = parseInt(start) + parseInt(start);
      ShowDataList(data.data.data);
      let category = "";
      //category = $("#categorys_id").val().toString();
      //if (category == "") category = $("#catagories_id").val().toString();

      GetBanner(DivShow, "job");
    } else continueGet = false;
  });
};

SerachBtn.onclick = () => {
  idNotIn = "";
  DivShow[0].innerHTML = "";
  exist = 0;
  start = 0;
  getData();
};

if (BtnLoad !== null) {
  BtnLoad.onclick = () => {
    getData();
  };
}

const ShowDataList1 = (data) => {
  let str = "";
  data.forEach((d) => {
    let imgUrl = "";
    if (d.file_url !== "" && d.file_url !== null) {
      imgUrl = URL + d.file_url + "/small/" + d.file_name;
    } else {
      imgUrl = URLPATH + VIEWURL + "imgs/defult.jpg";
    }

    let ad = "";
    if (d.top_show_id) {
      ad += '<span class="text-success">Ad </span>';
    }

    let types = [];
    let levels = [];
    let skills = [];
    let salaries = [];
    if (d.type !== null && d.type !== "") {
      types = d.type.split(",");
      types = types.slice(0, 3);
    }

    if (d.level !== null && d.level !== "") {
      levels = d.level.split(",");
      levels = levels.slice(0, 3);
    }

    if (d.skill !== null && d.skill !== "") {
      skills = d.skill.split(",");
      skills = skills.slice(0, 3);
    }

    if (d.salary !== null && d.salary !== "") {
      salaries = d.salary.split(",");
      salaries = salaries.slice(0, 3);
    }

    str +=
      '<a href="' +
      URLPATH +
      "JobDetail/" +
      d.title_slug +
      '" class="hrefs col-md-4">';
    str += '  <div class="card-contain  m-1">';
    str += '    <div class="card-image position-relative">';
    str +=
      '          <img class="img-sam-size" src="' +
      imgUrl +
      '" alt="' +
      d.title +
      '">';
    str +=
      '             <div class="img-over-top bag-defult top-r-b-l-radus">' +
      d.category_name +
      "</div>";
    str += "  </div>";
    str += '  <div class="card-details">';
    str += '     <div class="card-title">' + ad + d.title + "</div>";
    str += "<br>";

    str += '<span class="fw-bold">';
    str += "<p> ";
    if (types.length > 0) {
      types.forEach((d) => {
        str += '<span class="bag-gray m-1">' + d + "</span>";
      });
    }
    str += "</p> ";

    str += "<p> ";
    if (levels.length > 0) {
      levels.forEach((d) => {
        str += '<span class="bag-gray m-1">' + d + "</span>";
      });
    }
    str += "</p> ";

    str += "<p> ";
    if (skills.length > 0) {
      skills.forEach((d) => {
        str += '<span class="bag-green m-1">' + d + "</span>";
      });
    }
    str += "</p> ";

    str += "<p> ";
    if (salaries.length > 0) {
      salaries.forEach((d) => {
        str += '<span class="bag-defult m-1">' + d + "</span>";
      });
    }
    str += "</p> ";

    str += " </span>";

    str += '      <div class="mt-1 ">';

    str += ' <div class="mb-1 p-1 ">';
    // str += '        <span class="text-muted">' + checkNull(d.description).substring(0, 100) + '</span>';
    str += " </div>";

    str += "       </div>";
    str += "  </div>";
    str += " </div>";
    str += " </a>";
  });
  DivShow.append(str);
};

const ShowDataList = (data) => {
  let str = "";
  data.forEach((d) => {
    let imgUrl = "";
    if (d.file_url !== "" && d.file_url !== null) {
      imgUrl = URL + d.file_url + "/small/" + d.file_name;
    } else {
      imgUrl = URLPATH + VIEWURL + "imgs/defult.jpg";
    }

    let ad = "";
    if (d.top_show_id) {
      ad += '<span class="text-success">Ad </span>';
    }

    let types = [];
    let levels = [];
    let skills = [];
    let salaries = [];
    if (d.type !== null && d.type !== "") {
      types = d.type.split(",");
      types = types.slice(0, 3);
    }

    if (d.level !== null && d.level !== "") {
      levels = d.level.split(",");
      levels = levels.slice(0, 3);
    }

    if (d.skill !== null && d.skill !== "") {
      skills = d.skill.split(",");
      skills = skills.slice(0, 3);
    }

    if (d.salary !== null && d.salary !== "") {
      salaries = d.salary.split(",");
      salaries = salaries.slice(0, 3);
    }

    str += ' <div class=" col-md-6 col-12 col-sm-6  mb-30">';
    str += '<div class="vendor-wrap style-2 mb-40">';

    str += '<div class="vendor-img-action-wrap">';
    str += '<div class="vendor-img">';
    str += '<a href="' + URLPATH + "JobDetail/" + d.title_slug + '">';
    str +=
      '  <img class="default-img img-radius" src="' +
      imgUrl +
      '" alt="' +
      d.title +
      '">';
    str += " </a>";
    str += "  </div>";
    if (levels.length > 0) {
      levels.forEach((d) => {
        str += '<div class="mt-10">';
        str += ' <span class="font-small total-product">' + d + "</span>";
        str += "  </div>";
      });
    }

    str += "</div>";
    str += '<div class="vendor-content-wrap">';
    str += '<div class="mb-30">';
    str += '<div class="product-category">';
    str += '  <span class="text-muted">' + d.category_name + "</span>";
    str += "</div>";
    str +=
      '<h4 class="mb-5"><a href="' +
      URLPATH +
      "JobDetail/" +
      d.title_slug +
      '">' +
      ad +
      d.title +
      "</a></h4>";

    str +=
      ' <div class="vendor-info d-flex justify-content-between align-items-end mt-30">';
    str += '   <ul class="contact-infor text-muted">';
    str += "    <li><strong>Skill: </strong>";
    if (skills.length > 0) {
      skills.forEach((d) => {
        str += "<span>" + d + "</span>,";
      });
    }

    str += "     </li>";
    str += "     <li><strong>Levels:</strong>";
    if (levels.length > 0) {
      levels.forEach((d) => {
        str += "<span >" + d + "</span>";
      });
    }

    str += "     </li>";
    str += "    <li><strong>Salaries:</strong>";
    if (salaries.length > 0) {
      salaries.forEach((d) => {
        str += "<span >" + d + "</span>";
      });
    }

    str += "   </li>";
    str += "   </ul>";

    str += " </div>";
    str += "</div>";
    str += "</div>";
    str += "</div>";
    str += "</div>";
  });
  DivShow.append(str);
};

const ResetData = () => {
  idNotIn = "";
  DivShow[0].innerHTML = "";
  exist = 0;
  start = 0;
  getData();
};

for (let i = 0; i < SearchBtn.length; i++) {
  SearchBtn[i].onclick = () => {
    ResetData();
  };
}

for (let i = 0; i < resetBtn.length; i++) {
  resetBtn[i].onclick = () => {
    $(".category").html("");
    $("#orders2").val("");
    $("#orderser").val("");
    $("#categorys_id").val("");
    $("#catagories_id").val("");
    $("#titlese").val("");
    $("#titles2").val("");
    $("input[name=rate]").prop("checked", false);
    $("input[name=price]").prop("checked", false);
    $("input[name=orderPage]").prop("checked", false);
    MoreCategories.ResetMoreCat();
    $("#category_id1").html("");
    $("#category_id2").html("");
  };
}

for (let i = 0; i < SortCombo.length; i++) {
  SortCombo[i].onclick = (e) => {
    $(".sort-by").trigger("click");
    $(".sort-by").text(
      "\n                                    Sort by: The " +
        e.currentTarget.text +
        "\n                                "
    );
    $(".orderCl").removeClass("active");
    SortCombo[i].classList.add("active");
    orders = e.currentTarget.dataset.value;
    ResetData();
  };
}

$('input:radio[name="orderPage"]').change(function () {
  //let value=$(this).val();
  ResetData();
});

tokenizAjaxCity(
  "city-search",
  false,
  "country/searchCity",
  {},
  "name",
  "1",
  "name"
);

$("#city").on("tokenize:tokens:add", function (e, value) {
  let data = value.split(",");
  let id = data[0];
  let type = data[1];
  if (type === "country") {
    country = id;
  }

  if (type === "province") {
    province = id;
  }

  if (type === "city") {
    city = id;
  }
  ResetData();
});

$("#city").on("tokenize:tokens:remove", function (e, value) {
  country = "";
  province = "";
  city = "";
  ResetData();
});
$("#category_id1").removeClass("p-3");
$("#category_id1").addClass("p-4");
$("#category_id1").css('height','fit-content');