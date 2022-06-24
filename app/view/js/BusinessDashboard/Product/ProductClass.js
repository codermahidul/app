import { CreateSelectOption, Fetching } from "../../Fetch/Common.js";
import { URL, URLPATH } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";
import {
  checkNull,
  GetIdFromUrl,
  SendDataForm,
  SendDataFormFile,
  setSelectMulti,
} from "../../functions/Common.js";
import { numberFormat } from "../../functions/numberFormat.js";
import getObjFormData from "../../functions/ObjectFormData.js";

let MoreCategoryC = await import("../../Class/MoreCategory.js?v=" + Date.now());
let Cites = await import("../Product/CityWithoutModal.js?v=" + Date.now());

const MoreCategory = MoreCategoryC.MoreCategory;
const GetCity = Cites.GetCity;
const GetCountry = Cites.GetCountry;
const GetProvince = Cites.GetProvince;
const SetVal = Cites.SetVal;

export class ProductClass {
  constructor(frm, href) {
    this.frm = frm;
    this.href = href;
    this.index = 2;
    this.MoreCategories = new MoreCategory("product");
    this.title = document.getElementById("title");
    this.title_e = document.getElementById("title_e");
    if ($("#more_cat").length > 0)
      this.MoreCategories.AddCategoryInput($("#more_cat"));
    this.SetProof();
  }

  reset = () => {
    this.index = 2;
    this.MoreCategories.ResetMoreCat();
  };

  resetAllCat = (id) => {
    this.MoreCategories.ResetMoreCat();
    this.MoreCategories.RemoveCategoryInput(id);
  };

  AddCategory = (id) => {
    if ($("#" + id).length > 0)
      this.MoreCategories.AddCategoryInput($("#" + id));
  };

  AddCategoryE = (id) => {
    if ($("#" + id).length > 0)
      this.MoreCategories.AddCategoryInput($("#" + id));
  };

  CreateLink = (id, edit = "") => {
    let div = $("#" + id);

    let str = "";
    str += ' <div class="col-md-4">';
    str +=
      ' <label for="recipient-name" class="col-form-label">Link type:</label>';
    str +=
      '  <select id="ltype' +
      edit +
      this.index +
      '" class="input-white min-radus select-css link-type">';
    str += '  <option value=""></option>';
    str += '   <option value="buy">Buy </option>';
    str += '   <option value="video">Video</option>';

    str += "  </select>";
    str += " </div>";

    str += ' <div class="col-md-4">';
    str +=
      ' <label for="recipient-name" class="col-form-label">Link Title:</label>';
    str +=
      '  <input id="ltitle' +
      edit +
      this.index +
      '" type="text" autocomplete="off" class="input-white min-radus link-title">';
    str += " </div>";
    str += ' <div class="col-md-4">';
    str +=
      ' <label for="recipient-name" class="col-form-label">Link Address:</label>';
    str +=
      ' <input id="ltag' +
      edit +
      this.index +
      '" type="text" autocomplete="off" class="input-white min-radus link-tag">';
    str += " </div>";

    div.append(str);
    this.index++;
  };

  GetLinkValue = (edit = false) => {
    let valS = "";

    for (let i = 1; i < this.index; i++) {
      let t = "ltitle";
      let ta = "ltag";
      let typ = "ltype";
      if (edit) {
        t = "ltitle_e";
        ta = "ltag_e";
        typ = "ltype_e";
      }

      let title = $("#" + t + i).val();
      let tags = $("#" + ta + i).val();
      let types = $("#" + typ + i).val();
      if (i < this.index - 1) {
        valS += title + "::" + tags + "::" + types + ",";
      } else valS += title + "::" + tags + "::" + types;
    }

    return valS;
  };

  ResetLink = (id = "more_link", edit = "") => {
    $("#" + id).html("");
    this.index = 1;
    this.CreateLink(id, edit);
  };

