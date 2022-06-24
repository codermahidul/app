import { Fetching } from '../Fetch/Common.js';
import { block } from '../functions/Block.js';
const Business=document.getElementsByClassName("set-business");

const SetBusinessClick=()=>{
    for(let i=0;i<Business.length;i++)
    {
        Business[i].onclick=(e)=>{
            block();
            let data=(e.currentTarget.dataset);
            Fetching("userBusinessAction/SetCookieBusiness",{id:data.id}).then((data)=>{window.location.reload()})
        }
    }
}


SetBusinessClick()