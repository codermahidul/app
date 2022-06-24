import "../../tokeniz/tokenize2.js";

import { Fetching, FetchingFile } from "../Fetch/Common.js";
import { block, unblock } from "./Block.js";

import { ClickBanner } from "../WebSite/Layout/Header.js";
import { URL } from "../Fetch/Setting.js";
import checkValue from "./Checked.js";

let getObjFormDataF = await import("./ObjectFormData.js?v=" + Date.now());

const getObjFormData = getObjFormDataF.default;

export const parents = [];
export const IdsParent = [];

export const setFormElementValue = (data) => {
  for (var key in data) {
    var value = data[key];
    let el = document.getElementById(key);
    if (el !== null) {
      if (el.classList.contains("select2")) {
        $("#" + key)
          .val(value)
          .trigger("change");
      } else el.value = value;

      if (el.type === "radio") {
        $("input[name=" + key + "][value=" + value + "]").prop("checked", true);
      }
    }
  }
};

export const setFormElementValueEdit = (data) => {
  for (var key in data) {
    var value = data[key];
    let el = document.getElementById(key + "_e");
    if (el !== null) {
      if (el.classList.contains("select2")) {
        $("#" + key)
          .val(value)
          .trigger("change");
      } else el.value = value;

      if (el.type === "radio") {
        $("input[name=" + key + "][value=" + value + "]").prop("checked", true);
      }
    }
  }
};

export const resetForm = (id, select = true) => {
  document.getElementById(id).reset();
  if (select) {
    $("select").val("").change();
  }
};

export const SetEnterSave = (classes = "inp-enter", Btn) => {
  let inp = document.getElementsByClassName(classes);
  for (let i = 0; i < inp.length; i++) {
    inp[i].onkeypress = (e) => {
      let key = e.which;
      if (key == 13) {
        // the enter key code
        Btn.click();
      }
    };
  }
};

export const SetEnterFun = (classes = "inp-enter", fun = () => {}) => {
  let inp = document.getElementsByClassName(classes);
  for (let i = 0; i < inp.length; i++) {
    inp[i].onkeypress = (e) => {
      let key = e.which;
      if (key == 13) {
        // the enter key code
        fun();
      }
    };
  }
};

export const EmptyCatId = (arr) => {
  arr.length = 0;
};

export const nlbrs = (string) => {
  if (string !== "" && string !== null) {
    return string.replace(/\n/g, "<br />");
  }
  return "";
};

export const fileInput = (
  className,
  TitleDrag = "Drag & drop Image here &hellip;",
  Extention = ["jpg", "png", "jpeg"]
) => {
  $("." + className).fileinput({
    theme: "fas",

    showUpload: false,
    showCaption: false,
    maxFileSize: 7000,
    maxFileCount: 20,
    allowedFileExtensions: Extention,
    initialPreviewShowDelete: true,
    dropZoneTitle: TitleDrag,
  });
  $(".close.fileinput-remove").css("display", "none");
};

export const fileInputCleare = (id) => {
  $("#" + id).fileinput("clear");
};

export const SendDataForm = (
  btn,
  form,
  url,
  check = [],
  add = [],
  setNull = false,
  backfun = "",
  selcetReset = true,
  param = {}
) => {
  let checkValues = true;
  for (let i = 0; i < check.length; i++) {
    if (!checkValue(check[i])) {
      checkValues = false;
      break;
    }
  }
  if (!checkValues) return false;

  block();
  btn.disabled = true;
  let formData = getObjFormData(form, setNull);
  if (add.length > 0) {
    for (let i = 0; i < add.length; i++)
      formData = { ...formData, ...{ [add[i].name]: add[i].value } };
  }

  Fetching(url, formData).then((data) => {
    btn.disabled = false;
    unblock();
    if (data.status === "true") {
      toast("successful", "success");
      if (backfun !== "") backfun(param);

      resetForm(form, selcetReset);
    } else {
      toast(data.err, "error");
    }
  });
};

