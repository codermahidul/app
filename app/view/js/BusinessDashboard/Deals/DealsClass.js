import { Fetching } from "../../Fetch/Common.js";
import { URL, URLPATH } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";
import { GetIdFromUrl, SendDataForm, SendDataFormFile, tokenizSetValue } from "../../functions/Common.js";
import { numberFormat } from "../../functions/numberFormat.js";
import getObjFormData from "../../functions/ObjectFormData.js";
let Cites = await import("../Product/CityWithoutModal.js?v=" + Date.now())
let MoreCategoryC = await import("../../Class/MoreCategory.js?v=" + Date.now())

const MoreCategory = MoreCategoryC.MoreCategory;
const GetCity = Cites.GetCity;
const GetCountry = Cites.GetCountry;
const GetProvince = Cites.GetProvince;
const SetVal=Cites.SetVal;

export class DealClass {

    constructor(form, Back) {

        this.Back = Back;
        this.form = form
        this.title = document.getElementById("title");
        this.amount = document.getElementById("amount");
        this.type = document.getElementById("type");
        this.expire = document.getElementById("expire");
        this.startDate = document.getElementById("start");
        this.inventory = document.getElementById("inventory");
        this.product_price = document.getElementById("product_price");
        this.MoreCategories = new MoreCategory("coupon");
        if($("#more_cat").length>0)
        this.MoreCategories.AddCategoryInput($("#more_cat"));
    }

    AddNew = (Btn, url) => {
        let online = "0";
        if ($('#online').is(":checked")) {
            online = "1";
        }
        if (this.MoreCategories.GetCatId().toString() == '') {
            toast("Please Choose Category", "error");
            return false;
        }

        SendDataFormFile(Btn,
            this.form, url,
            [this.title, this.amount, this.type, this.startDate, this.expire, this.inventory,this.product_price],
            [
                { name: "product_id", value: $("#product_id").val().toString() },
                { name: "online", value: online },
                { name: "country_id", value: GetCountry() },
                { name: "province_id", value: GetProvince() },
                { name: "city_id", value: GetCity() },
                { name: "categories", value: JSON.stringify(this.MoreCategories.GetCatIdParent()) },
                { name: "category_id", value: this.MoreCategories.GetCatId().toString() },
            ],
            false,
            () => {
                window.location.href = URLPATH + this.Back 
            },
            false);
    }

    AddNewForUser = (Btn, url) => {
        let online = "0";
        if ($('#online').is(":checked")) {
            online = "1";
        }
        if (this.MoreCategories.GetCatId().toString() == '') {
            toast("Please Choose Category", "error");
            return false;
        }

        SendDataFormFile(Btn,
            this.form, url,
            [this.title, this.amount, this.type, this.startDate, this.expire, this.inventory],
            [
                { name: "product_id", value: $("#product_id").val().toString() },
                { name: "online", value: online },
                { name: "country_id", value: GetCountry() },
                { name: "province_id", value: GetProvince() },
                { name: "city_id", value: GetCity() },
                { name: "categories", value: JSON.stringify(this.MoreCategories.GetCatIdParent()) },
                { name: "category_id", value: this.MoreCategories.GetCatId().toString() },
                {name:"for_user",value:"1"},
                {name:"user_business_id",value:GetIdFromUrl()}
            ],
            false,
            () => {
                window.location.href = URLPATH + this.Back 
            },
            false);
    }
    
    EditInfo = (Btn, url) => {
        let online = "0";
        if ($('#online').is(":checked")) {
            online = "1";
        }
        if (this.MoreCategories.GetCatId().toString() == '') {
            toast("Please Choose Category", "error");
            return false;
        }

        SendDataForm(Btn,
            this.form, url,
            [this.title, this.amount, this.type, this.startDate, this.expire, this.inventory],
            [
                { name: "product_id", value: $("#product_id").val().toString() },
                { name: "online", value: online },
                { name: "country_id", value: GetCountry() },
                { name: "province_id", value: GetProvince() },
                { name: "city_id", value: GetCity() },
                { name: "categories", value: JSON.stringify(this.MoreCategories.GetCatIdParent()) },
                { name: "category_id", value: this.MoreCategories.GetCatId().toString() },
            ],
            false,
            () => {
                window.location.href = URLPATH + this.Back 
            },
            false);
    }

    ShowData=(url,param)=>{
        Fetching(url, param).then((data) => {
            let d = data.data.data[0]
            $("#title").val(d.title);
            $("#idSearch").val(d.id);
            $("#description").val(d.description);
            $("#amount").val(d.amount);
            $("#type").val(d.type);
            $("#start").val(d.start);
            $("#expire").val(d.expire);
            $("#price").val(d.price);
            $("#inventory").val(d.inventory);
            $("#link").val(d.link);
            $("#product_price").val(d.product_price);
            $("#deal_product_price").val(d.deal_product_price);
            if (d.product_id !== null)
                tokenizSetValue("product_id", d.product_id, d.product_title)
    
            if (d.trash === "1")
                $("#trash2").prop('checked', true);
            else
                $("#trash").prop('checked', true);
    
            SetVal(d.province_id, d.city_id)
            $("#country_id").val(d.country_id).trigger("change");
    
            if (d.online === "1")
                $("#online").prop('checked', true);
            else
                $("#online").prop('checked', false);
    
    
            $("#more_cat").html("");
            this.MoreCategories.ResetMoreCat();
            this.MoreCategories.ShowEditCat(d.catagories, d.cats_id, $("#more_cat"));
        })
    }

    Remove=(Btn,url,fn=()=>{})=>{
        block();
        let data = Btn.dataset;
        let rmoveid = data.rmoveid
        let id = data.id
        let action = data.action
        let formData = getObjFormData("frmRemove");
        formData = { ...formData, ...{ 'idSearch': rmoveid } };
        if (formData.delete_type === "disabled") {
            action = url;
            formData = { 'idSearch': rmoveid, "trash": "1" };
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
        })
    }

    ViewInfo=(url,param,fn=()=>{})=>{
        Fetching(url, param).then((data) => {
            let d = data.data.data[0];
            
            if (d.file_url !== '' && d.file_url !== null && d.file_name !== '' && d.file_name !== null) {
                $("#img").html('<img class="rounded" src="' + URL + d.file_url + '/thumb/' + d.file_name + '">');
            }
            let city="Online";
            if(d.online !=='1')
            {
                city=d.country_name+" , "+d.province_name+" , "+d.city_name
            }

            $("#title").html(d.title);
            $("#date").html("start date,expire date: "+'<strong>'+ d.start+" , "+d.expire+'</strong>');
            $("#price").html("price: $"+'<strong>'+numberFormat(d.price)+'</strong>');
            $("#inventory").html("inventory: "+'<strong>'+numberFormat(d.inventory)+'</strong>');
            $("#category").html("category: "+'<strong>'+d.category_name+'</strong>');
            $("#city").html("Location : "+'<strong>'+city+'</strong>');
            $("#description").html(d.description)
            $("#title").html(d.title);
            $("#product_price").html("product price: "+'<strong>'+numberFormat(d.product_price)+'</strong>');
            $("#deal_product_price").html("deal product price: "+'<strong>'+numberFormat(d.deal_product_price)+'</strong>');
            fn()
        })
    }

    GetCategoryId=()=>{
        return this.MoreCategories.GetCatId().toString()
    }
}