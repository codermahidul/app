import { CreateListCategory, IdsParent, parents } from "./Common.js";
import { Fetching, JustCreateOptionSelect } from "../Fetch/Common.js";
import { block, unblock } from "./Block.js";

let ComboCatsId = "";
let ComboCatsId2 = "";
let ModalCats = "";
let IDCatDivs = "";
let TYPECats = "";
let SETDATA = () => { };


const GetCategoryData = (param, fun) => {
    
    Fetching("category/get", param).then((data) => {
      fun(data);
    });
  };

export const EmptyParent = () => {

    let length = parents.length;
    for (let i = 0; i < length; i++)
        parents.pop();
}

export const EmptyIdsParent = () => {

    let length = IdsParent.length;
    for (let i = 0; i < length; i++)
        IdsParent.pop();
}

export const SetCatParam = (ModalCat, IDCatDiv, TYPECat, SETDATAFan) => {

    
    ModalCats = ModalCat;
    IDCatDivs = IDCatDiv;
    TYPECats = TYPECat;
    SETDATA = SETDATAFan;

}

export const SetCatParamCombo = (id,id2="") => {

    ComboCatsId=id
    ComboCatsId2=id2;

}

export const RunAfterShowsCat = () => {

    let catNext = document.getElementsByClassName("catNext");
    let catSet = document.getElementsByClassName("catSet");
    let Backs = document.getElementsByClassName("btn-cat-back");

    for (let i = 0; i < catNext.length; i++) {
        catNext[i].onclick = (e) => {
            GoNextCat(e)
        };
    };

    for (let i = 0; i < catSet.length; i++) {
        catSet[i].onclick = (e) => {
            SetCat(e)
        };

    };

    for (let i = 0; i < Backs.length; i++) {
        Backs[i].onclick = (e) => {
            BackCat(e)
        };

    };
}


export const fetchCat = (param, parent = "0") => {
    
    block();
    let ModalCat = ModalCats;
    let IDCatDiv = IDCatDivs;
    GetCategoryData(param, (data) => {
        
        ModalCat.modal("show");
        CreateListCategory(data.data.data, IDCatDiv, parent);
        unblock();
        RunAfterShowsCat();
    })
}


export const fetchJustCat = (param,callback=()=>{}) => {
    block();
    GetCategoryData(param, (data) => {
        unblock();
        callback(data);
    })
}

export const fetchCatCombo = (param, parent = "0") => {
   
    let combo = ComboCatsId;
    let combo2=ComboCatsId2;
    GetCategoryData(param, (data) => {
        JustCreateOptionSelect(data.data.data, combo, { value: "id", title: "name" })
        if(combo2 !=="")
        {
        JustCreateOptionSelect(data.data.data, combo2, { value: "id", title: "name" })

        }

    })
}

export const fetchBackCat = (param) => {
    block();
    let IDCatDiv = IDCatDivs;
    GetCategoryData(param, (data) => {
        let parent = data.data.data[0].parent
        block();
        CreateListCategory(data.data.data, IDCatDiv, parent);
        unblock();
        RunAfterShowsCat();
    })
}

export const GoNextCat = (e) => {
    let TYPECat = TYPECats;
    let id = e.currentTarget.dataset.id;
    let parent = e.currentTarget.dataset.parent;
    parents.push(parent);
    IdsParent.push(id);
    fetchCat({ type: TYPECat, parent: id }, parent);
}

export const SetCat = (e) => {
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    SETDATA({ id, IdsParent, name });
}

export const BackCat = (e) => {
    
    let data=e.currentTarget.dataset;
    let type=data.type;
    let parent = parents[parents.length - 1];
    parents.pop();
    IdsParent.pop();
    fetchBackCat({ parent,type });
}

