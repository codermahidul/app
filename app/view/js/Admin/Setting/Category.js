import { CreateSelectOption, Fetching } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";

import { SendDataForm } from "../../functions/Common.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";
import { fetchJustCat } from "../../functions/Category.js";

const TypeDiv = document.getElementById("types");
const Buttons = document.getElementById("btns");
const Result = document.getElementById("category_data");
const Back = document.getElementById("back");
const AddNew = document.getElementById("addNewBtn");
const BtnModalAddCat = document.getElementById("btnModalAddCat");
const ModalQuestions = $("#ModalQuestions");
const BtnModalQuestions = document.getElementById("btnModalQuestions");
const Text = document.getElementById("text");
const DivShowQuestion = document.getElementById("result_question");
const ProofQ=document.getElementById("proofQ")

let parent = "0";
let InsertParent = "0";
let BackParent = ['0'];
let TYpeCat = "";

const SetActionShowsCatType = () => {

    let catType = document.getElementsByClassName("cat-type");

    for (let i = 0; i < catType.length; i++) {
        catType[i].onclick = (e) => {
            ShowCats(e)
        };
    };

}


const SetShowChild = () => {

    let catType = document.getElementsByClassName("cat-addChild");
    let catEdit = document.getElementsByClassName("btn-edits");
    let catRemove = document.getElementsByClassName("btn-removes");
    let catQuestion = document.getElementsByClassName("btn-question");

    for (let i = 0; i < catType.length; i++) {
        catType[i].onclick = (e) => {
            ShowCatChildes(e)
        };

        catEdit[i].onclick = (e) => {
            ShowEdits(e)
        };

        catRemove[i].onclick = (e) => {
            Remove(e)
        };

        if(catQuestion[i]!==undefined)
        {
            catQuestion[i].onclick = (e) => {
                ShowQuestion(e)
            };
        }
       
    };

}

SetActionShowsCatType();

const ShowCats = (e) => {
    let type = e.currentTarget.dataset.type;
    TYpeCat = type;
    let p = parent;
    if (parent === "")
        p = "0";

    fetchJustCat({ type, parent: p }, showItem)
}

const ShowCatChildes = (e) => {

    let id = e.currentTarget.dataset.id;
    let p = id;
    InsertParent = id;
    fetchJustCat({ parent: p }, showItem)
}

const ShowItemAndHideType = () => {
    TypeDiv.style.display = "none";
    Buttons.style.display = "block ";
    Result.style.display = " block";
}

const HideItemAndHideType = () => {
    TypeDiv.style.display = "block";
    Buttons.style.display = "none ";
    Result.style.display = " none";
}

const ShowItemInfo = (data) => {

    let str = "";
    Result.innerHTML = "";
    let length = data.length;
    let i = 0;
    data.forEach(d => {
        i++;
        let classs = "col-md-12 row border-bottom mb-1 p-2 point ";
        if (i >= length) {
            classs = "col-md-12 row mb-1 p-2 point ";
        }
        str += '<div  class="' + classs + '">';
        str += '<div data-id="' + d.id + '" class="col-md-6 cat-addChild">' + d.name + '</div>';
        str += '<div class="col-md-6 text-right">';
        str += '<button data-id="' + d.id + '" class="btn  btn-primary  m-1 btn-edits"><i class="bi bi-pencil-fill"></i></button>';
        str += '<button data-id="' + d.id + '" class="btn  btn-danger  m-1 btn-removes"><i class="bi bi-trash-fill"></i></button>';
        if (d.have_children === 'false') {
            str += '<button data-id="' + d.id + '" class="btn  btn-success  m-1 btn-question"><i class="bi bi-question-circle"></i></button>';

        }
        str += '</div>';

        str += '</div>';
    });
    Result.innerHTML = str;
    SetShowChild();
}

const showItem = (response) => {

    if (response.status === 'false') {
        toast(response.err, "error");
        return false;
    }
    let data = response.data.data;
    if (data.length > 0) {
        parent = data[0].parent;
        if (data[0].parent !== "0")
            BackParent.push(data[0].parent);
    }
    ShowItemAndHideType();
    ShowItemInfo(data);



}

const showItemInBack = (response) => {

    if (response.status === 'false') {
        toast(response.err, "error");
        return false;
    }

    let data = response.data.data;
    if (data.length > 0) {
        parent = data[0].parent;


    }
    ShowItemAndHideType();
    ShowItemInfo(data);



}

