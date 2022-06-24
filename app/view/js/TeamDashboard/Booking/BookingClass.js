import { CreateSelectOption, Fetching } from "../../Fetch/Common.js";
import { URLPATH } from "../../Fetch/Setting.js";
import {
  SendDataForm,
  setFormElementValue,
  tokenizAjax,
  tokenizAjaxTypeUser,
  tokenizAjaxUser,
  tokenizSetValue,
} from "../../functions/Common.js";

export class Booking {
  constructor(form, Back) {
    this.Back = Back;
    this.form = form;
    this.title = document.getElementById("title");
    this.date_from = document.getElementById("date_from");
    this.time_from = document.getElementById("time_from");
    this.index = 1;
    this.indexGuest = 1;
  }

  GetTeamValue = (forEdit = false) => {
    let valS = "";

    for (let i = 1; i < this.index; i++) {
      let teamId = "team_id";
      let editable = "editable";

      if (forEdit) {
        t = "team_id_e";
        editable = "editable_e";
      }

      let team = $("#" + teamId + i).val();
      let edit = $("#" + editable + i).val();
      if (i < this.index - 1) {
        valS += team + "::" + edit + ",?";
      } else valS += team + "::" + edit;
    }

    return valS;
  };

  GetGuestValue = (forEdit = false) => {
    let valS = "";
    for (let i = 1; i < this.indexGuest; i++) {
      let guestId = "guest";
      let emailId = "emails";
      let timeId = "timezone";

      if (forEdit) {
        t = "guest_id_e";
        emailId = "emails_e";
        timeId = "timezone_e";
      }

      let guest = $("#" + guestId + i).val();

      let email = $("#" + emailId + i).val();
      let time = $("#" + timeId + i).val();
      if (i < this.indexGuest - 1) {
        valS += guest + "::" + email + "::" + time + ",?";
      } else valS += guest + "::" + email + "::" + time;
    }

    return valS;
  };

  CreateTeamSearch = (id, edit = "") => {
    let div = $("#" + id);

    let str = "";

    str += ' <div class="col-md-6">';
    str += ' <label for="recipient-name" class="col-form-label">Team:</label>';
    str +=
      '<select style="width: 100%" class="input-white min-radus  teamSearch' +
      this.index +
      ' select-css" multiple id="team_id' +
      edit +
      this.index +
      '">';

    str += "</select>";
    str += " </div>";

    str += ' <div class="col-md-6">';
    str +=
      ' <label for="recipient-name" class="col-form-label">Can edit:</label>';
    str +=
      '  <select id="editable' +
      edit +
      this.index +
      '" class="input-white  select-css ">';
    str += '  <option value=""></option>';
    str += '   <option value="1">Yes </option>';
    str += '   <option value="0">No</option>';

    str += "  </select>";
    str += " </div>";

    div.append(str);
    this.SetSearchTeam();
    this.index++;
  };

  CreateGuestSearch = (id, edit = "", values = "") => {
    let div = $("#" + id);
    let str = this.GuestHtml(edit);
    div.append(str);
    this.AfterCreate(edit, values);
    this.indexGuest++;
  };

  AfterCreate = (edit = "", values = "") => {
    tokenizAjaxTypeUser(
      "guest-search",
      true,
      "program/getGuestList",
      {},
      "display_name",
      "1"
    );
    tokenizAjaxUser(
      "team-search",
      false,
      "team/get",
      {},
      "display_name",
      "1",
      "display_name"
    );
    CreateSelectOption(
      { url: URLPATH + "fetchData/getTimeZone", params: {} },
      { id: "timezone" + edit + this.indexGuest, value: "id", title: "name" },
      values,
      false,
      () => {}
    );
  };

  GuestHtml = (edit = "") => {
    let str = "";
    str += ' <div class="col-md-4">';
    str +=
      '<label for="recipient-name" class="col-form-label">Search Guest:</label>';
    str +=
      ' <select style="width: 100%" class="input-white min-radus  guest-search select-css" multiple name="guest" id="guest' +
      edit +
      this.indexGuest +
      '">';

    str += "</select>";
    str += " </div>";

    str += ' <div class="col-md-4">';
    str += '<label for="recipient-name" class="col-form-label">Email:</label>';
    str +=
      '<input id="emails' +
      edit +
      this.indexGuest +
      '" type="email" autocomplete="off" class="form-control min-radus ">';
    str += " </div>";

    str += '<div class="col-md-4">';
    str +=
      '<label for="recipient-name" class="col-form-label">Choose timezone:</label>';
    str +=
      '<select class="form-control select2 " style="width: 100%;" id="timezone' +
      edit +
      this.indexGuest +
      '"></select>';
    str += "</div>";
    return str;
  };

  AfterAdd = () => {
    window.location.href = URLPATH + this.Back;
  };

  show_more_team = (str) => {
    if (str !== null && str !== "") {
      let data = str.split(",");
      for (let i = 0; i < data.length; i++) {
        let d = data[i].split("::");
        let id = this.index;
        this.CreateTeamSearch("more_team");

        tokenizSetValue("team_id" + id, d[0], d[2]);
        $("#editable" + id).val(d[1]);
      }
    }
  };

  show_more_guest = (str, Div = "more_guest") => {
    if (str !== null && str !== "") {
      let data = str.split(",");
      for (let i = 0; i < data.length; i++) {
        let d = data[i].split("::");
        let id = this.indexGuest;

        let business_id = d[0];
        let business_display = d[1];
        let guest = d[2];
        let email = d[3];
        let timezone = d[4];
        this.CreateGuestSearch(Div, "", timezone);

        if (business_id !== "0") {
          tokenizSetValue(
            "guest" + (i + 1),
            business_id + ",user_business",
            business_display
          );
        }
        if (guest !== "") {
          tokenizSetValue("guest" + (i + 1), guest, guest);
        }

        $("#emails" + id).val(email);
        $("#timezone" + id).val(timezone);
      }
    }
  };

  show_more_guestName = (str, Div = "more_guest") => {
    if (str !== null && str !== "") {
      let data = str.split(",");
      for (let i = 0; i < data.length; i++) {
        let d = data[i].split("::");

        let id = this.indexGuest;
        let guest = d[0];
        let email = d[1];
        let timezone = d[2];
        this.CreateGuestSearch(Div, "", timezone);

        if (guest !== "") {
          tokenizSetValue("guest" + id, guest, guest);
        }

        $("#emails" + id).val(email);
        $("#timezone" + id).val(timezone);
      }
    }
  };

  AddNew = (Btn, url, form = this.form, fn = this.AfterAdd) => {
    SendDataForm(
      Btn,
      form,
      url,
      [this.title],
      [
        { name: "team_book_team", value: this.GetTeamValue() },
        { name: "team_book_guest", value: this.GetGuestValue() },
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
      let d = data.data.data[0];
      setFormElementValue(data.data.data[0]);

      this.show_more_team(d.team_book_teams);
      this.show_more_guest(d.team_book_guest);

      this.show_more_guestName(d.team_book_guest2);
    });
  };

  EditInfo = (Btn, url, form=this.form, fn = this.AfterAdd) => {
    SendDataForm(
      Btn,
      form,
      url,
      [this.title],
      [
        { name: "team_book_team", value: this.GetTeamValue() },
        { name: "team_book_guest", value: this.GetGuestValue() },
      ],
      false,
      () => {
        fn();
      },
      false
    );
  };

  SetSearchTeam = () => {
    tokenizAjax(
      "teamSearch" + this.index,
      false,
      "team/get",
      {},
      "display_name",
      "1",
      "display_name"
    );
  };
}
