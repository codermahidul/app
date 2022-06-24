import { Fetching, FetchingFile } from "../../Fetch/Common.js";
import { URL } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";
import { fileInput, fileInputCleare } from "../../functions/Common.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";


const DivImage = document.getElementById("images");
const SaveBtn=document.getElementById("saveBtn");

const RunAfterShows = () => {

    let btnremove = document.getElementsByClassName("btn-remove-image-galery");

    for (let i = 0; i < btnremove.length; i++) {


        btnremove[i].onclick = (e) => {

            Remove(e)
        };


    };
}


export const GaleryImageShow = () => {

    DivImage.innerHTML = ""
    Fetching("slider/get").then((data) => {

      
        let d = data.data.data;
        let str = "";
        d.forEach(e => {

            str += '<div class="col-md-2 m-1 text-center justify-content-center row ">';
            str += '<img class="rounded covers" src="' + URL + e.file_url + '/small/' + e.file_name + '">';
            str += '<button data-id="'+e.id+'" class="btn btn-s btn-danger btn-remove-image-galery b-radus mt-1"><i class="bi bi-trash-fill"></i></button>'
            str += ' </div>';
        });
        if (str !== "") {
            DivImage.innerHTML = str;
          
        }
        RunAfterShows();
    })
}

const Refresh = () => {
    GaleryImageShow();

}

export const Remove = (e) => {
    
    SwalRemoveFetch("slider/deleteimage", { idSearch: $("#idSearchImage").val(),img_id:e.currentTarget.dataset.id}, Refresh, 'Are you sure?', '', 'warning', 'Your file is safe!');
}

export const SetImageGalery = (btns,url) => {
    if (document.getElementById("file_img").files.length == 0) {
        toast('no files selected', "error");

        return false;
    }
    block();
    let formData = new FormData();
    formData.append('count', $('#file_img')[0].files.length);

    for (let i = 0; i < $('#file_img')[0].files.length; i++) {
        formData.append('img' + i, $('#file_img')[0].files[i]);
    }



    FetchingFile(url, formData).then((data) => {
        unblock();
        GaleryImageShow();
        if (data.status === "true") {
            toast("successful", "success");
            fileInputCleare("file_img");
       
        }
        else {
            toast(data.err, "error");
        }
    })
}


/////file input 
fileInput("fileinputs");
fileInput("fileinputsfile","Drag & drop File here &hellip;",null);
GaleryImageShow();

SaveBtn.onclick=()=>{
    SetImageGalery(SaveBtn,"slider/addnew");
}