Back.onclick = () => {
    if (parent === "0") {
        HideItemAndHideType();
        return 0;
    } else {

        fetchJustCat({ parent: BackParent[BackParent.length - 1], type: TYpeCat }, showItemInBack);
        if (BackParent[BackParent.length - 1] !== '0') {
            BackParent.pop();
        }

    }
}

AddNew.onclick = () => {

    $("#ModalAddCat").modal("show");
    $("#name_cat").val('');
}

const RefreshAdd=()=>{
    $("#ModalAddCat").modal("hide");
    Refrsh()
}

BtnModalAddCat.onclick = () => {
    
    // block;
    // Fetching("category/addnew", { parent: InsertParent, name: $("#name_cat").val(), type: TYpeCat }).then((data) => {
    //     unblock();
    //     $("#ModalAddCat").modal("hide");
    //     Refrsh()
    // })

    SendDataForm(BtnModalAddCat,"addFrm","category/addnew",[],[
        {name:"parent",value:InsertParent},
        {name:"type",value: TYpeCat}
    ],false,RefreshAdd);
}

const ShowEdits = (e) => {
    let id = e.currentTarget.dataset.id
    block;
    Fetching("category/get", { idSearch: id }).then((data) => {
        unblock();
        $("#ModalEditCat").modal("show");
        $("#name_cat_e").val(data.data.data[0].name);
        $("#rate_e").val(data.data.data[0].rate);
        $("#review_e").val(data.data.data[0].review);
        $("#idSearch").val(data.data.data[0].id)
    })
}

const RefreshEdit=()=>{
    $("#ModalEditCat").modal("hide");
    Refrsh()
}

btnModalEditCat.onclick = () => {
    SendDataForm(BtnModalAddCat,"editFrm","category/updatecategory",[],[
        
    ],false,RefreshEdit);
    // block;
    // Fetching("category/updatecategory", { idSearch: $("#idSearch").val(), name: $("#name_cat_e").val() }).then((data) => {
    //     unblock();
    //     $("#ModalEditCat").modal("hide");
    //     Refrsh();
    // })
}

const Refrsh = () => {
    if(InsertParent==="");
    InsertParent="0";
    fetchJustCat({ parent: InsertParent, type: TYpeCat }, showItemInBack)
}

const Remove = (e) => {
    let id = e.currentTarget.dataset.id
    SwalRemoveFetch("category/remove", { idSearch: id }, Refrsh, "Are you sure?", "", "warning", "Your data is safe!");
}


const ShowQuestion = (e) => {

    let id = e.currentTarget.dataset.id;
    $("#category_id").val(id);
    ModalQuestions.modal("show");
    GetQuestions({id});
}

const SetRemoves=()=>{
    let rb=document.getElementsByClassName("removeQ");
    for(let i=0;i<rb.length;i++)
    {
        rb[i].onclick = (e) => {
            RemoveQ(e)
        };
    }
}

const GetQuestions = (param) => {
    
    DivShowQuestion.innerHTML = "";
    block();
    Fetching("category/getQuestions", { category_id: param.id }).then((response) => {
        unblock();
        if (response.status === 'true') {
            let str = "";
            response.data.data.forEach(d => {
                str += '<div class="col-md-12 border-bottom p-2 grid-two-div">';
                str += '<div class="h6">' + d.text + '</div>';
                str += '<div class="h6"><span class="text-danger point removeQ" data-id="'+d.id+'" data-cat="'+d.category_id+'"><i class="bi bi-trash-fill"></i></span></div>';
                str += '</div>';

            });

            DivShowQuestion.innerHTML=str;
            SetRemoves();
        }
    })
}

const RemoveQ=(e)=>{
    
    let id = e.currentTarget.dataset.id;
    let cat_id=e.currentTarget.dataset.cat;
    SwalRemoveFetch("category/removeQuestion", { idSearch: id }, GetQuestions, "Are you sure?", "", "warning", "Your data is safe!",{id:cat_id});

}

BtnModalQuestions.onclick = () => {

    SendDataForm(BtnModalQuestions, "qFrm", "category/newQuestion", [Text], [
        {name:"category_id",value:$("#category_id").val()}
    ], true, GetQuestions, false, { id: $("#category_id").val() });

}

CreateSelectOption(
    { url: "fetchData/proof_get", params: { type: "rateQ" } },
    { id: "proofQ", value: "title", title: "title" }
  );

  if(ProofQ!==null){
      ProofQ.onchange=()=>{
        Text.value=ProofQ.value;
      }
  }