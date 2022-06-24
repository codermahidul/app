import { block, unblock } from "../../functions/Block.js";

import { CheckCaptcha } from "../../functions/Checked.js";
import { ShowLoginModal } from "../LoginModal.js";
import { SwaleError } from "../../functions/SwalDelete.js";
import { URLPATH } from "../../Fetch/Setting.js";

let Comments=await import("./Comment.js?v="+Date.now());
let Common = await import("../../Fetch/Common.js?v=" + Date.now());


const Fetching= Common.Fetching;
const AddLoginUrl= Common.AddLoginUrl;
const SetToFirst=Comments.SetToFirst;
const showComment=Comments.showComment;
const typeCreator = document.getElementById("type_creator").value;
const Logged = document.getElementById("logged").value;

const AddReview = document.getElementById("btnReview");
const AddRate = document.getElementById("btnRate");
const ModalRate = $("#modalRate");
const ModalReview = $("#modalReview");
const RateForm = document.getElementById("frmNewRate");
const SaveRate = document.getElementById("saveRate");
const SaveReview = document.getElementById("addReview");
const SaveReply = document.getElementById("addReply");

let ids = [];

const SetFun = () => {
  let bought = document.getElementById("bought");

  bought.onchange = (e) => {
    boughtChange(e);
  };
};

const SetFun2 = () => {
  let bought = document.getElementById("boughtReview");
  bought.onchange = (e) => {
    ReviewBoughtChange(e);
  };
};

if(AddReview !==null){

  AddReview.onclick = () => {
    if (Logged === "false") {
      //ShowLoginModal();
      AddLoginUrl();
      window.location.href = URLPATH + "LOGIN";
      return false;
    }
  
    if (typeCreator !== "user") {
      SwaleError("Only general users are allowed to do this");
      return false;
    }
  
    let datas = AddReview.dataset;
    $("#boughtReview").val("");
    $("#text").val("");
    ModalReview.modal("show");
    SetFun2();
  };
}

if(AddRate !==null){
  AddRate.onclick = () => {
    if (Logged === "false") {
      AddLoginUrl();
      // ShowLoginModal();
      window.location.href = URLPATH + "LOGIN";
      return false;
    }
  
    if (typeCreator !== "user") {
      SwaleError("Only general users are allowed to do this");
      return false;
    }
    let datas = AddRate.dataset;
    let category_id = datas.cat;
  
    block();
    Fetching("category/getQuestions", { category_id }).then((data) => {
      unblock();
      ModalRate.modal("show");
      ShowQuestions(data);
    });
  };
}


const ShowQuestions = (data) => {
  RateForm.innerHTML = "";
  ids = [];
  let datas = data.data.data;
  let str = "";
  if (datas.length > 0) {
    str += '<div class="mb-3">';
    str +=
      '<label for="recipient-name" class="col-form-label"><span class="text-danger">*</span>Have you bought this product?</label>';
    str += '<select class="form-control" name="bought" id="bought">';
    str += "<option></option>";
    str += '<option value="1">Yes</option>';
    str += '<option value="0">No</option>';
    str += "</select>";
    str += "</div>";

    str += createStoreHtml();

    str += "</select>";
    str += "</div>";
  }
  datas.forEach((d) => {
    str += '<div class="mb-3 row">';
    str +=
      '<div class="col-md-12"><label for="recipient-name" class="col-form-label">' +
      d.text +
      "</label></div>";
    str += '<div class="col-md-12">';
    str += CreateStar(d.id);
    str += "</div>";
    str += "</div>";

    ids.push(d.id);
  });

  RateForm.innerHTML = str;
  SetFun();
};

const boughtChange = (e) => {
  let value = e.currentTarget.value;
  if (value == "1") {
    $("#storDiv").css("display", "");
    ShowStoreList();
  } else {
    $("#storDiv").css("display", "none");
  }
};

const ReviewBoughtChange = (e) => {
  let value = e.currentTarget.value;
  if (value == "1") {
    $("#storDivR").css("display", "");
    ShowStoreList();
  } else {
    $("#storDivR").css("display", "none");
  }
};