  AddNew = (
    Btn,
    url,
    form = this.frm,
    fn = () => {
      window.location.href = URLPATH + this.href;
    }
  ) => {
    let online = "0";
    if ($("#online").is(":checked")) {
      online = "1";
    }
    if (this.MoreCategories.GetCatId().toString() == "") {
      toast("Please Choose Category", "error");
      return false;
    }

    SendDataFormFile(
      Btn,
      form,
      url,
      [this.title],
      [
        { name: "online", value: online },
        { name: "country_id", value: GetCountry() },
        { name: "province_id", value: GetProvince() },
        { name: "city_id", value: GetCity() },
        {
          name: "categorys",
          value: JSON.stringify(this.MoreCategories.GetCatIdParent()),
        },
        {
          name: "category_id",
          value: this.MoreCategories.GetCatId().toString(),
        },
        { name: "product_link", value: this.GetLinkValue() },
      ],
      false,
      () => {
        this.reset();

        fn();
      },
      false
    );
  };

  AddNewForUser = (
    Btn,
    url,
    form = this.frm,
    fn = () => {
      window.location.href = URLPATH + this.href;
    }
  ) => {
    let online = "0";
    if ($("#online").is(":checked")) {
      online = "1";
    }
    if (this.MoreCategories.GetCatId().toString() == "") {
      toast("Please Choose Category", "error");
      return false;
    }

    SendDataFormFile(
      Btn,
      form,
      url,
      [this.title],
      [
        { name: "online", value: online },
        { name: "country_id", value: GetCountry() },
        { name: "province_id", value: GetProvince() },
        { name: "city_id", value: GetCity() },
        {
          name: "categorys",
          value: JSON.stringify(this.MoreCategories.GetCatIdParent()),
        },
        {
          name: "category_id",
          value: this.MoreCategories.GetCatId().toString(),
        },
        { name: "product_link", value: this.GetLinkValue() },
        { name: "for_user", value: "1" },
        { name: "user_business_id", value: GetIdFromUrl() },
      ],
      false,
      () => {
        this.reset();

        fn();
      },
      false
    );
  };

  show_more_link = (str) => {
    if (str === null || str === "") {
      $("#ltitle_e1").val("");
      $("#ltag_e1").val("");
      $("#ltype_e1").val("");
      return false;
    }
    let data = str.split(",");
    for (let i = 0; i < data.length; i++) {
      let d = data[i].split("::");
      if (i + 1 > 1) this.CreateLink("more_link_e", "_e");

      $("#ltitle_e" + (i + 1)).val(d[1]);
      $("#ltag_e" + (i + 1)).val(d[2]);
      $("#ltype_e" + (i + 1)).val(d[3]);
    }
  };

  show_more_linkWithoutModal = (str) => {
    if (str === null || str === "") {
      $("#ltitle1").val("");
      $("#ltag1").val("");
      $("#ltype1").val("");
      return false;
    }
    let data = str.split(",");
    for (let i = 0; i < data.length; i++) {
      let d = data[i].split("::");
      if (i + 1 > 1) this.CreateLink("more_link", "");

      $("#ltitle" + (i + 1)).val(d[1]);
      $("#ltag" + (i + 1)).val(d[2]);
      $("#ltype" + (i + 1)).val(d[3]);
    }
  };

  ViewInfo = (url, param, fn = () => {}) => {
    Fetching(url, param).then((data) => {
      let d = data.data.data[0];
      $("#img").html("");
      if (
        d.file_url !== "" &&
        d.file_url !== null &&
        d.file_name !== "" &&
        d.file_name !== null
      ) {
        $("#img").html(
          '<img class="rounded" src="' +
            URL +
            d.file_url +
            "/thumb/" +
            d.file_name +
            '">'
        );
      }
      let city = "Online";
      if (d.online !== "1") {
        city =
          checkNull(d.country_name) +
          " , " +
          checkNull(d.province_name) +
          " , " +
          checkNull(d.city_name);
      }

      $("#title_view").html(d.title);
      $("#price").html(
        "price: $" + "<strong>" + numberFormat(d.price) + "</strong>"
      );
      $("#category_view").html(
        "category: " + "<strong>" + d.category_name + "</strong>"
      );
      $("#city_view").html("Location : " + "<strong>" + city + "</strong>");
      $("#description_view").html(d.description);
      let elstr = "";
      if (d.product_tag !== "" && d.product_tag !== null) {
        let links = d.product_tag.split(",");
        elstr += "<h5 class='mb-3 text-dark mt-3'>Buy Links</h5>";
        links.forEach((e) => {
          let datae = e.split("::");
          let type = datae[3];
          let href = datae[2];
          let title = datae[1];
          if (type === "buy") {
            elstr +=
              "<a class='mb-2 hrefs' target='_blank' href='" +
              href +
              "'>" +
              title +
              "</a>";
          }
        });

        elstr += "<h5 class='mb-3 text-dark mt-3'>Video Links</h5>";
        links.forEach((e) => {
          let datae = e.split("::");
          let type = datae[3];
          let href = datae[2];
          let title = datae[1];
          if (type === "video") {
            elstr +=
              "<a class='mb-2 hrefs' target='_blank' href='" +
              href +
              "'>" +
              title +
              "</a>";
          }
        });
      }

      $("#Links").innerHTML = elstr;
      fn();
    });
  };

