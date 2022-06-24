import { CreateSelectOption } from "../Fetch/Common.js";
import { URLPATH } from "../Fetch/Setting.js";

let Commons= await import ("../functions/Common.js?v="+Date.now());

const setSelectMultiId=Commons.setSelectMultiId;
const setSelectsClass=Commons.setSelectsClass;

export class City {
  constructor(divId) {
    this.index = "1";

    this.Div = $("#" + divId);
  }

  ResetAll=()=>{
    this.index = "1";
    this.Div.html("");
  }

  CreateItemWithoutPrice(country_id="",province_id="",city_id="") {
    let str = "";
    str += '  <div class="mb-3 row align-items-center">';
    str +=
      '<label for="recipient-name" class="col-form-label">Select a city</label>';
    str += '<div class="col-md-3">';

    str +=
      '<select style="width: 100%;" id="country_id' +
      this.index +
      '"  class="form-control select1">';

    str += " </select>";
    str += " </div>";
    str += ' <div class="col-md-3">';
    str +=
      '<select style="width: 100%;" data-index="' +
      this.index +
      '"  id="province_id' +
      this.index +
      '" class="form-control select1"></select>';
    str += "</div>";
    str += ' <div class="col-md-3">';
    str +=
      ' <select style="width: 100%;" id="city_id' +
      this.index +
      '" class="form-control select1"></select>';
    str += " </div>";


    str += "</div>";

    this.Div.append(str);
    this.AfterCreateNoMulti(country_id,province_id,city_id);
    this.index++;
  }


  CreateItem() {
    let str = "";
    str += '  <div class="mb-3 row align-items-center">';
    str +=
      '<label for="recipient-name" class="col-form-label">Select a city</label>';
    str += '<div class="col-md-3">';

    str +=
      '<select style="width: 100%;" id="country_id' +
      this.index +
      '"  class="form-control select1">';

    str += " </select>";
    str += " </div>";
    str += ' <div class="col-md-3">';
    str +=
      '<select style="width: 100%;" data-index="' +
      this.index +
      '"  id="province_id' +
      this.index +
      '" class="form-control select1"></select>';
    str += "</div>";
    str += ' <div class="col-md-3">';
    str +=
      ' <select style="width: 100%;" id="city_id' +
      this.index +
      '" class="form-control select2"></select>';
    str += " </div>";

    str += '<div class="col-md-3">';
    str +=
      '<input type="text" placeholder="Price" class="form-control"  id="price' +
      this.index +
      '">';

    str += "</div>";
    str += "</div>";

    this.Div.append(str);
    this.AfterCreate();
    this.index++;
  }

  
  CreateItemFee() {
    let str = "";
    str += '  <div class="mb-3 row align-items-center">';
    str +=
      '<label for="recipient-name" class="col-form-label">Select a city</label>';
    str += '<div class="col-md-4 mb-2">';

    str +=
      '<select style="width: 100%;" id="country_id' +
      this.index +
      '"  class="form-control select1">';

    str += " </select>";
    str += " </div>";
    str += ' <div class="col-md-4 mb-2">';
    str +=
      '<select style="width: 100%;" data-index="' +
      this.index +
      '"  id="province_id' +
      this.index +
      '" class="form-control select1"></select>';
    str += "</div>";
    str += ' <div class="col-md-4 mb-2">';
    str +=
      ' <select style="width: 100%;" id="city_id' +
      this.index +
      '" class="form-control select2"></select>';
    str += " </div>";

    str += '<div class="col-md-4 mb-2">';
    str +=
      '<input type="text" placeholder="number from" class="form-control"  id="number_from' +
      this.index +
      '">';

    str += "</div>";

    str += '<div class="col-md-4 mb-2">';
    str +=
      '<input type="text" placeholder="number to" class="form-control"  id="number_to' +
      this.index +
      '">';

    str += "</div>";

    str += '<div class="col-md-3">';
    str +=
      '<input type="text" placeholder="Price" class="form-control"  id="price' +
      this.index +
      '">';

    str += "</div>";
    str += "</div>";

    this.Div.append(str);
    this.AfterCreate();
    this.index++;
  }

  AfterCreate() {
    CreateSelectOption(
      {
        url: URLPATH + "fetchData/country_get",
        params: { order: "sort_name", order_type: "asc", number: "300" },
      },
      { id: "country_id" + this.index, value: "id", title: "name" }
    );
    this.CreateChange();

    setSelectMultiId("city_id" + this.index);
    setSelectsClass("select1");
  }

