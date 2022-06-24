import { CreateSelectOption, CreateSelectOptionMultiValue } from "../Fetch/Common.js";

let MoreCategoryC = await import("../Class/MoreCategory.js?v=" + Date.now());

const Section=document.getElementById("section")

const MoreCategory = MoreCategoryC.MoreCategory;

let MoreCategories=new MoreCategory("coupon");

export const ChangeSection=()=>{
    

    $("#more_cat").css("display","none");
    $("#programs").css("display","none");

    
    let value=Section.value;
    value=value.split(",");

    if(value[1]=='1')
    {
        
        $("#more_cat").css("display","block");
        $("#programs").css("display","none");
        MoreCategories.ResetMoreCat();
        MoreCategories.ChangeType("");
        MoreCategories.RemoveCategoryInput("more_cat");
        MoreCategories.AddCategoryInput($("#more_cat"));
        MoreCategories.ChangeType(value[3]);
        

    }
    if(value[2]=="1")
    {
        $("#more_cat").css("display","none");
        $("#programs").css("display","block");
        MoreCategories.ResetMoreCat();
        MoreCategories.RemoveCategoryInput("more_cat");
    }
}

export const GetCatVal=()=>{
    return MoreCategories.GetCatId().toString();
}

CreateSelectOption({ url: "fetchData/proof_get", params: { type: "program" } }, { id: "proof_id", value: "id", title: "title" })
CreateSelectOptionMultiValue({ url: "setting/getSection", params: { show_banner:"1"} }, { id: "section", value: "id,have_category,have_proof,category_name", title: "name" })
