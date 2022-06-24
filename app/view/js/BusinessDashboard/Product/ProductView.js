import { Fetching } from "../../Fetch/Common.js";
import { URL } from "../../Fetch/Setting.js";

const ModalViewEvent = $("#ModalViewEvent");
const DivImage = document.getElementById("imgEvent");
const Desc = document.getElementById("descriptionEvent");
const DivTitle = document.getElementById("titleEvent");
const DivCategory = document.getElementById("category_id_view");
const DivLink = document.getElementById("Links");
const prise = document.getElementById("prise");


export const ShowInfoDataDiv = (id,url="product/getData") => {


    Fetching(url, { idSearch: id }).then((data) => {

        ModalViewEvent.modal("show");
        DivImage.innerHTML = ""
        DivTitle.innerHTML = ""
        DivCategory.innerHTML = ""
        Desc.innerHTML = ""
        DivLink.innerHTML="";
        prise.innerHTML="";
        let d = data.data.data[0];

        if (d.file_url !== '' && d.file_url !== null && d.file_name !== '' && d.file_name !== null) {
            DivImage.innerHTML = '<img class="rounded" src="' + URL + d.file_url + '/thumb/' + d.file_name + '">';
        }

        DivTitle.innerHTML='<h4>'+d.title+'</h4>';
        Desc.innerHTML=d.description;
        prise.innerHTML=d.price;
        DivCategory.innerHTML=d.category_name;
        let elstr="";
        if (d.product_tag !== '' && d.product_tag !== null) {          
            let links=d.product_tag.split(",");
            elstr+="<h5 class='mb-3 text-dark mt-3'>Buy Links</h5>";
            links.forEach(e => {
                let datae=e.split("::");
                let type=datae[3];
                let href=datae[2];
                let title=datae[1];
                if(type==="buy")
                {
                    elstr+="<a class='mb-2 hrefs' target='_blank' href='"+href+"'>"+title+"</a>";
                }
            });


            elstr+="<h5 class='mb-3 text-dark mt-3'>Video Links</h5>";
            links.forEach(e => {
                let datae=e.split("::");
                let type=datae[3];
                let href=datae[2];
                let title=datae[1];
                if(type==="video")
                {
                    elstr+="<a class='mb-2 hrefs' target='_blank' href='"+href+"'>"+title+"</a>";
                }
            });
        }

        DivLink.innerHTML=elstr;

       
    })
}

