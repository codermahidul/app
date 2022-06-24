import { CreateSelectOption, Fetching } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";
import {
  resetForm,
  SendDataForm,
  setFormElementValueEdit,
} from "../../functions/Common.js";
import getObjFormData from "../../functions/ObjectFormData.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";

let DataTables = await import("../../Class/DataTable.js?v=" + Date.now());

const Search = document.getElementById("searchbtn");
const AddNewBtn = document.getElementById("addNewBtn");
const BtnSaveNew = document.getElementById("btnAdd");
const SaveEdit = document.getElementById("btnSaveEdit");
const AddModal = $("#ModalAdd");

const title = document.getElementById("title");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const expire = document.getElementById("expire");
const numbers = document.getElementById("numbers");
const Code = document.getElementById("code");

const title_e = document.getElementById("title_e");
const amount_e = document.getElementById("amount_e");
const type_e = document.getElementById("type_e");
const expire_e = document.getElementById("expire_e");
const numbers_e = document.getElementById("numbers_e");
const Code_e = document.getElementById("code_e");
const BtnAddCopy = document.getElementById("btnAddCopy");
const DataTable = DataTables.DataTable;

const DtClass = new DataTable("dataTable", "adminDiscountTable/get_all");

const column = [
  { data: "id" },
  { data: "title" },
  { data: "amount" },
  { data: "type" },
  { data: "code" },
  { data: "numbers" },
  { data: "expire" },
  { data: "description" },
  { data: "business_verify" },
  { data: "advertise" },
  { data: "deals" },
  { data: "action" },
];
const param = {
  trash: () => {
    return $("#trashSearch").val();
  },
  idSearch: () => {
    return $("#idSearchs").val();
  },
  title: () => {
    return $("#titlese").val();
  },
};

///dataTable
DtClass.CreateDataTable(param, column);

CreateSelectOption(
  { url: "fetchData/proof_get", params: { type: "discount" } },
  { id: "type", value: "id", title: "title" }
);
CreateSelectOption(
  { url: "fetchData/proof_get", params: { type: "discount" } },
  { id: "type_e", value: "id", title: "title" }
);

Search.onclick = () => {
  DtClass.Refresh();
};

AddNewBtn.onclick = () => {
  AddModal.modal("show");
};

const ResettingAdd = () => {
  let modal = BtnSaveNew.dataset.id;
  DtClass.Refresh();

  $("#" + modal).modal("hide");
  $("#ModalAddCopy").modal("hide");
};

BtnSaveNew.onclick = () => {
  let business_verify = "0";
  if ($("#business_verify").is(":checked")) {
    business_verify = "1";
  }
  let advertise = "0";
  if ($("#advertise").is(":checked")) {
    advertise = "1";
  }
  let deals = "0";
  if ($("#deals").is(":checked")) {
    deals = "1";
  }
  SendDataForm(
    BtnSaveNew,
    "addFrm",
    "discount/newDiscount",
    [title, amount, type, expire, Code, numbers],
    [
      { name: "deals", value: deals },
      { name: "advertise", value: advertise },
      { name: "business_verify", value: business_verify },
    ],
    false,
    ResettingAdd,
    false
  );
};

const ShowModalEdit = (id) => {
  Fetching("discount/getData", { idSearch: id }).then((data) => {
    $("#ModalEdit").modal("show");
    let d = data.data.data[0];

    $("#idSearch").val(id);
    setFormElementValueEdit(d);
    if (d.business_verify === "1")
      $("#business_verify_e").prop("checked", true);
    else $("#business_verify_e").prop("checked", false);

    if (d.advertise === "1") $("#advertise_e").prop("checked", true);
    else $("#advertise_e").prop("checked", false);

    if (d.deals === "1") $("#deals_e").prop("checked", true);
    else $("#deals_e").prop("checked", false);
  });
};

const Resets = () => {
  let data = SaveEdit.dataset;
  let modal = data.id;
  unblock();
  DtClass.Refresh();

  $("#" + modal).modal("hide");
};

SaveEdit.onclick = () => {
  let business_verify = "0";
  if ($("#business_verify_e").is(":checked")) {
    business_verify = "1";
  }
  let advertise = "0";
  if ($("#advertise_e").is(":checked")) {
    advertise = "1";
  }
  let deals = "0";
  if ($("#deals_e").is(":checked")) {
    deals = "1";
  }
  block();
  SendDataForm(
    SaveEdit,
    "frmEdit",
    "discount/updateDiscount",
    [title_e, amount_e, type_e, expire_e, Code_e, numbers_e],
    [
      { name: "deals", value: deals },
      { name: "advertise", value: advertise },
      { name: "business_verify", value: business_verify },
    ],
    true,
    Resets,
    false
  );
};

BtnAddCopy.onclick = () => {
    SendDataForm(
        BtnAddCopy,
        "addFrmCopy",
        "discount/copyDiscount",
        [],
        [],
        false,
        ResettingAdd,
        false
      );
};

DtClass.ClickTable("update", (data) => {
  ShowModalEdit(data.id);
});

DtClass.ClickTable("copy", (data) => {
  $("#idSearchCopy").val(data.id);
  $("#number_copy").val("");
  $("#ModalAddCopy").modal("show");
});

DtClass.ClickTable("remove", (data) => {
  SwalRemoveFetch(
    "discount/remove",
    { idSearch: data.id },
    DtClass.Refresh,
    "Are you Sure?",
    "",
    "warning",
    "ok"
  );
});