  AfterCreateNoMulti(country_id="",province_id="",city_id="") {
    CreateSelectOption(
      {
        url: URLPATH + "fetchData/country_get",
        params: { order: "sort_name", order_type: "asc", number: "300" },
      },
      { id: "country_id" + this.index, value: "id", title: "name" },country_id,true
    );
    this.CreateChangeWithoutPrice(province_id,city_id);


    setSelectsClass("select1");
  }

  CreateChange() {
    let CountryId = document.getElementById("country_id" + this.index);
    let ProvinceId = document.getElementById("province_id" + this.index);
    let CityId = document.getElementById("city_id" + this.index);

    let Province = "province_id" + this.index;

    CountryId.onchange = () => {
      let country_id = CountryId.value;
      CreateSelectOption(
        {
          url: URLPATH + "province/get",
          params: { country_id, number: "300" },
        },
        { id: Province, value: "id", title: "name" }
      );
    };

    ProvinceId.onchange = (e) => {
      let index = e.currentTarget.dataset.index;
      let province_id = ProvinceId.value;
      CreateSelectOption(
        {
          url: URLPATH + "city/get",
          params: { province_id, number: "300" },
        },
        { id: "city_id" + index, value: "id", title: "name" }
      );
    };
    CityId.onchange=(e)=>{
      
      let city=this.GetCity();
      let value=e.currentTarget.value;
      let id=e.currentTarget.id;
      let number=0;
      for(let i=0;i<city.length;i++)
      {
     
        city[i].forEach(e => {
          
          if(value==e &&  e!=""){
           number++;

          }
          if(value==e &&  e!="" && number>1){
         
            $("#"+id).val([]).trigger("change");
            toast("This city is already registered","error");
            number=0;

          }
        });
      }
    }
  }

  CreateChangeWithoutPrice(province_id="",city_id="") {
    let CountryId = document.getElementById("country_id" + this.index);
    let ProvinceId = document.getElementById("province_id" + this.index);

    let Province = "province_id" + this.index;

    CountryId.onchange = () => {
      let country_id = CountryId.value;
      CreateSelectOption(
        {
          url: URLPATH + "province/get",
          params: { country_id, number: "300" },
        },
        { id: Province, value: "id", title: "name" },province_id,true
      );
    };

    ProvinceId.onchange = (e) => {
      let index = e.currentTarget.dataset.index;
      let province_id = ProvinceId.value;
      CreateSelectOption(
        {
          url: URLPATH + "city/get",
          params: { province_id, number: "300" },
        },
        { id: "city_id" + index, value: "id", title: "name" },city_id
      );
    };

  }

  GetCountry = () => {
    let array = [];
    for (let i = 1; i < this.index; i++) {
      array.push($("#country_id" + i).val());
    }

    return array;
  };

  GetProvince = () => {
    let array = [];
    for (let i = 1; i < this.index; i++) {
      array.push($("#province_id" + i).val());
    }

    return array;
  };

  GetCity = () => {
    let array = [];
    for (let i = 1; i < this.index; i++) {
      array.push($("#city_id" + i).val());
    }

    return array;
  };

  GetPrice = () => {
    let array = [];
    for (let i = 1; i < this.index; i++) {
      array.push($("#price" + i).val());
    }

    return array;
  };

  GetTotalData = () => {
    let array = [];
    for (let i = 1; i < this.index; i++) {
        let item={
            country_id:$("#country_id" + i).val(),
            province_id:$("#province_id" + i).val(),
            price:$("#price" + i).val(),
            city_id:$("#city_id" + i).val(),
        }
      array.push(item);
    }
    return array;
  };
  
  GetTotalDataFee = () => {
    let array = [];
    for (let i = 1; i < this.index; i++) {
        let item={
            country_id:$("#country_id" + i).val(),
            province_id:$("#province_id" + i).val(),
            price:$("#price" + i).val(),
            city_id:$("#city_id" + i).val(),
            number_to:$("#number_to" + i).val(),
            number_from:$("#number_from" + i).val(),
        }
      array.push(item);
    }
    return array;
  };

  GetTotalDataWithoutPrice = () => {
    let array = [];
    for (let i = 1; i < this.index; i++) {
        let item={
            country_id:$("#country_id" + i).val(),
            province_id:$("#province_id" + i).val(),
            city_id:$("#city_id" + i).val(),
        }
      array.push(item);
    }
    return array;
  };

  SetValMulti=(str)=>{
    let data=str.split(",");
    data.forEach(d => {
      
      let val=d.split("::");
      this.CreateItemWithoutPrice(val[0],val[1],val[2]);
    });
  }
}
