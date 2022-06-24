import { fileInput } from "../../functions/Common.js";

let Jobs = await import("../../BusinessDashboard/Job/JobClass.js?v=" + Date.now())

const JobClass = Jobs.JobClass;

const jobC = new JobClass("frmNew","MyJobAdmin");
const BtnAdd=document.getElementById("btnAddNew");


if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        jobC.AddNew(BtnAdd,"job/newJobAdmin");
    }
}
jobC.SetProof();
fileInput("fileInputs");
