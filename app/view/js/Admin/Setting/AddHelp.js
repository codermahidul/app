import { GetIdFromUrl, fileInput } from "../../functions/Common.js";

let Help = await import("./HelpClass.js?v=" + Date.now())

const HelpClass = Help.HelpClass;

const Hlp = new HelpClass("frmNew","HelpList");

const BtnAdd=document.getElementById("btnSave");
const AddMoreLinks = document.getElementById("add_more_links");
const AddMoreCat=document.getElementById("add_more_cat");
const ResetCat=document.getElementById("reset_cat");







AddMoreLinks.onclick=()=>{
    Hlp.CreateLink("more_link");
}

if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        Hlp.AddNew(BtnAdd,"help/addNew");
    }
}

fileInput("fileInputs");