export const SendDataFormGetData = (
  btn,
  form,
  url,
  check = [],
  add = [],
  setNull = false,
  backfun = "",
  selcetReset = true,
  param = {}
) => {
  let checkValues = true;
  for (let i = 0; i < check.length; i++) {
    if (!checkValue(check[i])) {
      checkValues = false;
      break;
    }
  }
  if (!checkValues) return false;

  block();
  btn.disabled = true;
  let formData = getObjFormData(form, setNull);
  if (add.length > 0) {
    for (let i = 0; i < add.length; i++)
      formData = { ...formData, ...{ [add[i].name]: add[i].value } };
  }

  Fetching(url, formData).then((data) => {
    btn.disabled = false;
    unblock();
    if (data.status === "true") {
      toast("successful", "success");
      if (backfun !== "") backfun(data, param);

      resetForm(form, selcetReset);
    } else {
      toast(data.err, "error");
    }
  });
};

export const SendDataFormFile = (
  btn,
  form,
  url,
  check = [],
  add = [],
  setNull = false,
  backfun = "",
  selcetReset = true,
  param = {}
) => {
  let checkValues = true;
  for (let i = 0; i < check.length; i++) {
    if (!checkValue(check[i])) {
      checkValues = false;
      break;
    }
  }
  if (!checkValues) return false;

  block();
  btn.disabled = true;
  let form_data = new FormData();
  let formData = getObjFormData(form, setNull);

  for (let key in formData) {
    form_data.append(key, formData[key]);
  }

  form_data.append("img", $("#main_image")[0].files[0]);

  if (add.length > 0) {
    for (let i = 0; i < add.length; i++) {
      form_data.append(add[i].name, add[i].value);
    }
  }

  FetchingFile(url, form_data).then((data) => {
    btn.disabled = false;
    unblock();
    if (data.status === "true") {
      toast("successful", "success");
      if (backfun !== "") backfun(param);

      resetForm(form, selcetReset);
    } else {
      toast(data.err, "error");
    }
  });
};

export const SendDataFormFileMulti = (
  btn,
  form,
  url,
  check = [],
  add = [],
  setNull = false,
  backfun = "",
  selcetReset = true,
  param = {}
) => {
  let checkValues = true;
  for (let i = 0; i < check.length; i++) {
    if (!checkValue(check[i])) {
      checkValues = false;
      break;
    }
  }
  if (!checkValues) return false;

  block();
  btn.disabled = true;
  let form_data = new FormData();
  let formData = getObjFormData(form, setNull);

  for (let key in formData) {
    form_data.append(key, formData[key]);
  }

  for (let i = 0; i < $("#main_image")[0].files.length; i++) {
    form_data.append("img" + i, $("#main_image")[0].files[i]);
  }

  if (add.length > 0) {
    for (let i = 0; i < add.length; i++) {
      form_data.append(add[i].name, add[i].value);
    }
  }

  FetchingFile(url, form_data).then((data) => {
    btn.disabled = false;
    unblock();
    if (data.status === "true") {
      toast("successful", "success");
      if (backfun !== "") backfun(param);

      resetForm(form, selcetReset);
    } else {
      toast(data.err, "error");
    }
  });
};

export const tokenizAjax = (
  className,
  Custom = false,
  url,
  param,
  SearchName = "title",
  tokensMaxItems = "0",
  text = "title"
) => {
  $("." + className).tokenize2({
    tokensAllowCustom: Custom,
    tokensMaxItems,
    dataSource: function (search, object) {
      let params = { ...param, ...{ [SearchName]: search } };
      Fetching(url, params).then((data) => {
        let items = [];
        let datas = data.data.data;
        for (let i = 0; i < datas.length; i++) {
          items.push({ value: datas[i].id, text: datas[i][text] });
        }
        object.trigger("tokenize:dropdown:fill", [items]);
      });
    },
  });
};

