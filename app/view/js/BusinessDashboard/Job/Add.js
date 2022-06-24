import { CreateSelectOption } from "../../Fetch/Common.js";
import { fileInput,tokenizAjax } from "../../functions/Common.js";

let Jobs = await import("./JobClass.js?v=" + Date.now())

const JobClass = Jobs.JobClass;

const jobC = new JobClass("frmNew","JobList");
const BtnAdd=document.getElementById("btnAddNew");


if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        jobC.AddNew(BtnAdd,"job/addNew");
    }
}
jobC.SetProof();
fileInput("fileInputs");
