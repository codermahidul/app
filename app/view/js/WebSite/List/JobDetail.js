import { ShowLoginModal } from '../LoginModal.js';
import  { SwalRemoveFetch } from '../../functions/SwalDelete.js';

const Apply=document.getElementById("apply");


let logged=$("#logged").val();

if(Apply !==null)
{

    Apply.onclick=()=>{
        if(logged !=='true')
        {
            ShowLoginModal();
            return false;
        }
    
        SwalRemoveFetch("job/apply",{"job_id":$("#job_id").val()},()=>{
            window.location.reload();
        },"Apply","Are you sure you want to apply?","info","Ok","",false," Your Resume has been Sended!");

   
        
    }
}


