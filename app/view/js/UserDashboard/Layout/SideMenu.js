import { GetUserOnlineInfo } from "../../Fetch/Common.js";
import AddEven from "../../functions/AddEventListner.js";


const btnMenu1 = document.getElementById("openCloseSideMenu");
const btnMenu2 = document.getElementById("openCloseSideMenu2");
const sideBar = document.getElementById("sideBar");
const contain_all = document.getElementById("contain_all");

const opens = () => {
    sideBar.classList.add("sideebaropen");
    sideBar.classList.remove("sideebarclose");
    if ($(window).width() >= 1025) {
        contain_all.classList.remove("contain-all-close-menu");
        contain_all.classList.add("contain-all");
    } else {
        contain_all.classList.remove("contain-all");
        contain_all.classList.add("contain-all-close-menu");
    }


}

const closes = () => {
    sideBar.classList.add("sideebarclose");
    sideBar.classList.remove("sideebaropen");
    contain_all.classList.remove("contain-all");
    contain_all.classList.add("contain-all-close-menu");
}

const openClose = () => {

    if ($(window).width() >= 1025) {
        opens();

    } else {
        closes();
    }
}

const openCloseSideMenu = () => {

    if (sideBar.classList.contains("sideebaropen")) {

        closes();
    } else {
        opens();
    }
}

openClose();

$(window).resize(function () {

    openClose();
});
btnMenu1.onclick = openCloseSideMenu;
btnMenu2.onclick = openCloseSideMenu;

const showSubMenu = (event,setactive=false) => {
    let id="";
    let icon="";
    if (event.currentTarget !==undefined) {
         id = event.currentTarget.dataset.id;
    }else{
         id = event[0].dataset.id;
    }

    if (event.currentTarget !==undefined) {
         icon = event.currentTarget.children[2];
    }else{
         icon = event[0].children[2];
    }


    let el = document.getElementById(id);
    if (el.classList.contains("hide")) {
        el.classList.remove("hide");
        el.classList.add("show");
        icon.classList.remove(icon.classList[1]);
        icon.classList.add('bi-chevron-down')
    } else {
        el.classList.remove("show");
        el.classList.add("hide");
        icon.classList.remove(icon.classList[1]);
        icon.classList.add('bi-chevron-right')
    }

    if(setactive)
    {
        
        $(".pl").removeClass("active");
        if(event[0] !==undefined)
        event[0].parentNode.classList.add("active");
        else
        event.currentTarget.parentNode.classList.add("active");
        
    }
}

AddEven("a.collapsed", "click", showSubMenu);


$(() => {
    let tags = $('a.sub-menu');
    for (let i = 0; i < tags.length; i++) {
        let element = tags[i];
        let href = element.href;
        href = href.split("/");
        let address = href[(href.length - 1)];
        let now_href = window.location.href;
        now_href = now_href.split("/");
        let now_address = now_href[(now_href.length - 1)];
        if (now_address === address) {
            let datas = element.dataset;
            let parent = datas.parent;
            showSubMenu($("#" + parent),true);
            element.classList.add("iactive");
        }

    }

})

GetUserOnlineInfo();

