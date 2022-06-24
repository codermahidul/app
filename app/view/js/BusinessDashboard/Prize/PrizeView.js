import { Fetching } from "../../Fetch/Common.js";
import { URL } from "../../Fetch/Setting.js";
import {numberFormat} from '../../functions/numberFormat.js';

const ModalViewEvent = $("#ModalViewEvent");
const DivImage = document.getElementById("imgEvent");
const Desc = document.getElementById("descriptionEvent");
const DivTitle = document.getElementById("titleEvent");
const prise = document.getElementById("prise");
const numbers = document.getElementById("numbers");


export const ShowInfoDataDiv = (id,url="prize/getData") => {


    Fetching(url, { idSearch: id }).then((data) => {

        ModalViewEvent.modal("show");
        DivImage.innerHTML = ""
        DivTitle.innerHTML = ""
        Desc.innerHTML = ""
        prise.innerHTML="";
        numbers.innerHTML="";
        let d = data.data.data[0];

        if (d.file_url !== '' && d.file_url !== null && d.file_name !== '' && d.file_name !== null) {
            DivImage.innerHTML = '<img class="rounded" src="' + URL + d.file_url + '/thumb/' + d.file_name + '">';
        }

        DivTitle.innerHTML='<h4>'+d.title+'</h4>';
        Desc.innerHTML=d.description;
        prise.innerHTML=d.jvalues+' $';
        numbers.innerHTML=numberFormat(d.jnumber) 

       
    })
}

