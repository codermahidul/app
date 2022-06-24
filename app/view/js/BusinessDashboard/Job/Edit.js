
import { URLPATH } from "../../Fetch/Setting.js";
import { fileInput,GetIdFromUrl,tokenizAjax } from "../../functions/Common.js";

let Common = await import("../../Fetch/Common.js?v=" + Date.now())
let Job = await import("./JobClass.js?v=" + Date.now())

const CreateSelectOption=Common.CreateSelectOption;
const JobClass = Job.JobClass;

const JobC = new JobClass("frmNew","JobList");
const BtnAdd=document.getElementById("btnAddNew");


if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        JobC.EditInfo(BtnAdd,"job/updateJob");
    }
}

const FirstSet=()=>{
    return new Promise(resolve=>{
        fileInput("fileInputs");
        JobC.SetProof();
        setTimeout(() => {
            resolve();
        }, 1000);
    })
    
}


async function GetDatas(){
     await FirstSet();
     JobC.ShowData("job/getData",{idSearch:GetIdFromUrl()});

}

GetDatas();
