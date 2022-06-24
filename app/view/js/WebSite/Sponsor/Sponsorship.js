import { numberFormat } from "../../functions/numberFormat.js";
import { block, unblock } from "../../functions/Block.js";
import { Fetching } from "../../Fetch/Common.js";
import { URL, URLPATH } from "../../Fetch/Setting.js";
import {  SendDataFormGetData } from '../../functions/Common.js'

let MoreCategoryC = await import("../../Class/MoreCategory.js?v=" + Date.now());

const MoreCategory = MoreCategoryC.MoreCategory;

const MoreCategories = new MoreCategory("business");
const SaveToList = document.getElementById("SaveToList");
const Company=document.getElementById("company");
const Contact=document.getElementById("contact");
const Tel=document.getElementById("tel");
const Mobile=document.getElementById("mobile");
const Email=document.getElementById("email");
const Tax=document.getElementById("taxV");

let price = 0;
let totalPrice=0;
let idArray = [];

const SetCheckBox = () => {
  let ch = document.getElementsByClassName("cheB");
  let Info = document.getElementsByClassName("check-info");
  for (let i = 0; i < ch.length; i++) {
    ch[i].onchange = (e) => {
      let checked = e.currentTarget.checked;
      let value = e.currentTarget.value;
      let id = e.currentTarget.id;

      if (checked) {
        price = parseFloat(price) + parseFloat(value);
        idArray.push(id);
      } else {
        price = parseFloat(price) - parseFloat(value);
        const index = idArray.indexOf(id);
        if (index > -1) {
          idArray.splice(index, 1);
        }
      }
      let tx=Tax.value;
      totalPrice=price + (price * +tx) / 100;
      $("#order_price").html(
        '<span class=""> $' + numberFormat(price) + "</span>"
      );
      $("#total_price").html(
        '<span class="h6"> $' +
          numberFormat(totalPrice) +
          "</span>"
      );
    };
  }

  for (let i = 0; i < Info.length; i++) {
    Info[i].onclick = (e) => {
      let id = e.currentTarget.dataset.id;
      ShowInfo(id);
    };
  }
};



const ShowInfo = (id) => {
  block();
  Fetching("sponsorship/get", { idSearch: id }).then((data) => {
    unblock();
    if (data.data.data[0] !== undefined) {
      let d = data.data.data[0];
      $("#title_view").html("<h2>" + d.title + "</h2>");
      if (d.sponsorship_tag !== "" && d.sponsorship_tag !== null) {
        let str = "";
        let links = d.sponsorship_tag.split(",");
        links.forEach((e) => {
          let linkData = e.split("::");
          str += '<div class="alert alert-info">';
          str += '<a href="' + linkData[2] + '">';
          str += "<div><strong>" + linkData[1] + "</strong></div>";
          str += "<div>" + linkData[3] + "</div>";
          str += "</a>";
        });
        $("#Links").html(str);
      }
      $("#price").html(
        "<span>price : <strong> $" + numberFormat(d.price) + "</strong></span>"
      );
      $("#description_view").html(
        "<div> details: <p>" + d.description + "</p></div>"
      );
      if (d.sponsorship_gallery !== "" && d.sponsorship_gallery !== null) {
        let gallery = d.sponsorship_gallery.split(",");
        let str="";
        gallery.forEach((e) => {
          let imgs = e.split("::");
        
          str +=
            '<img class="img-radus" src="' +
            URL +
            imgs[1] +
            "/middle/" +
            imgs[2] +
            '">';
        });
        $("#img_gallery").html(str);
      }
    }

    $("#ModalView").modal("show");
  });
};

SaveToList.onclick = () => {
    SendDataFormGetData(SaveToList,"frmNew","sponsorship/newRequest",[
        Company,Contact,Tel,Mobile,Email
    ],[
    
        {name:"option",value:JSON.stringify(idArray)},
        { name: "category_id", value: MoreCategories.GetCatId().toString() },

    ],false,(data,param)=>{
      
        location.href=URLPATH+"PaymentSponsorship/"+data.data.id;
    })
};

SetCheckBox();
MoreCategories.AddCategoryInput($("#more_category"));
$("#category_id1").addClass("middle-radius");
