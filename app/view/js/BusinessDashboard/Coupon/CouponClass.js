import { CreateSelectOption, Fetching } from "../../Fetch/Common.js";
import { URL } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";
import {
  checkNull,
  SendDataForm,
  SendDataFormFile,
  tokenizAjax,
  tokenizSetValue,
} from "../../functions/Common.js";
import { numberFormat } from "../../functions/numberFormat.js";
import getObjFormData from "../../functions/ObjectFormData.js";

let MoreCategoryC = await import("../../Class/MoreCategory.js?v=" + Date.now());
let Cites = await import("../Product/City.js?v=" + Date.now());

const MoreCategory = MoreCategoryC.MoreCategory;
const GetCity = Cites.GetCity;
const GetCountry = Cites.GetCountry;
const GetProvince = Cites.GetProvince;
const SetVal = Cites.SetVal;

export class CouponClass {
  constructor() {
    this.MoreCategories = new MoreCategory("coupon");
    this.title = document.getElementById("title");
    this.amount = document.getElementById("amount");
    this.type = document.getElementById("type");
    this.expire = document.getElementById("expire");
    this.title_e = document.getElementById("title_e");
    this.amount_e = document.getElementById("amount_e");
    this.type_e = document.getElementById("type_e");
    this.expire_e = document.getElementById("expire_e");
  }

  reset = () => {
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

  AddNew = (Btn, url, form, fn) => {
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
      [this.title, this.amount, this.type, this.expire],
      [
        { name: "product_id", value: $("#product_id").val().toString() },
        { name: "online", value: online },
        { name: "country_id", value: GetCountry() },
        { name: "province_id", value: GetProvince() },
        { name: "city_id", value: GetCity() },
        {name: "categories",value: JSON.stringify(this.MoreCategories.GetCatIdParent())},
        {name: "category_id",value: this.MoreCategories.GetCatId().toString()},
      ],
      false,
      () => {
        this.reset();

        fn();
      },
      false
    );
  };



  EditInfo = (Btn, url, form, fn) => {
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
      [this.title_e, this.amount_e, this.type_e, this.expire_e],
      [
        { name: "product_id", value: $("#product_id").val().toString() },
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
      $("#amount_e").val(d.amount);
      $("#type_e").val(d.type);
      $("#expire_e").val(d.expire);
      $("#link_e").val(d.link);


      SetVal(d.province_id, d.city_id);
      $("#country_id_e").val(d.country_id).trigger("change");

      if (d.online === "1") $("#online_e").prop("checked", true);
      else $("#online_e").prop("checked", false);

      if (d.product_id !== null)
      tokenizSetValue("product_id_e", d.product_id, d.product_title)

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

  FirstSet = (url="product/getDataCouponSub") => {
    tokenizAjax("productsearch", false, url, {}, "title", "1");
    CreateSelectOption(
      { url: "fetchData/proof_get", params: { type: "discount" } },
      { id: "type", value: "id", title: "title" }
    );
    CreateSelectOption(
      { url: "fetchData/proof_get", params: { type: "discount" } },
      { id: "type_e", value: "id", title: "title" }
    );
  };
}
