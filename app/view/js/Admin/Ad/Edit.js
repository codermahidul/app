import { CreateSelectOption } from "../../Fetch/Common.js";
import { fileInput,GetIdFromUrl,tokenizAjax } from "../../functions/Common.js";

let Adds = await import("./AdClass.js?v=" + Date.now())

const AdClass = Adds.AdClass;

const AdC = new AdClass("frmNew","AdSettingList");
const BtnAdd=document.getElementById("btnAddNew");
const AddMoreLinks=document.getElementById("add_more_links");

if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        AdC.AddNew(BtnAdd,"sponsorship/update");
    }
}

if(AddMoreLinks !==null)
{
    AddMoreLinks.onclick=()=>{
        AdC.AddLink();
    }
}


const FirstSet=()=>{
    return new Promise(resolve=>{
        AdC.SetProof();
        setTimeout(() => {
            resolve();
        }, 1000);
    })
    
}


async function GetDatas(){
     await FirstSet();
     AdC.ShowData("sponsorship/get",{idSearch:GetIdFromUrl()});

     $("#idSearch").val(GetIdFromUrl());
}

GetDatas();