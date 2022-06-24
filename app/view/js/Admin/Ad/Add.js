import { CreateSelectOption } from "../../Fetch/Common.js";
import { fileInput,tokenizAjax } from "../../functions/Common.js";

let Adds = await import("./AdClass.js?v=" + Date.now())

const AdClass = Adds.AdClass;

const AdC = new AdClass("frmNew","AdSettingList");
const BtnAdd=document.getElementById("btnAddNew");
const AddMoreLinks=document.getElementById("add_more_links");

if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        AdC.AddNew(BtnAdd,"sponsorship/new");
    }
}

if(AddMoreLinks !==null)
{
    AddMoreLinks.onclick=()=>{
        AdC.AddLink();
    }
}

AdC.SetProof();