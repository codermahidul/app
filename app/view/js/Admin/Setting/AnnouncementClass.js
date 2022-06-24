import { SendDataForm, tokenizAjax } from "../../functions/Common.js";

let MoreCategoryC = await import("../../Class/MoreCategory.js?v=" + Date.now());
const  Cites = await import("../../Class/City.js?v=" + Date.now());
const City = Cites.City;
const MoreCategory = MoreCategoryC.MoreCategory;

export class Announcement{

    constructor(){
        
        this.MoreCategories = new MoreCategory("business");
        this.CityClass = new City('addCity');
        this.idSearch=0;
        if ($("#more_cat").length > 0)
        this.MoreCategories.AddCategoryInput($("#more_cat"));

        this.CityClass.CreateItemWithoutPrice();
        tokenizAjax("userSearch", false, "userBusinessAction/getUserInfo", {}, "display_name", "","display_name");

    }

    setIdSearch(id){
        this.idSearch=id
    }

    Reset(){
        this.MoreCategories.ResetMoreCat();
        this.MoreCategories.RemoveCategoryInput("more_cat");
        this.MoreCategories.AddCategoryInput($("#more_cat"));
    }

    AddCat(){
        this.MoreCategories.AddCategoryInput($("#more_cat"));

    }

    AddCity(){
        this.CityClass.CreateItemWithoutPrice(); 
    }

    SaveData(Btn,Frm,url,fn,check=[],idUser="user_id"){
        SendDataForm(Btn,Frm,url,check,[
            {name:'cities',value:JSON.stringify(this.CityClass.GetTotalDataWithoutPrice())},
            {name:'users',value:$("#"+idUser).val().toString()},
        ],false,()=>{fn()});
    }

}