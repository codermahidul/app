
import { JustCreateOptionSelect } from "../Fetch/Common.js";
import { block, unblock } from "../functions/Block.js";
import { CreateListCategory, GetCategoryData } from "../functions/Common.js";

export class CategoryClass{

    constructor(){
        this.ComboCatsId = "";
        this.ComboCatsId2 = "";
        this.ModalCats = "";
        this.IDCatDivs = "";
        this.TYPECats = "";
        this.parents=[];
        this.IdsParent=[];
        this.SETDATA = () => { };
        this.pr={}
    }

    EmptyParent = () => {

        let length = this.parents.length;
        for (let i = 0; i < length; i++)
            this.parents.pop();
    }

    EmptyIdsParent = () => {

        let length = this.IdsParent.length;
        for (let i = 0; i < length; i++)
            this.IdsParent.pop();
    }

    SetCatParam = (ModalCat, IDCatDiv, TYPECat, SETDATAFan,pr) => {
        this.ModalCats = ModalCat;
        this.IDCatDivs = IDCatDiv;
        this.TYPECats = TYPECat;
        this.SETDATA = SETDATAFan;
        this.pr=pr;
    
    }

    SetCatParamCombo = (id,id2="") => {

        this.ComboCatsId=id
        this.ComboCatsId2=id2;
    
    }

    RunAfterShowsCat = () => {

        let catNext = document.getElementsByClassName("catNext");
        let catSet = document.getElementsByClassName("catSet");
        let Backs = document.getElementsByClassName("btn-cat-back");
    
        for (let i = 0; i < catNext.length; i++) {
            catNext[i].onclick = (e) => {
                this.GoNextCat(e)
            };
        };
    
        for (let i = 0; i < catSet.length; i++) {
            catSet[i].onclick = (e) => {
                this.SetCat(e,this)
            };
    
        };
    
        for (let i = 0; i < Backs.length; i++) {
            Backs[i].onclick = (e) => {
                this.BackCat(e)
            };
    
        };
    }

    fetchCat = (param, parent = "0") => {
        block();
        let ModalCat = this.ModalCats;
        let IDCatDiv = this.IDCatDivs;
        GetCategoryData(param, (data) => {
            
            ModalCat.modal("show");
            CreateListCategory(data.data.data, IDCatDiv, parent);
            unblock();
            this.RunAfterShowsCat();
        })
    }

    fetchJustCat = (param,callback=()=>{}) => {
        block();
        GetCategoryData(param, (data) => {
            unblock();
            callback(data);
        })
    }

    fetchCatCombo = (param, parent = "0") => {
   
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

    fetchBackCat = (param) => {
        block();
        let IDCatDiv = this.IDCatDivs;
        GetCategoryData(param, (data) => {
            let parent = data.data.data[0].parent
            block();
            CreateListCategory(data.data.data, IDCatDiv, parent);
            unblock();
            this.RunAfterShowsCat();
        })
    }

    GoNextCat = (e) => {
        let TYPECat = this.TYPECats;
        let id = e.currentTarget.dataset.id;
        let parent = e.currentTarget.dataset.parent;
        this.parents.push(parent);
        this.IdsParent.push(id);
        this.fetchCat({ type: TYPECat, parent: id }, parent);
    }

    SetCat = (e,th) => {
        
        let IdsParent=th.IdsParent;
        let id = e.currentTarget.dataset.id;
        let name = e.currentTarget.dataset.name;
        th.SETDATA({ id, IdsParent, name },th.pr);
    }

    BackCat = (e) => {
    
        let data=e.currentTarget.dataset;
        let type=data.type;
        let parent = this.parents[this.parents.length - 1];
        this.parents.pop();
        this.IdsParent.pop();
        this.fetchBackCat({ parent,type });
    }
} 


