import { Fetching } from "../../Fetch/Common.js";
import { URLPATH } from "../../Fetch/Setting.js";
import { SendDataForm, setFormElementValue } from "../../functions/Common.js";

let MoreCategoryC = await import("../../Class/MoreCategory.js?v=" + Date.now());
let Cites = await import("../Product/CityWithoutModal.js?v=" + Date.now());

const MoreCategory = MoreCategoryC.MoreCategory;
const GetCity = Cites.GetCity;
const GetCountry = Cites.GetCountry;
const GetProvince = Cites.GetProvince;
const SetVal = Cites.SetVal;

export class ProfileClass {

    constructor(frm, url) {
        this.frm = frm;
        this.backUrl = URLPATH + url;
        this.MoreCategories = new MoreCategory("business");

    }

    AddCategory = () => {
        this.MoreCategories.AddCategoryInput($("#more_cat_e"));
    }

    showData = (url, param) => {
        Fetching(url, param).then((data) => {

            
            let d = []
            if (data.data.data !== undefined) {
                d = data.data.data[0];
            } else {
                d = data.data[0];
            }


            if (d.show_map === "1") $("#show_map").prop("checked", true);
            else $("#show_map").prop("checked", false);

            if ($("#idSearch").length > 0)
                $("#idSearch").val(d.id)
            setFormElementValue(d);
            SetVal(d.province_id, d.city_id);
            $("#country_id").val(d.country_ids).trigger("change");

            this.MoreCategories.ShowEditCat(d.catagories, d.cats_id, $("#more_cat_e"));

            this.SetTime(d);
        })
    }

    SaveData = (Btn, url, frm = this.frm, fn = () => { window.location.href=this.backUrl }) => {
        let show_map = "0";
        let sunday_open="0";
        let monday_open="0";
        let tuesday_open="0";
        let wednesday_open="0";
        let thursday_open="0";
        let friday_open="0";
        let saturday_open="0";


        if ($("#show_map").is(":checked")) {
            show_map = "1";
        }

        
        if ($("#sunday_open").is(":checked")) {
            sunday_open = "1";
        }
        
        if ($("#monday_open").is(":checked")) {
            monday_open = "1";
        }
        
        if ($("#tuesday_open").is(":checked")) {
            tuesday_open = "1";
        }
        
        if ($("#wednesday_open").is(":checked")) {
            wednesday_open = "1";
        }
        
        if ($("#thursday_open").is(":checked")) {
            thursday_open = "1";
        }
        
        if ($("#friday_open").is(":checked")) {
            friday_open = "1";
        }
        
        if ($("#saturday_open").is(":checked")) {
            saturday_open = "1";
        }
        SendDataForm(Btn,
            frm, url,
            [],
            [
                { name: "show_map", value: show_map },

                { name: "sunday_open", value: sunday_open },
                { name: "monday_open", value: monday_open },
                { name: "tuesday_open", value: tuesday_open },
                { name: "wednesday_open", value: wednesday_open },
                { name: "thursday_open", value: thursday_open },
                { name: "friday_open", value: friday_open },
                { name: "saturday_open", value: saturday_open },

                { name: "categorys", value: JSON.stringify(this.MoreCategories.GetCatIdParent()) },
                { name: "category_id", value: this.MoreCategories.GetCatId().toString() },
                { name: "country_id", value: GetCountry() },
                { name: "province_id", value: GetProvince() },
                { name: "city_id", value: GetCity() },
            ],
            true,
            () => {
                fn()
            },
            false);
    }

    SetTime=(d)=>{
    
        
        
        if(d.sunday_open!==null)
        {
            $('#sunday_open').prop('checked', parseInt(d.sunday_open));
            if(d.sunday_open=='0')
            {
                $("#time_from_sunday").val("");
                $("#time_to_sunday").val("");
            }
        }

        if(d.monday_open!==null)
        {
            $('#monday_open').prop('checked', parseInt(d.monday_open));
            if(d.monday_open=='0')
            {
                $("#time_from_monday").val("");
                $("#time_to_monday").val("");
            }
        }
        if(d.tuesday_open!==null)
        {
            $('#tuesday_open').prop('checked', parseInt(d.tuesday_open));
            if(d.tuesday_open=='0')
            {
                $("#time_from_tuesday").val("");
                $("#time_to_tuesday").val("");
            }
        }
        if(d.wednesday_open!==null)
        {
            $('#wednesday_open').prop('checked', parseInt(d.wednesday_open));
            if(d.wednesday_open=='0')
            {
                $("#time_from_wednesday").val("");
                $("#time_to_wednesday").val("");
            }
        }
        if(d.thursday_open!==null)
        {
            $('#thursday_open').prop('checked', parseInt(d.thursday_open));
            if(d.thursday_open=='0')
            {
                $("#time_from_thursday").val("");
                $("#time_to_thursday").val("");
            }
        }
        if(d.friday_open!==null)
        {
            $('#friday_open').prop('checked', parseInt(d.friday_open));
            if(d.friday_open=='0')
            {
                $("#time_from_friday").val("");
                $("#time_to_friday").val("");
            }
        }
        if(d.saturday_open!==null)
        {
            $('#saturday_open').prop('checked', parseInt(d.saturday_open));
            if(d.saturday_open=='0')
            {
                $("#time_from_saturday").val("");
                $("#time_to_saturday").val("");
            }
        }
    }
}