export const tokenizAjaxUser = (
  className,
  Custom = false,
  url,
  param,
  SearchName = "title",
  tokensMaxItems = "0"
) => {
  $("." + className).tokenize2({
    tokensAllowCustom: Custom,
    tokensMaxItems,
    dataSource: function (search, object) {
      let params = { ...param, ...{ [SearchName]: search } };
      Fetching(url, params).then((data) => {
        let items = [];
        let datas = data.data.data;
        for (let i = 0; i < datas.length; i++) {
          items.push({ value: datas[i].id, text: datas[i].display_name });
        }
        object.trigger("tokenize:dropdown:fill", [items]);
      });
    },
  });
};

export const tokenizAjaxPrize = (
  className,
  Custom = false,
  url,
  param,
  SearchName = "title",
  tokensMaxItems = "0"
) => {
  $("." + className).tokenize2({
    tokensAllowCustom: Custom,
    tokensMaxItems,
    dataSource: function (search, object) {
      let params = { ...param, ...{ [SearchName]: search } };
      Fetching(url, params).then((data) => {
        let items = [];
        let datas = data.data.data;
        for (let i = 0; i < datas.length; i++) {
          items.push({
            value: datas[i].id,
            text: datas[i].title + ", exist numbers : " + datas[i].jnumber,
          });
        }
        object.trigger("tokenize:dropdown:fill", [items]);
      });
    },
  });
};

export const tokenizAjaxCity = (
  className,
  Custom = false,
  url,
  param,
  SearchName = "title",
  tokensMaxItems = "0"
) => {
  $("." + className).tokenize2({
    tokensAllowCustom: Custom,
    tokensMaxItems,
    dataSource: function (search, object) {
      let params = { ...param, ...{ [SearchName]: search } };
      Fetching(url, params).then((data) => {
        let items = [];
        let datas = data.data.data;
        for (let i = 0; i < datas.length; i++) {
          items.push({ value: datas[i].value, text: datas[i].name });
        }
        object.trigger("tokenize:dropdown:fill", [items]);
      });
    },
  });
};

export const tokenizAjaxTypeUser = (
  className,
  Custom = false,
  url,
  param,
  SearchName = "title",
  tokensMaxItems = "0"
) => {
  $("." + className).tokenize2({
    tokensAllowCustom: Custom,
    tokensMaxItems,
    dataSource: function (search, object) {
      let params = { ...param, ...{ [SearchName]: search } };
      Fetching(url, params).then((data) => {
        let items = [];
        let datas = data.data.data;
        for (let i = 0; i < datas.length; i++) {
          let type = "user";
          if (datas[i].fname === undefined) {
            type = "user_business";
          }
          items.push({
            value: datas[i].id + "," + type,
            text: datas[i].display_name,
          });
        }
        object.trigger("tokenize:dropdown:fill", [items]);
      });
    },
  });
};

export const tokenizClear = (className) => {
  $("." + className)
    .tokenize2()
    .trigger("tokenize:clear");
};

export const GetTokenOnChoose = (id) => {
  $("#" + id).on("tokenize:tokens:add", function (e, value) {
    return value;
  });
};

export const tokenizClearById = (id) => {
  $("#" + id)
    .tokenize2()
    .trigger("tokenize:clear");
};

export const tokenizSetValue = (id, value, title) => {
  $("#" + id)
    .tokenize2()
    .trigger("tokenize:tokens:add", [value, title, true]);
};

export const GetCategoryData = (param, fun) => {
  Fetching("fetchdata/getCategory", param).then((data) => {
    fun(data);
  });
};

