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

const getMyNote = () => {
    starNotificationHeader.innerHTML = "";
    SideProfileNote.innerHTML = "";
    
    Fetching("userAction/getMyNoteBusiness", { is_read: 0,type_name:"professionalUser" }).then((data) => {
        if (data.status === "true") {
            if (data.data.total > 0) {
                starNotificationHeader.innerHTML = "*";
                SideProfileNote.innerHTML = "*";
                notes = data.data.data;

            }else
            {
                MainDiv.style.display="none";
            }
        }
    })
}

const ShowResult = () => {
    if(!Open)
    {
        MainDiv.style.display="none";
        return false;
    }
    DivResult.innerHTML = "";
    MainDiv.style.display="block";
    let str = '';
    if(notes.length>0){
     
        notes.forEach(e => {
            str += '<div class="col-md-12 p-3 border-bottom mb-2 row ">';
            str += '<div class="col-md-12">';
            str += '<span class="text-warning"><i class="bi bi-envelope-fill"></i> </span>';
            str += '<span class="text-success">'+e.created_at+'</span>';
            str += '</div>';

            str+='<a href="'+URLPATH+'MyNotificationBusiness/'+e.id+'">';
            str += '<div class="colmd-12 mt-1 text-muted">';
            str += '<strong>'+e.text.substring(0, 100) +' ... </strong>';
            str += '</div>';
            str+='</a>';

            str += '</div>'; 
        });
        str += '<div class="col-md-12 p-3 border-bottom mt-4 mb-2  text-center">';
        str+='<a class="btn btn-prim" href="'+URLPATH+'MyNotificationBusiness">View All</a>';
        str += '</div>';
        DivResult.innerHTML=str;
    }

}

if(IconNote !==null)
{
    IconNote.onclick = () => {
        Open=!(Open);
        ShowResult();
    }
}


getMyNote();
//setInterval(function(){ getMyNote(); }, 7000);
