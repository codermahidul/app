import { Fetching } from "../../Fetch/Common.js";
import { URL } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";
import {
  checkNull,
  SendDataForm,
  SendDataFormFile,
} from "../../functions/Common.js";
import { numberFormat } from "../../functions/numberFormat.js";
import getObjFormData from "../../functions/ObjectFormData.js";

export class PrizeClass {
  constructor() {
    this.title = document.getElementById("title");
    this.title_e = document.getElementById("title_e");
  }

  reset = () => {};

  AddNew = (Btn, url, form, fn) => {
    SendDataFormFile(
      Btn,
      form,
      url,
      [this.title],
      [],
      false,
      () => {
        fn();
      },
      false
    );
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
  

      $("#title_view").html(d.title);
      $("#price").html(
        "price: $" + "<strong>" + numberFormat(d.jvalues) + "</strong>"
      );
      
      $("#numbers").html(
        "number: " + "<strong>" + numberFormat(d.jnumber)  + "</strong>"
      );
      $("#description_view").html(d.description);
 
      fn();
    });
  };

  EditInfo = (Btn, url, form, fn) => {

    SendDataForm(
      Btn,
      form,
      url,
      [this.title_e],
      [],
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
      $("#jvalues_e").val(d.jvalues);
      $("#jnumber_e").val(d.jnumber);

      if (d.trash === "1") $("#trash2").prop("checked", true);
      else $("#trash").prop("checked", true);
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
}
