import { Fetching } from "../Fetch/Common.js";
import { SendDataForm } from "../functions/Common.js";

export class MessageClass {
  constructor(div) {
    this.divId = div;
    this.Div = $("#" + div);
    this.start = 0;
    this.exist = 0;
    this.number = "30";
    this.BtnLoad = document.getElementById("BtnLoad");
    if (this.BtnLoad !== null) {
      this.BtnLoad.onclick = () => {
        this.GetData();
      };
    }
  }

  EmptyDiv() {
    this.Div.html("");
    this.start=0;
  }

  GetData(url, param, fn = () => {}) {
    let item = {
      start: this.start.toString(),
      number: this.number,
    };
    Fetching(url, { ...param, ...item }).then((data) => {
        this.exist = this.exist + data.data.data.length;
        this.start=parseInt(this.start)+parseInt(this.number);
        if (data.data.total - this.exist <= 0) {
            this.continueGet = false;

            if (this.BtnLoad !== null) {
                this.BtnLoad.style.display = "none";
            }
        } else {
            this.continueGet = true;
        }
      this.ShowData(data.data.data, data.data.online_user);
      fn();
    });
  }

  ShowData(data, id) {
    let str = "<div class='row'>";
    data.forEach((d) => {
      let txtClass = "justify-content-start";
      let bg = "bg-info bg-opacity-50 text-dark";
      if (d.from_user === id) {
        txtClass = "justify-content-end";
        bg = "bg-info bg-opacity-25";
      }
      str += '<div class="col-md-12 mb-2  row ' + txtClass + ' ">';
      str +=
        '<div class="col-md-6 rounded p-3 ' + bg + ' ">' + d.txt + "</div>";
      str += "</div>";
    });
    str += "</div>";
    this.Div.append(str);
  }

  AddTxt(btn, url, frm, fn = () => {}) {
    SendDataForm(
      btn,
      frm,
      url,
      [],
      [],
      false,
      () => {
        fn();
      },
      false
    );
  }
}
