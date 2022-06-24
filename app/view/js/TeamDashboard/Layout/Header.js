import { Fetching } from '../../Fetch/Common.js';
import {  URLPATH } from '../../Fetch/Setting.js';

const profNav = document.getElementById("profNav");
const profSidemenu = document.getElementById("profSidemenu");
const CloseNavProf = document.getElementById("closeNavProf");
const starNotificationHeader = document.getElementById("star_notfication");
const DivResult = document.getElementById("div_header_notification");
const MainDiv =document.getElementById("main_div_notification");
const IconNote = document.getElementById("notification_icon");
const SideProfileNote=document.getElementById("side_profile_note");

let notes = [];
let Open=false;

profNav.onclick = () => {
    profSidemenu.style.width = "180px";
}

CloseNavProf.onclick = () => {
    profSidemenu.style.width = "0px";
}





if(IconNote !==null)
{
    IconNote.onclick = () => {
        Open=!(Open);
   
    }
}



