import { CreateSelectOption, Fetching } from "../../Fetch/Common.js";
import { URL, URLPATH } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";
import { SendDataForm, setFormElementValue } from "../../functions/Common.js";
import { numberFormat } from "../../functions/numberFormat.js";
import getObjFormData from "../../functions/ObjectFormData.js";

let Lin = await import("../../Class/Links.js?v=" + Date.now());

const Links = Lin.Links;

const LiC = new Links([
  { name: "Video", value: "video" },
  { name: "Pdf", value: "pdf" },
  { name: "Audio", value: "audio" },
  { name: "Video", value: "video" },
  { name: "WebLink", value: "link" },
]);

export class AdClass {
  constructor(form, Back) {
    this.Back = Back;
    this.form = form;
    this.title = document.getElementById("title");
    this.price = document.getElementById("price");
    this.type = document.getElementById("type");

    LiC.CreateLink();
  }

  AddLink = () => {
    LiC.CreateLink();
  };

  AddNew = (Btn, url) => {
    SendDataForm(
      Btn,
      this.form,
      url,
      [this.title, this.type, this.price],
      [{ name: "sponsorship_link", value: LiC.GetLinkValue() }],
      false,
      () => {
        window.location.href = URLPATH + this.Back;
      },
      false
    );
  };

//   EditInfo = (Btn, url) => {
//     SendDataForm(
//       Btn,
//       this.form,
//       url,
//       [this.title, this.type, this.price],
//       [{ name: "sponsorship_link", value: LiC.GetLinkValue() }],
//       false,
//       () => {
//         window.location.href = URLPATH + this.Back;
//       },
//       false
//     );
//   };

  ShowData = (url, param) => {
    Fetching(url, param).then((data) => {
      let d = data.data.data[0];
      setFormElementValue(d);
      LiC.show_more_link(d.Sponsorship_tag);
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
      { url: URLPATH+"fetchData/proof_get", params: { type: "sponsorship" } },
      { id: "type", value: "id", title: "title" }
    );
    CreateSelectOption(
      { url: URLPATH+"fetchData/proof_get", params: { type: "sponsorship" } },
      { id: "type_e", value: "id", title: "title" }
    );
  };
}
