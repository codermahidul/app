import { SetCatParam, fetchCat } from "../functions/Category.js";

import { Fetching } from "../Fetch/Common.js";
import { onlyUnique } from "../functions/Common.js";

export class MoreCategory {
  constructor(TYPECat, ModalCat = "modalCategory", IDCatDiv = "category_data") {
    this.TYPECat = TYPECat;
    this.ModalCat = $("#" + ModalCat);
    this.IDCatDiv = IDCatDiv;

    this.indexCat = 1;
    this.catShowId = "";
    this.catIds = [];
    this.catIdsParent = [];
  }

  ChangeType = (TYPECat) => {
    this.TYPECat = TYPECat;
  };

  AddCategoryInput(div, edit = "", id = "category_id") {
    let str = "";
    str +=
      '<label for="recipient-name" class="col-form-label">Category:</label>';
    str +=
      '<div data-dismiss="modal" type="text" class="form-control p-3 min-radus point" id="' +
      id +
      edit +
      this.indexCat +
      '">';
    str += "</div>";
    div.append(str);

    this.CreateCatDiv(id + edit);
    this.indexCat++;
  }

  CreateCatDiv = (id) => {
    SetCatParam(this.ModalCat, this.IDCatDiv, this.TYPECat, this.SetDataMore);
    document.getElementById(id + this.indexCat).onclick = (e) => {
      this.catShowId = e.currentTarget.id;
      fetchCat({ type: this.TYPECat, parent: "0" }, "0");
    };
  };

  SetValueParentAndId = (parents, ids, elId) => {
    if (this.catIdsParent.length <= 0) {
      this.catIdsParent.push({ id: elId, data: parents });
    } else {
      let exist = false;
      this.catIdsParent.forEach((d) => {
        if (d.id === elId) {
          d.data = parents;
          exist = true;
        }
      });
      if (!exist) {
        this.catIdsParent.push({ id: elId, data: parents });
      }
    }

    if (this.catIds.length <= 0) {
      this.catIds.push({ id: elId, data: ids });
    } else {
      let exist2 = false;
      this.catIds.forEach((d) => {
        if (d.id === elId) {
            d.data = ids;
            exist2 = true;
          }
  
      });
      if (!exist2) {
        this.catIds.push({ id: elId, data: ids });
      }
    }

  };

  SetDataMore = (data) => {
    
    let catIdsParent = [];
    let catIds = [];
    catIdsParent = [...catIdsParent, ...data.IdsParent, ...[data.id]];
    catIds.push(data.id);
    this.SetValueParentAndId(catIdsParent, catIds, this.catShowId);
   

    $("#" + this.catShowId).html(data.name);
    this.ModalCat.modal("hide");
  };

  SetDataMoreWithoutParent = (data) => {
    
    let catIdsParent = [];
    let catIds = [];
    if(data.IdsParent!==undefined)
    {
      catIdsParent = [...catIdsParent, ...data.IdsParent, ...[data.id]];

    }else
    {
      catIdsParent = [...catIdsParent, ...[data.id]];

    }
    catIds.push(data.id);
    this.SetValueParentAndId(catIdsParent, catIds, this.catShowId);
   

    $("#" + this.catShowId).html(data.name);
    this.ModalCat.modal("hide");
  };
  
  GetCatId = () => {
      let array=[];
      this.catIds.forEach(d => {
        array.push(d.data)
      });
      return array.filter(onlyUnique);
  };

  GetCatIdParent = () => {
    let array=[];
    this.catIdsParent.forEach(d => {

      array=[...array,...d.data]
    });
    return array.filter(onlyUnique);
  };

  ResetMoreCat = () => {
    this.indexCat = 1;
    this.catShowId = "";
    this.catIds = [];
    this.catIdsParent = [];
  };

  ShowEditCat = (cat, parent, div, id = "category_id_e",edit="_e",fn=()=>{}) => {
 
      let arrays=[];
    if (cat !== null) {
      let items = cat.split(",");
      items.forEach((dd) => {
        let data = dd.split("::");

        Fetching("category/getComplete",{idSearch:data[0]}).then((data)=>{

        let d=data.data.data[0];
  
         this.AddCategoryInput(div, edit);
         let elId=id + (this.indexCat - 1);
         $("#" + elId).html(d.name);
       
         this.SetValueParentAndId(d.parent_id,d.id,elId)
         fn();

        })

      });
     
    } else {
      this.AddCategoryInput(div, "_e");
    }
  };

  RemoveCategoryInput = (id) => {
    $("#" + id).html("");
  };
}
