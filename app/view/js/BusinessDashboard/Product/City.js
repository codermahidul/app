import { CreateSelectOption } from "../../Fetch/Common.js";
import { URLPATH } from "../../Fetch/Setting.js";
import { setSelectsClassModal } from "../../functions/Common.js";

const CountryId = document.getElementById("country_id");
const CountryIdE = document.getElementById("country_id_e");
const ProvinceId = document.getElementById("province_id");
const ProvinceIdE = document.getElementById("province_id_e");
const CityId = document.getElementById("city_id");
const CityIdE = document.getElementById("city_id_e");

let province_id_e="";
let city_id_e="";


export const SetVal=(province,city)=>{
    
    province_id_e=province;
    city_id_e=city;
}

CreateSelectOption({
    url: URLPATH +"fetchData/country_get",
    params: { order: "sort_name", order_type: "asc", number: "300" }
},
    { id: "country_id", value: "id", title: "name" })

CreateSelectOption({
    url: URLPATH +"fetchData/country_get",
    params: { order: "sort_name", order_type: "asc", number: "300" }
},
    { id: "country_id_e", value: "id", title: "name" })

    if(CountryId !==null)
    {
        CountryId.onchange = () => {
            let country_id = CountryId.value;
            CreateSelectOption({
                url: URLPATH +"province/get",
                params: { country_id, number: "300" }
            },
                { id: "province_id", value: "id", title: "name" })
        }
    }


    if(CountryIdE !==null)
    {
        CountryIdE.onchange = () => {
    
            let country_id = CountryIdE.value;
            CreateSelectOption({
                url: URLPATH +"province/get",
                params: { country_id, number: "300" }
            },
                { id: "province_id_e", value: "id", title: "name" },province_id_e,true)
        }
    }

if(ProvinceId !==null)
{
    ProvinceId.onchange = () => {
        let province_id = ProvinceId.value;
        CreateSelectOption({
            url: URLPATH +"city/get",
            params: { province_id, number: "300" }
        },
            { id: "city_id", value: "id", title: "name" })
    }
}

if(ProvinceIdE!==null)
{
    ProvinceIdE.onchange = () => {
    
        let province_id = ProvinceIdE.value;
        CreateSelectOption({
            url: URLPATH +"city/get",
            params: { province_id, number: "300" }
        },
            { id: "city_id_e", value: "id", title: "name" },city_id_e,true)
    }
}


export const GetCountry = (edit=false) => {
    if(edit)
    return CountryIdE.value;

    return CountryId.value;
}


export const GetProvince = (edit=false) => {
    if(edit)
    return ProvinceIdE.value;

    return ProvinceId.value;
}


export const GetCity = (edit=false) => {
    if(edit)
    return CityIdE.value;

    return CityId.value;
}

setSelectsClassModal("select2", "", "ModalAdd");
setSelectsClassModal("select2_e", "", "ModalEdit");
if($("#modalEditInfo").length>0)
setSelectsClassModal("select2", "", "modalEditInfo");

