import { GetIdFromUrl, fileInput, tokenizAjax } from "../../functions/Common.js";

let Help = await import("./HelpClass.js?v=" + Date.now())

const HelpClass = Help.HelpClass;

const Hlp = new HelpClass("frmNew","HelpList");

const BtnSave=document.getElementById("btnSave");

if(BtnSave!==null)
{
    BtnSave.onclick=()=>{
        Hlp.EditInfoWithoutModal(BtnSave,"help/updateHelp");
    }
}

const FirstSet=()=>{
    return new Promise(resolve=>{
        fileInput("fileInputs");
        resolve();
    })
}

async function GetDatas(){
     await FirstSet();
     Hlp.ShowDataWithOutModal("help/get",{idSearch:GetIdFromUrl()})
}


$("#idSearch").val(GetIdFromUrl())
GetDatas();