  EditInfo = (
    Btn,
    url,
    form = this.frm,
    fn = () => {
      window.location.href = URLPATH + this.href;
    }
  ) => {
    let online = "0";
    if ($("#online").is(":checked")) {
      online = "1";
    }
    if (this.MoreCategories.GetCatId().toString() == "") {
      toast("Please Choose Category", "error");
      return false;
    }

    SendDataForm(
      Btn,
      form,
      url,
      [this.title_e],
      [
        { name: "online", value: online },
        { name: "country_id", value: GetCountry(true) },
        { name: "province_id", value: GetProvince(true) },
        { name: "city_id", value: GetCity(true) },
        {
          name: "categorys",
          value: JSON.stringify(this.MoreCategories.GetCatIdParent()),
        },
        {
          name: "category_id",
          value: this.MoreCategories.GetCatId().toString(),
        },
        { name: "product_link", value: this.GetLinkValue(true) },
      ],
      false,
      () => {
        fn();
      },
      false
    );
  };

  EditInfoWithoutModal = (
    Btn,
    url,
    form = this.frm,
    fn = () => {
      window.location.href = URLPATH + this.href;
    }
  ) => {
    let online = "0";
    if ($("#online").is(":checked")) {
      online = "1";
    }
    if (this.MoreCategories.GetCatId().toString() == "") {
      toast("Please Choose Category", "error");
      return false;
    }

    SendDataForm(
      Btn,
      form,
      url,
      [this.title],
      [
        { name: "online", value: online },
        { name: "country_id", value: GetCountry() },
        { name: "province_id", value: GetProvince() },
        { name: "city_id", value: GetCity() },
        {
          name: "categorys",
          value: JSON.stringify(this.MoreCategories.GetCatIdParent()),
        },
        {
          name: "category_id",
          value: this.MoreCategories.GetCatId().toString(),
        },
        { name: "product_link", value: this.GetLinkValue() },
      ],
      false,
      () => {
        fn();
      },
      false
    );
  };

  ShowData = (url, param) => {
    Fetching(url, param).then((data) => {
      $("#ModalEdit").modal("show");
      let d = data.data.data[0];
      $("#title_e").val(d.title);
      $("#idSearch").val(d.id);
      $("#description_e").val(d.description);
      $("#price_e").val(d.price);

      $("#more_link_e").html("");

      SetVal(d.province_id, d.city_id);
      $("#country_id_e").val(d.country_id).trigger("change");

      if (d.online === "1") $("#online_e").prop("checked", true);
      else $("#online_e").prop("checked", false);

      this.index = 2;
      this.show_more_link(d.product_tag);
      if (d.trash === "1") $("#trash2").prop("checked", true);
      else $("#trash").prop("checked", true);

      this.MoreCategories.ResetMoreCat();
      this.MoreCategories.ShowEditCat(
        d.catagories,
        d.cats_id,
        $("#more_cat_e")
      );
    });
  };

