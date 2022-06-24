import { Fetching } from "../Fetch/Common.js";
import { URL, URLPATH, VIEWURL } from "../Fetch/Setting.js";
import { GetBlockUnBlock } from "./Btn.js";
let FollowA = await import("./FollowActionClass.js?v=" + Date.now());

const FollowActionClass = FollowA.FollowActionClass;

const FollowAc = new FollowActionClass("result", () => { FollowCl.GetMyFollower() });


export class FollowClass {
    constructor(DivId, fn) {
        this.DivId = DivId;
        this.continueGet = false;
        this.Div = $("#" + this.DivId);
        this.start = 0;
        this.exist = 0;
        this.number = "30";
        this.BtnLoad = document.getElementById("BtnLoad");
        if (this.BtnLoad !== null) {
            this.BtnLoad.onclick = () => { fn() };
        }

    }

    GetMyFollower() {
        Fetching("userBusinessAction/getAllMyFollower", {
            start: this.start.toString(),
            number: this.number,
        }).then((data) => {

            if (data.status === "true") {
                this.start=parseInt(this.start)+parseInt(this.number);
                this.exist = this.exist + data.data.data.length;
                if (data.data.total - this.exist <= 0) {
                    this.continueGet = false;

                    if (this.BtnLoad !== null) {
                        this.BtnLoad.style.display = "none";
                    }
                } else {
                    this.continueGet = true;
                }

                this.start = parseInt(this.start) + parseInt(this.number);
                this.ShowDataList(data.data.data, this.GetFollowerBtn, 'display_name_applicant');
            }
        });
    }

    ShowDataList(data, fn, name) {
        let str = "";

        data.forEach((d) => {
            let img = URLPATH + VIEWURL + "imgs/defult.jpg";
            if (d.logo_name !== null && d.logo_name !== "") {
                img = URL + d.logo_url + "/small/" + d.logo_name;
            }

            if (d.img_name !== null && d.img_name !== '') {
                img = URL + d.img_url + "/small/" + d.img_name;
            }

            str += '<div class="col-md-3" id="main_div_part_'+d.id+'">';

            str += '<div class="card-contain  m-1 ">';
            str += '<div class="card-image position-relative">';
            str += ' <img src="' + img + '" alt="' + d[name] + '">';
            str += "</div>";
            str += '<div class="card-details text-muted">';
            str += '<div class="card-title">' + d[name] + "</div>";
            str += ' <div class="mt-1 ">';

            str += '<div class="row p-1">';
            str += fn(d);
            str += " </div>";
            str += "</div>";
            str += "</div>";
            str += "</div>";

            str += "</div>";
        });

        this.Div.append(str);
        FollowAc.SetAction();
    }



    GetFollowerBtn(d,th) {
        
        let str = "";
        str += '<a href="' + URLPATH + d.display_name_slug_applicant + '" class="btn btn-outline-dark btn-sm btn-radus col-md-3 m-1">View</a>';
        str += '<button data-id="' + d.user_business_id_applicant + '" class="btn btn-warning btn-sm btn-radus col-md-4 m-1 message">Message</button>';
        str += '<div id="div_' + d.user_business_id_applicant + '" class="col-md-3">'
       // str += GetBlockUnBlock(d.block,d.user_business_id_applicant);
        str += '</div>'
        return str;
    }



    
    GetFollowingBtn(d) {
        let str = "";
        str += '<a href="' + URLPATH + d.display_name_slug + '" class="btn btn-outline-dark btn-sm btn-radus col-md-3 m-1">View</a>';
        str += '<button data-id="' + d.user_business_id + '" class="btn btn-warning btn-sm btn-radus col-md-4 m-1 message">Message</button>';
        str += '<div id="div_' + d.user_business_id + '" class="col-md-3">'
        str += '<button data-parent="'+d.id+'" data-id="' + d.user_business_id + '" class="btn btn-outline-danger btn-sm btn-radus m-1 unfollow">unfollow</button>';
        str += '</div>'
        return str;
    }

    GetContinue() {
        return this.continueGet;
    }

    GetMyFollowing() {
        Fetching("userBusinessAction/getAllMyFollowing", {
            start: this.start.toString(),
            number: this.number,
        }).then((data) => {

            if (data.status === "true") {
                this.start=parseInt(this.start)+parseInt(this.number);
                this.exist = this.exist + data.data.data.length;
                if (data.data.total - this.exist <= 0) {
                    this.continueGet = false;

                    if (this.BtnLoad !== null) {
                        this.BtnLoad.style.display = "none";
                    }
                } else {
                    this.continueGet = true;
                }

                this.start = parseInt(this.start) + parseInt(this.number);
                this.ShowDataList(data.data.data, this.GetFollowingBtn, 'display_name');
            }
        });
    }

}