SaveRate.onclick = () => {
  // if (!CheckCaptcha())
  // return false;

  if ($("#bought").val() === "") {
    toast("Please specify if you have already crushed this product", "error");
    return false;
  }

  let questions = [];

  for (let i = 0; i < ids.length; i++) {
    questions.push({
      question_id: ids[i],
      rate: $('input[name="rate' + ids[i] + '"]:checked').val(),
    });
  }

  let formData = {
    questions: JSON.stringify(questions),
    bought: $("#bought").val(),
    product_id: $("#product_id").val(),
  };
  if ($("#bought").val() == "1") {
    if ($("#store").val()[0] !== undefined) {
      if (!isNaN($("#store").val()[0])) {
        formData["store_id"] = $("#store").val()[0];
      } else {
        formData["store_name"] = $("#store").val()[0];
      }
    }
  }

  block();
  Fetching("product/rate", formData).then((data) => {
    unblock();
    if (data.status == "true") {
      toast("successfully", "successful");
      ModalRate.modal("hide");
    } else {
      toast(data.err, "error");
    }
  });
};

SaveReview.onclick = () => {
  // if (!CheckCaptcha())
  // return false;
  if ($("#boughtReview").val() === "") {
    toast("Please specify if you have already crushed this product", "error");
    return false;
  }

  let modal = SaveReview.dataset.id;
  block();

  let val = $("#text").val();

  let param = {
    text: val,
    product_id: $("#product_id").val(),
    bought: $("#boughtReview").val(),
  };

  if ($("#boughtReview").val() == "1") {
    if ($("#storeR").val()[0] !== undefined) {
      if (!isNaN($("#storeR").val()[0])) {
        param["store_id"] = $("#storeR").val()[0];
      } else {
        param["store_name"] = $("#storeR").val()[0];
      }
    }
  }

  Fetching("product/addNewComment", param).then((data) => {
    unblock();
    SetToFirst();
    showComment("product/getComment");
    $("#" + modal).modal("hide");
  });
};

SaveReply.onclick = () => {
  // if (!CheckCaptcha())
  // return false;

  let type_user = $("#type_creator").val();
  let modal = SaveReply.dataset.id;
  block();

  let val = $("#textR").val();

  let param = {
    text: val,
    product_id: $("#product_id").val(),
    on_creator_type: $("#on_creator_type").val(),
  };
  let on_comment_id = $("#on_comment_id").val();
  let on_creator_id = $("#on_creator_id").val();
  if (on_comment_id !== "") {
    param["on_comment_id"] = on_comment_id;
  }

  if (on_creator_id !== "") {
    param["on_creator_id"] = on_creator_id;
  }

  let urls = "product/addReplyComment";
  if (type_user === "business") {
    urls = "product/addReplyCommentBusiness";
    param["creator_type"] = typeCreator;
  }

  Fetching(urls, param).then((data) => {
    unblock();
    SetToFirst();
    showComment("product/getComment");
    $("#" + modal).modal("hide");
  });
};

const CreateStar = (id) => {
  let str = "";
  str += '<div class="rate">';
  str +=
    '<input class="question" type="radio" id="star5_' +
    id +
    '" name="rate' +
    id +
    '" value="5" />';
  str += '<label for="star5_' + id + '" title="text">5 stars</label>';
  str +=
    '<input class="question" type="radio" id="star4_' +
    id +
    '" name="rate' +
    id +
    '" value="4" />';
  str += '<label for="star4_' + id + '" title="text">4 stars</label>';
  str +=
    '<input class="question" type="radio" id="star3_' +
    id +
    '" name="rate' +
    id +
    '" value="3" />';
  str += '<label for="star3_' + id + '" title="text">3 stars</label>';
  str +=
    '<input class="question" type="radio" id="star2_' +
    id +
    '" name="rate' +
    id +
    '" value="2" />';
  str += '<label for="star2_' + id + '" title="text">2 stars</label>';
  str +=
    '<input class="question" type="radio" id="star1_' +
    id +
    '" name="rate' +
    id +
    '" value="1" />';
  str += '<label for="star1_' + id + '" title="text">1 star</label>';
  str += "</div>";

  return str;
};

const createStoreHtml = () => {
  let str = "";
  str += '<div id="storDiv" style="display:none" class="mb-3">';
  str +=
    '<label for="recipient-name" class="col-form-label">Search for the store you bought and if it is not found, type it and press Enter:</label>';
  str += '<select  style="width: 100%"';
  str +=
    'class="form-control min-radus  tokenize-custom-demo1 " multiple name="store" id="store">';
  return str;
};

const ShowStoreList = () => {
  $(".tokenize-custom-demo1").tokenize2({
    tokensAllowCustom: true,
    tokensMaxItems: 1,
    dataSource: function (search, object) {
      Fetching("fetchData/proof_get", { title: search, type: "store" }).then(
        (data) => {
          let items = [];
          let datas = data.data.data;
          for (let i = 0; i < datas.length; i++) {
            items.push({ value: datas[i].id, text: datas[i].title });
          }
          object.trigger("tokenize:dropdown:fill", [items]);
        }
      );
    },
  });
};

showComment("product/getComment");
