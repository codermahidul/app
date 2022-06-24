import { Fetching } from "../../Fetch/Common.js";
import { fetchCat, SetCatParam } from "../../functions/Category.js";
import { onlyUnique } from "../../functions/Common.js";

const AddMoreBtn = document.getElementById("add_more_cat");
const AddMoreBtnEdit = document.getElementById("add_more_cat_e");
const ResetEdit=document.getElementById("reset_cat_e");
const ResetNew=document.getElementById("reset_cat");

const ModalCat = $("#modalCategory");
const IDCatDiv = "category_data";
const TYPECat = "product";


let indexCat = 1;
let catShowId = "";
let catIds = [];
let catIdsParent = [];
if(AddMoreBtn !==null)
{
    AddMoreBtn.onclick = () => {
        let id = AddMoreBtn.dataset.id
        let div = $("#" + id);
        let str = '';
        str += '<label for="recipient-name" class="col-form-label">Category:</label>';
        str += '<div data-dismiss="modal" type="text" class="form-control p-3 min-radus point" id="category_id' + indexCat + '">';
        str += '</div>';
        div.append(str);
    
        CreateCatDiv();
        indexCat++;
    }
}

if(AddMoreBtnEdit !==null)
{
    AddMoreBtnEdit.onclick = () => {
        let id = AddMoreBtnEdit.dataset.id
        let div = $("#" + id);
        let str = '';
        str += '<label for="recipient-name" class="col-form-label">Category:</label>';
        str += '<div data-dismiss="modal" type="text" class="form-control p-3 min-radus point" id="category_id_e' + indexCat + '">';
        str += '</div>';
        div.append(str);
    
        CreateCatDivEdit();
        indexCat++;
    }
}


const CreateCatDiv = () => {
    document.getElementById("category_id" + indexCat).onclick = (e) => {
        catShowId = e.currentTarget.id;
        fetchCat({ type: "product", parent: "0" }, "0");
    };

    SetCatParam(ModalCat, IDCatDiv, TYPECat, SetDataMore);
}

const CreateCatDivEdit = () => {
    document.getElementById("category_id_e" + indexCat).onclick = (e) => {
        catShowId = e.currentTarget.id;
        fetchCat({ type: "product", parent: "0" }, "0");
    };

    SetCatParam(ModalCat, IDCatDiv, TYPECat, SetDataMore);
}

const SetValueParentAndId = (parents, ids, elId) => {
    if (catIdsParent.length <= 0) {
      catIdsParent.push({ id: elId, data: parents });
    } else {
      let exist = false;
      catIdsParent.forEach((d) => {
        if (d.id === elId) {
          d.data = parents;
          exist = true;
        }
      });
      if (!exist) {
        catIdsParent.push({ id: elId, data: parents });
      }
    }

    if (catIds.length <= 0) {
      catIds.push({ id: elId, data: ids });
    } else {
      let exist2 = false;
      catIds.forEach((d) => {
        if (d.id === elId) {
            d.data = ids;
            exist2 = true;
          }
  
      });
      if (!exist2) {
        catIds.push({ id: elId, data: ids });
      }
    }

  };

const SetDataMore = (data) => {

    let catIdsParentsS = [];
    let catIdsS = [];
    catIdsParentsS = [...catIdsParentsS, ...data.IdsParent, ...[data.id]];
    catIdsS.push(data.id);
    SetValueParentAndId(catIdsParentsS, catIdsS,catShowId);
   


    $("#" + catShowId).html(data.name);
    ModalCat.modal("hide")
}

export const GetCatId = () => {

    let array=[];
    catIds.forEach(d => {
      array.push(d.data)
    });
    return array.filter(onlyUnique);

}
export const GetCatIdParent = () => {
    let array=[];
    catIdsParent.forEach(d => {

      array=[...array,...d.data]
    });
    return array.filter(onlyUnique);
    
}

export const ResetMoreCat = () => {
    indexCat = 1;
    catShowId = "";
    catIds = [];
    catIdsParent = [];
    let id = AddMoreBtn.dataset.id
    let div = $("#" + id);
    div.html("")
    AddMoreBtn.click();
}

export const ShowEditCat=(cat,parent)=>{

  let items=cat.split(",");
  EmptyDivEdit();
  items.forEach(dd => {
      
      let data=dd.split("::");

      
      Fetching("category/getComplete",{idSearch:data[0]}).then((data)=>{

        let d=data.data.data[0];
  
        AddMoreBtnEdit.click();
         let elId="category_id_e" + (indexCat - 1);
         $("#" + elId).html(d.name);
       
         SetValueParentAndId(d.parent_id,d.id,elId)

        })
      
      
  });

}

const EmptyDivEdit=()=>{
    let id=AddMoreBtnEdit.dataset.id;
    $("#"+id).html("");
    indexCat = 1;
    catShowId = "";
    catIds = [];
    catIdsParent = [];
}

if(ResetEdit!==null)
{
    ResetEdit.onclick=()=>{
        EmptyDivEdit();
        AddMoreBtnEdit.click();
    }
}

if(ResetNew !==null)
{
    ResetNew.onclick=()=>{
        ResetMoreCat();
        
    }
}

if(AddMoreBtn !==null)
{
    AddMoreBtn.click();
}