export const CreateListCategory = (data, divID, parent) => {
  let div = $("#" + divID);
  div.html("");
  let str = "";

  if (data[0] != undefined) {
    if (parseInt(data[0].parent) > 0) {
      str += '<div class="col-md-12 mb-3">';
      str +=
        '<button id="btn-back-cat" data-type="' +
        data[0].type +
        '" data-parent="' +
        parent +
        '" class="btn btn-glass btn-cat-back">back</button>';
      str += "</div>";
    }
  }

  data.forEach((element) => {
    str += '<div class="col-md-12 row border-bottom  p-2 mb-1"> ';

    if (element.have_children === "true") {
      str +=
        '<div data-id="' +
        element.id +
        '" data-parent="' +
        element.parent +
        '" class="col-md-12 grid-two-div point catNext">';
      str += "<span >" + element.name + "</span>";
      str += '<span class=" text-end">';
      str += '<i  class="bi bi-arrow-right-circle-fill h5 "></i>';
      str += "</span>";
      str += "</div>";
    } else {
      str +=
        '<div data-id="' +
        element.id +
        '" data-name="' +
        element.name +
        '" class="col-md-12 grid-two-div point catSet">';
      str += "<span >" + element.name + "</span>";
      str += '<span class=" text-end">';
      str += '<i  class="bi bi-check-lg h5 "></i>';
      str += "</span>";
      str += "</div>";
    }

    str += "</div>";
  });
  div.html(str);
};

export const GetIdFromUrl = () => {
  let params = window.location.pathname.split("/");
  return params[params.length - 1];
};

export const checkNull = (str) => {
  if (str === null) return "";
  return str;
};

export const setSelectMulti = (
  placeholder = "Select One ...",
  close = false
) => {
  $(".select2").select2({
    placeholder,
    allowClear: true,
    closeOnSelect: close,
    multiple: true,
  });
};

export const setSelects = (placeholder = "Select One ...") => {
  $(".select2").select2({
    placeholder,
    allowClear: true,
    closeOnSelect: true,
  });
};

export const setSelectsClass = (classes, placeholder = "Select One ...") => {
  $("." + classes).select2({
    placeholder,
    allowClear: true,
    closeOnSelect: true,
  });
};

export const setSelectsClassModal = (
  classes,
  placeholder = "Select One ...",
  Modal = "ModalAdd"
) => {
  $("." + classes).select2({
    dropdownParent: $("#" + Modal),
    allowClear: true,
    closeOnSelect: true,
    placeholder,
  });
};

$("#sRelease, #sReleaseCandidate").select2({
  tags: true,
  dropdownParent: $("#modelDialog1"),
});
export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

export const GetBanner = (DivShow, section, category = "", program = "") => {
  Fetching("setting/getBannerOrders", {
    section_name: section,
    type: "big",
    category_id: category,
    proof_id: program,
  }).then((data) => {
    if (data.data.data.length > 1) {
      let d = data.data.data[1];

      let img = URL + d.file_url + "/" + d.file_name;
      let str = "";
      str += '<div class="col-md-12 text-center">';
      if (d.calculate_type === "click") {
        str +=
          '<a class="clickBanner" data-id=' +
          d.id +
          ' href="' +
          d.link +
          '"><img class="img-radus" src="' +
          img +
          '" alt="adBanner"></a>';
      } else {
        str +=
          '<a href="' +
          d.link +
          '"><img class="img-radus" src="' +
          img +
          '" alt="adBanner"></a>';
      }
      str += "</div>";

      DivShow.append(str);
    }
    ClickBanner();
  });
};

export const SetTimerCart=()=>{
  $("[data-countdown]").each(function () {
    var $this = $(this),
        finalDate = $(this).data("countdown");
    $this.countdown(finalDate, function (event) {
        $(this).html(event.strftime("" + '<span class="countdown-section"><span class="countdown-amount hover-up">%D</span><span class="countdown-period"> days </span></span>' + '<span class="countdown-section"><span class="countdown-amount hover-up">%H</span><span class="countdown-period"> hours </span></span>' + '<span class="countdown-section"><span class="countdown-amount hover-up">%M</span><span class="countdown-period"> mins </span></span>' + '<span class="countdown-section"><span class="countdown-amount hover-up">%S</span><span class="countdown-period"> sec </span></span>'));
    });
});
}
export const setSelectMultiId = (Id,placeholder = "Select One ...", close = false) => {

  $('#'+Id).select2({
    placeholder,
    allowClear: true,
    closeOnSelect: close,
    multiple: true,
  });
}
