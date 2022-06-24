
import { fileInput,GetIdFromUrl } from "../../functions/Common.js";

let Common = await import("../../Fetch/Common.js?v=" + Date.now())
let Job = await import("../../BusinessDashboard/Job/JobClass.js?v=" + Date.now())

const CreateSelectOption=Common.CreateSelectOption;
const JobClass = Job.JobClass;

const JobC = new JobClass("frmNew","MyJobAdmin");
const BtnAdd=document.getElementById("btnAddNew");


if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        JobC.EditInfo(BtnAdd,"job/updateJobAdmin");
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
     JobC.ShowData("job/getDataAdmin",{idSearch:GetIdFromUrl()});

}

GetDatas();
