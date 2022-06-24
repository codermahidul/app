
import { fileInput,GetIdFromUrl } from "../../functions/Common.js";

let Job = await import("../../BusinessDashboard/Job/JobClass.js?v=" + Date.now())

const JobClass = Job.JobClass;

const JobC = new JobClass("frmNew","JobListP");
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
     JobC.ShowData("job/get",{idSearch:GetIdFromUrl()});

}

GetDatas();
