import { CreateSelectOption, Fetching } from "../../Fetch/Common.js";
import { URL, URLPATH } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";
import {
  GetIdFromUrl,
  SendDataForm,
  SendDataFormFile,
  setSelectMulti,
  tokenizAjax,
  tokenizSetValue,
} from "../../functions/Common.js";
import { numberFormat } from "../../functions/numberFormat.js";
let getObjFormDataF = await import("../../functions//ObjectFormData.js?v=" + Date.now());


let Cites = await import("../Product/CityWithoutModal.js?v=" + Date.now());
let MoreCategoryC = await import("../../Class/MoreCategory.js?v=" + Date.now());

const MoreCategory = MoreCategoryC.MoreCategory;
const GetCity = Cites.GetCity;
const GetCountry = Cites.GetCountry;
const GetProvince = Cites.GetProvince;
const SetVal = Cites.SetVal;
const getObjFormData = getObjFormDataF.default;

export class JobClass {
  constructor(form, Back) {
    this.Back = Back;
    this.form = form;
    this.title = document.getElementById("title");

    this.MoreCategories = new MoreCategory("job");
    if ($("#more_cat").length > 0)
      this.MoreCategories.AddCategoryInput($("#more_cat"));
  }

  AddNew = (Btn, url) => {
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
      this.form,
      url,
      [
        this.title,

      ],
      [
        { name: "skill", value: $("#skill").val().toString() },
        { name: "online", value: online },
        { name: "country_id", value: GetCountry() },
        { name: "province_id", value: GetProvince() },
        { name: "city_id", value: GetCity() },
        {
          name: "categories",
          value: JSON.stringify(this.MoreCategories.GetCatIdParent()),
        },
        {
          name: "category_id",
          value: this.MoreCategories.GetCatId().toString(),
        },
      ],
      false,
      () => {
        window.location.href = URLPATH + this.Back;
      },
      false
    );
  };

  AddNewForUser = (Btn, url) => {
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
      this.form,
      url,
      [
        this.title,

      ],
      [
        { name: "skill", value: $("#skill").val().toString() },
        { name: "online", value: online },
        { name: "country_id", value: GetCountry() },
        { name: "province_id", value: GetProvince() },
        { name: "city_id", value: GetCity() },
        {
          name: "categories",
          value: JSON.stringify(this.MoreCategories.GetCatIdParent()),
        },
        {
          name: "category_id",
          value: this.MoreCategories.GetCatId().toString(),
        },
        { name: "for_user", value: "1" },
        { name: "user_business_id", value: GetIdFromUrl() },
      ],
      false,
      () => {
        window.location.href = URLPATH + this.Back;
      },
      false
    );
  };

  EditInfo = (Btn, url) => {
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
      this.form,
      url,
      [
        this.title,
      ],
      [
        { name: "skill", value: $("#skill").val().toString() },
        { name: "online", value: online },
        { name: "country_id", value: GetCountry() },
        { name: "province_id", value: GetProvince() },
        { name: "city_id", value: GetCity() },
        {
          name: "categories",
          value: JSON.stringify(this.MoreCategories.GetCatIdParent()),
        },
        {
          name: "category_id",
          value: this.MoreCategories.GetCatId().toString(),
        },
      ],
      false,
      () => {
        window.location.href = URLPATH + this.Back;
      },
      false
    );
  };

  ShowData = (url, param) => {
    
    Fetching(url, param).then((data) => {
      
      let d = data.data.data[0];
      $("#title").val(d.title);
      $("#idSearch").val(d.id);
      $("#description").val(d.description);
      if(d.type_id!==null)
      $("#type").val(d.type_id.split(",")).trigger("change");
      if(d.exprience_id!==null)
      $("#exprience").val(d.exprience_id.split(",")).trigger("change");
      if(d.gender_id!==null)
      $("#gender").val(d.gender_id.split(",")).trigger("change");
      if(d.level_id!==null)
      $("#level").val(d.level_id.split(",")).trigger("change");
      if(d.salary_id!==null)
      $("#salary").val(d.salary_id.split(",")).trigger("change");
      if(d.benefit_id!==null)
      $("#benefit").val(d.benefit_id.split(",")).trigger("change");

      
      if (d.skill_id !== null)
      {
        let id=d.skill_id.split(",");
        let name=d.skill.split(",");
        for(let i=0;i<id.length;i++)
        {
          tokenizSetValue("skill", id[i], name[i])

        }
      }

      if (d.trash === "1") $("#trash2").prop("checked", true);
      else $("#trash").prop("checked", true);

      SetVal(d.province_id, d.city_id);
      $("#country_id").val(d.country_id).trigger("change");

      if (d.online === "1") $("#online").prop("checked", true);
      else $("#online").prop("checked", false);

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

  ViewInfo = (url, param, fn = () => {}) => {
    Fetching(url, param).then((data) => {
      let d = data.data.data[0];

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
        city = d.country_name + " , " + d.province_name + " , " + d.city_name;
      }

      $("#title").html(d.title);
      $("#date").html(
        "start date,expire date: " +
          "<strong>" +
          d.start +
          " , " +
          d.expire +
          "</strong>"
      );
      $("#price").html(
        "price: $" + "<strong>" + numberFormat(d.price) + "</strong>"
      );
      $("#inventory").html(
        "inventory: " + "<strong>" + numberFormat(d.inventory) + "</strong>"
      );
      $("#category").html(
        "category: " + "<strong>" + d.category_name + "</strong>"
      );
      $("#city").html("Location : " + "<strong>" + city + "</strong>");
      $("#description").html(d.description);
      $("#title").html(d.title);
      $("#product_price").html(
        "product price: " +
          "<strong>" +
          numberFormat(d.product_price) +
          "</strong>"
      );
      $("#deal_product_price").html(
        "deal product price: " +
          "<strong>" +
          numberFormat(d.deal_product_price) +
          "</strong>"
      );
      fn();
    });
  };

  GetCategoryId = () => {
    return this.MoreCategories.GetCatId().toString();
  };

  SetProof = () => {
    CreateSelectOption(
      { url: URLPATH + "fetchData/proof_get", params: { type: "jobType" } },
      { id: "type", value: "id", title: "title" },
      false,
      this.AfterSet
    );
    CreateSelectOption(
      { url: URLPATH + "fetchData/proof_get", params: { type: "jobGender" } },
      { id: "gender", value: "id", title: "title" },
      false,
      this.AfterSet
    );
    CreateSelectOption(
      { url: URLPATH + "fetchData/proof_get", params: { type: "jobSalary" } },
      { id: "salary", value: "id", title: "title" },
      false,
      this.AfterSet
    );
    CreateSelectOption(
      { url: URLPATH + "fetchData/proof_get", params: { type: "jobBenefit" } },
      { id: "benefit", value: "id", title: "title" },
      false,
      this.AfterSet
    );
    CreateSelectOption(
      { url: URLPATH + "fetchData/proof_get", params: { type: "jobLevel" } },
      { id: "level", value: "id", title: "title" },
      false,
      this.AfterSet
    );
    CreateSelectOption(
      {
        url: URLPATH + "fetchData/proof_get",
        params: { type: "jobExperience" },
      },
      { id: "exprience", value: "id", title: "title" },
      false,
      this.AfterSet
    );

    tokenizAjax("skillSearch", false, "fetchData/proof_get", {type:"skill"}, "title", "");

  };

  AfterSet = () => {
    setSelectMulti("", "true");
  };
}
