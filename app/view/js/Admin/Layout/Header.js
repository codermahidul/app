import { Fetching } from '../../Fetch/Common.js';
import {  URLPATH } from '../../Fetch/Setting.js';

const profNav = document.getElementById("profNav");
const profSidemenu = document.getElementById("profSidemenu");
const CloseNavProf = document.getElementById("closeNavProf");


profNav.onclick = () => {
    profSidemenu.style.width = "180px";
}

CloseNavProf.onclick = () => {
    profSidemenu.style.width = "0px";
}









