
import { block, unblock } from "./Block.js";
import { CreateListCategory, GetCategoryData, parents, IdsParent } from "./Common.js";


let ModalCatSEARCH = "";
let IDCatDivSEARCH = "";
let TYPECatSEARCH="";
let SETDATASEARCH = () => { };


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

export const SetCatParamSearch = (ModalCat, IDCatDiv, TYPECat, SEARCHFan) => {

    ModalCatSEARCH = ModalCat;
    IDCatDivSEARCH = IDCatDiv;
    TYPECatSEARCH = TYPECat;
    SETDATASEARCH = SEARCHFan;

}



export const RunAfterShowsCat = () => {

    let catNext = document.getElementsByClassName("catNext");
    let catSet = document.getElementsByClassName("catSet");
    let Backs = document.getElementsByClassName("btn-cat-back");

    for (let i = 0; i < catNext.length; i++) {
        catNext[i].onclick = (e) => {
            GoNextCatSearch(e)
        };
    };

    for (let i = 0; i < catSet.length; i++) {
        catSet[i].onclick = (e) => {
            SetCat(e)
        };

    };

    for (let i = 0; i < Backs.length; i++) {
        Backs[i].onclick = (e) => {
            BackCatSearch(e)
        };

    };
}


export const fetchCatSearch = (param, parent = "0") => {
    block();

    let ModalCat = ModalCatSEARCH;
    let IDCatDiv = IDCatDivSEARCH;
    GetCategoryData(param, (data) => {
        ModalCat.modal("show");
        CreateListCategory(data.data.data, IDCatDiv, parent);
        unblock();
        RunAfterShowsCat();
    })
}



export const fetchBackCatSearch = (param) => {
    block();
    let IDCatDiv = IDCatDivSEARCH;
    GetCategoryData(param, (data) => {
        let parent = data.data.data[0].parent
        block();
        CreateListCategory(data.data.data, IDCatDiv, parent);
        unblock();
        RunAfterShowsCat();
    })
}

export const GoNextCatSearch = (e) => {
    let TYPECat = TYPECatsearch;
    let id = e.currentTarget.dataset.id;
    let parent = e.currentTarget.dataset.parent;
    parents.push(parent);
    IdsParent.push(id);
    fetchCatSearch({ type: TYPECat, parent: id }, parent);
}

export const SetCat = (e) => {
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    SETDATASEARCH({ id, IdsParent, name });
}

export const BackCatSearch = (e) => {
    let parent = parents[parents.length - 1];
    parents.pop();
    IdsParent.pop();
    fetchBackCatSearch({ parent });
}