  ShowDataWithOutModal = (url, param) => {
    Fetching(url, param).then((data) => {
      let d = data.data.data[0];
      $("#title").val(d.title);
      $("#idSearch").val(d.id);
      $("#description").val(d.description);
      $("#price").val(d.price);

      if (d.trash === "1") $("#trash2").prop("checked", true);
      else $("#trash").prop("checked", true);

      SetVal(d.province_id, d.city_id);
      $("#country_id").val(d.country_id).trigger("change");

      if (d.online === "1") $("#online").prop("checked", true);
      else $("#online").prop("checked", false);

      this.index = 2;
      this.show_more_linkWithoutModal(d.product_tag);

      if(d.active_ingredients_id!==null)
      $("#active_ingredients").val(d.active_ingredients_id.split(",")).trigger("change");
      if(d.age_range_id!==null)
      $("#age_range").val(d.age_range_id.split(",")).trigger("change");
      if(d.benefits_id!==null)
      $("#benefits").val(d.benefits_id.split(",")).trigger("change");
      if(d.hair_type_id!==null)
      $("#hair_type").val(d.hair_type_id.split(",")).trigger("change");
      if(d.item_dimensions_id!==null)
      $("#item_dimensions").val(d.item_dimensions_id.split(",")).trigger("change");
      if(d.item_form_id!==null)
      $("#item_form").val(d.item_form_id.split(",")).trigger("change");
      if(d.liquid_volume_id!==null)
      $("#liquid_volume").val(d.liquid_volume_id.split(",")).trigger("change");
      if(d.skin_type_id!==null)
      $("#skin_type").val(d.skin_type_id.split(",")).trigger("change");
      if(d.special_ingredients_id!==null)
      $("#special_ingredients").val(d.special_ingredients_id.split(",")).trigger("change");

      $("#more_cat").html("");
      this.MoreCategories.ResetMoreCat();
      this.MoreCategories.ShowEditCat(d.catagories, d.cats_id, $("#more_cat"));
    });
  };

  Remove = (Btn, url, fn = () => {}) => {
    block();
    let data = Btn.dataset;
    let rmoveid = data.rmoveid;
    let id = data.id;
    let action = data.action;
    let formData = getObjFormData("frmRemove");
    formData = { ...formData, ...{ idSearch: rmoveid } };
    if (formData.delete_type === "disabled") {
      action = url;
      formData = { idSearch: rmoveid, trash: "1" };
    }

    Fetching(action, formData).then((data) => {
      if (data.status === "true") {
        $("#" + id).modal("hide");
        toast("successful", "success");
        fn();
      } else {
        toast(data.err, "error");
      }

      unblock();
    });
  };

  SetProof = () => {
    CreateSelectOption(
      { url: URLPATH + "fetchData/proof_get", params: { type: "hairType" } },
      { id: "hair_type", value: "id", title: "title" },
      false,
      this.AfterSet
    );
    CreateSelectOption(
      { url: URLPATH + "fetchData/proof_get", params: { type: "skinType" } },
      { id: "skin_type", value: "id", title: "title" },
      false,
      this.AfterSet
    );
    CreateSelectOption(
      {
        url: URLPATH + "fetchData/proof_get",
        params: { type: "liquidVolume" },
      },
      { id: "liquid_volume", value: "id", title: "title" },
      false,
      this.AfterSet
    );
    CreateSelectOption(
      {
        url: URLPATH + "fetchData/proof_get",
        params: { type: "itemDimensions" },
      },
      { id: "item_dimensions", value: "id", title: "title" },
      false,
      this.AfterSet
    );

    CreateSelectOption(
      {
        url: URLPATH + "fetchData/proof_get",
        params: { type: "specialIngredients" },
      },
      { id: "special_ingredients", value: "id", title: "title" },
      false,
      this.AfterSet
    );
    CreateSelectOption(
      {
        url: URLPATH + "fetchData/proof_get",
        params: { type: "productBenefits" },
      },
      { id: "benefits", value: "id", title: "title" },
      false,
      this.AfterSet
    );
    CreateSelectOption(
      {
        url: URLPATH + "fetchData/proof_get",
        params: { type: "itemForm" },
      },
      { id: "item_form", value: "id", title: "title" },
      false,
      this.AfterSet
    );

    CreateSelectOption(
      {
        url: URLPATH + "fetchData/proof_get",
        params: { type: "activeIngredients" },
      },
      { id: "active_ingredients", value: "id", title: "title" },
      false,
      this.AfterSet
    );
    CreateSelectOption(
      {
        url: URLPATH + "fetchData/proof_get",
        params: { type: "ageRange" },
      },
      { id: "age_range", value: "id", title: "title" },
      false,
      this.AfterSet
    );
  };

  AfterSet = () => {
    setSelectMulti("", "true");
  };
}
