const Common = await import("../../functions/Common.js?v=" + Date.now());

import { URL, URLPATH, VIEWURL } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";

import { SetCatSearch } from "./SetCat.js";

let FCommon=await import("../../Fetch/Common.js?v="+Date.now());

const Fetching=FCommon.Fetching;
const getCookie=FCommon.getCookie;


let MoreCategoryC = await import("../../Class/MoreCategory.js?v=" + Date.now());

const MoreCategory = MoreCategoryC.MoreCategory;

const GetBanner = Common.GetBanner;
const SetTimerCart = Common.SetTimerCart;
const checkNull = Common.checkNull;
const tokenizAjaxCity = Common.tokenizAjaxCity;

const DivShow = $("#dataList");
const BtnLoad = document.getElementById("BtnnLoad");

const SortCombo = document.getElementsByClassName("orderCl");
const SerachBtn = document.getElementById("SerachBtn");

const SearchBtn = document.getElementsByClassName("SearchBtn");
const resetBtn = document.getElementsByClassName("resetBtn");

let exist = 30;
let start = 30;
let number = "30";
let continueGet = true;
let orders = "";
let idNotIn = $("#idNotIn").val();

let country = "";
let province = "";
let city = "";

let MoreCategories = new MoreCategory("coupon");

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

  if ($('input[name="orderPage"]:checked').val() !== undefined) {
    let data = $('input[name="orderPage"]:checked').val().split(",");
    param["order"] = data[0];
    param["order_type"] = data[1];
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
    param["order"] = "deals." + data[0];

    param["order_type"] = data[1];
  }

  if ($("#slider-range-value1").text() !== "") {
    let p = $("#slider-range-value1").text().split("$")[1];
    param["price_big"] = parseInt(p.replace(/,/g, ""));
  }

  if ($("#slider-range-value2").text() !== "") {
    let p = $("#slider-range-value2").text().split("$")[1];
    param["price_smaller"] = parseInt(p.replace(/,/g, ""));
  }

  if(getCookie("rate_cityChooseName") !=="" ){
    param["city_id"] = getCookie("rate_cityChoose");
  }
  
  Fetching("deals/get", param).then((data) => {
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
      category = $("#categorys_id").val().toString();
      if (category == "") category = $("#catagories_id").val().toString();

      GetBanner(DivShow, "deals");
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

const ShowDataList = (data) => {
  let str = "";
  data.forEach((d) => {
    let type_name1 = "";
    let type_name = "";
    if (d.type_name == "Numerical") {
      type_name1 = "$";
    }
    if (d.type_name == "Percent") {
      type_name = "%";
    }
    let imgUrl = "";
    if (d.file_url !== "" && d.file_url !== null) {
      imgUrl = URL + d.file_url + "/small/" + d.file_name;
    } else {
      imgUrl = URLPATH + VIEWURL + "assets/imgs/shop/thumbnail-1.jpg";
    }

    let ad = "";
    if (d.top_show_id) {
      ad += '<span class="text-success">Ad </span>';
    }
    if (d.Rating == null) d.Rating = 0;

    str += '<div class=" col-md-3 col-12 col-sm-6  mb-30">';
    str += '<div class="product-cart-wrap">';
    str += '<div class="product-cart-wrap style-2">';
    str += '<div class="product-img-action-wrap">';
    str += '<div class="product-img">';
    str += ' <a href="' + URLPATH + "DealsDetail/" + d.id + '">';
    str +=
      '  <img class="img-sam-size" src="' +
      imgUrl +
      '" alt="' +
      d.title +
      '" />';
    str += "</a>";
    str += "</div>";
    str += "</div>";
    str += '<div class="product-content-wrap">';
    str += '  <div class="deals-countdown-wrap">';
    str +=
      '<div class="deals-countdown" data-countdown="' +
      d.expire +
      ' 00:00:00"></div>';
    str += "</div>";
    str += '<div class="deals-content">';
    str +=
      '<h2><a href="' +
      URLPATH +
      "DealsDetail/" +
      d.id +
      '">' +
      d.title.substring(0, 20) +
      "</a></h2>";
    str += '  <div class="product-rate-cover">';
    str += '  <div class="product-rate d-inline-block">';
    str +=
      '     <div class="product-rating" style="width: ' +
      parseInt(d.Rating) * 20 +
      '%"></div>';
    str += "  </div>";
    str +=
      ' <span class="font-small ml-5 text-muted"> (' +
      parseInt(d.Rating) +
      ".0)</span>";
    str += " </div>";
    str += " <div>";

    str += '      <span class="font-small text-muted">';
    str +=
      '     <a href="' +
      URLPATH +
      "DealsDetail/" +
      d.id +
      '">' +
      type_name1 +
      d.amount +
      type_name +
      "   </a>";
    str += "   </span>";
    str += " </div>";
    str += ' <div class="product-card-bottom">';
    str += '       <div class="product-price">';
    str += "<span> $" + d.price + "</span>";
    str+='<div class="text-muted">'+checkNull(d.description).substring(0, 50)+ '...</div>';
    str += "  </div>";
    // str += ' <div class="add-cart">';

    // str +=
    //   '     <a class="add" href="' +
    //   URLPATH +
    //   "DealsDetail/" +
    //   d.id +
    //   '">View </a>';
    // str += " </div>";
    str += " </div>";
    str += "</div>";
    str += "</div>";
    str += "</div>";
    str += "</div>";

    str += "</div>";
  });
  DivShow.append(str);
  SetTimerCart();
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

for (let i = 0; i < SortCombo.length; i++) {
  SortCombo[i].onclick = (e) => {
    $(".sort-by").trigger("click");
    $(".sort-by").text(
      "\n                                    Sort by: the " +
        e.currentTarget.text +
        "\n                                "
    );
    $(".orderCl").removeClass("active");
    SortCombo[i].classList.add("active");
    orders = e.currentTarget.dataset.value;
    ResetData();
  };
}
$("#city").on("tokenize:tokens:remove", function (e, value) {
  country = "";
  province = "";
  city = "";
  ResetData();
});

SetCatSearch((data)=>{
  MoreCategories.SetDataMoreWithoutParent(data);
  $("#category_id1").html(data.name);
  $("#category_id1").removeClass("p-3");
  $("#category_id1").addClass("p-4");
  ResetData();

})

$("#category_id1").removeClass("p-3");
$("#category_id1").addClass("p-4");
$("#category_id1").css('height','fit-content');