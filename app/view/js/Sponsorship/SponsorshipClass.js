import { numberFormat } from "../functions/numberFormat.js";
import { block, unblock } from "../functions/Block.js";
import { Fetching } from "../Fetch/Common.js";
import { URL } from "../Fetch/Setting.js";
import { SendDataFormGetData } from "../functions/Common.js";

let MoreCategoryC = await import("../Class/MoreCategory.js?v=" + Date.now());

const MoreCategory = MoreCategoryC.MoreCategory;

export class Sponsorship {
    constructor(frm) {
        this.frm = frm;
        this.Company = document.getElementById("company");
        this.Contact = document.getElementById("contact");
        this.Tel = document.getElementById("tel");
        this.Mobile = document.getElementById("mobile");
        this.Email = document.getElementById("email");
        this.MoreCategories = new MoreCategory("business");
        this.price = 0;
        this.totalPrice = 0;
        this.idArray = [];
    }

    SetCheckBox = () => {
        let ch = document.getElementsByClassName("cheB");
        let Info = document.getElementsByClassName("check-info");
        for (let i = 0; i < ch.length; i++) {
            ch[i].onchange = (e) => {
                let checked = e.currentTarget.checked;
                let value = e.currentTarget.value;
                let id = e.currentTarget.id;

                if (checked) {
                    this.price = parseFloat(this.price) + parseFloat(value);
                    this.idArray.push(id);
                } else {
                    this.price = parseFloat(this.price) - parseFloat(value);
                    const index = this.idArray.indexOf(id);
                    if (index > -1) {
                        this.idArray.splice(index, 1);
                    }
                }
                this.SetTotalPrice();
                this.ShowPrice();
            };
        }

        for (let i = 0; i < Info.length; i++) {
            Info[i].onclick = (e) => {
                let id = e.currentTarget.dataset.id;
                this.ShowInfo(id);
            };
        }
    };

    SetTotalPrice=()=>{
        this.totalPrice = this.price + (this.price * 10) / 100;
    }

    ShowPrice=()=>{
        $("#order_price").html(
            '<span class=""> $' + numberFormat(this.price) + "</span>"
        );
        $("#total_price").html(
            '<span class="h6"> $' + numberFormat(this.totalPrice) + "</span>"
        );
    }

    ShowInfo = (id) => {
        console.log(id);
        block();
        Fetching("sponsorship/get", { idSearch: id }).then((data) => {
            unblock();
            if (data.data.data[0] !== undefined) {
                let d = data.data.data[0];
                $("#title_view").html("<h2>" + d.title + "</h2>");
                
                if (d.sponsorship_tag !== "" && d.sponsorship_tag !== null) {
                    let str = "";
                    let links = d.sponsorship_tag.split(",");
                    links.forEach((e) => {
                        let linkData = e.split("::");
                        str += '<div class="alert alert-info">';
                        str += '<a href="' + linkData[2] + '">';
                        str += "<div><strong>" + linkData[1] + "</strong></div>";
                        str += "<div>" + linkData[3] + "</div>";
                        str += "</a>";
                    });
                    $("#Links").html(str);
                }
                $("#price").html(
                    "<span>price : <strong> $" +
                    numberFormat(d.price) +
                    "</strong></span>"
                );
                $("#description_view").html(
                    "<div> details: <p>" + d.description + "</p></div>"
                );
                if (d.sponsorship_gallery !== "" && d.sponsorship_gallery !== null) {
                    let gallery = d.sponsorship_gallery.split(",");
                    let str = "";
                    gallery.forEach((e) => {
                        let imgs = e.split("::");

                        str +=
                            '<img class="img-radus" src="' +
                            URL +
                            imgs[1] +
                            "/middle/" +
                            imgs[2] +
                            '">';
                    });
                    $("#img_gallery").html(str);
                }
            }

            $("#ModalView").modal("show");
        });
    };

    SaveData = (Btn, url, fun) => {
        if (this.idArray.length <= 0) {
            toast("Please Choose Option", "error");
            return false;
        }
        SendDataFormGetData(
            Btn,
            this.frm,
            url,
            [this.Company, this.Contact, this.Tel, this.Mobile, this.Email],
            [
                { name: "option", value: JSON.stringify(this.idArray) },
                { name: "category_id",value: this.MoreCategories.GetCatId().toString()},
            ],
            false,
            (data, param) => {
                fun(data, param);
            }
        );
    };

    EditData = (Btn, url, fun) => {
        if (this.idArray.length <= 0) {
            toast("Please Choose Option", "error");
            return false;
        }
        SendDataFormGetData(
            Btn,
            this.frm,
            url,
            [this.Company, this.Contact, this.Tel, this.Mobile, this.Email],
            [
                { name: "idSearch", value: $("#idSearch").val() },
                { name: "option", value: JSON.stringify(this.idArray) },
                { name: "category_id",value: this.MoreCategories.GetCatId().toString()},
            ],
            false,
            (data, param) => {
                fun(data, param);
            }
        );
    };

    Start = () => {
        this.SetCheckBox();
        this.MoreCategories.AddCategoryInput($("#more_category"));
        $("#category_id1").addClass("middle-radius");
    };

    ShowData = (url, param) => {
        Fetching(url, param).then((data) => {
            let d = data.data.data[0];
            $("#company").val(d.company);
            $("#contact").val(d.contact);
            $("#tel").val(d.tel);
            $("#mobile").val(d.mobile);
            $("#fax").val(d.fax);
            $("#email").val(d.address);
            this.MoreCategories.ShowEditCat(
                d.category_id,
                "",
                $("#more_category"),
                "category_id",
                "",
                () => {
                    $("#category_id1").addClass("middle-radius");
              
                }
            );

            if (d.sponsorship_request_options !== "" && d.sponsorship_request_options !== null) {
                let ch=d.sponsorship_request_options.split(",");
                ch.forEach(c => {
                    let chData=c.split("::");
                    document.getElementById(chData[1]).checked = true;
                    this.price = parseFloat(this.price) + parseFloat(document.getElementById(chData[1]).value);
                    this.idArray.push(chData[1]);
                });
            }
            this.SetTotalPrice();
            this.ShowPrice();
        });
    };
}
