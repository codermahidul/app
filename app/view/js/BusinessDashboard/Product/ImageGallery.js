import { RefreshTable } from "../../DataTable.js";
import { Fetching, FetchingFile } from "../../Fetch/Common.js";
import { URL } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";
import { fileInputCleare } from "../../functions/Common.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";

const ModalImage = $("#ModalImageGallery");
const DivImage = document.getElementById("images");


const RunAfterShows = () => {

    let btnremove = document.getElementsByClassName("btn-remove-image-gallery");

    for (let i = 0; i < btnremove.length; i++) {


        btnremove[i].onclick = (e) => {

            Remove(e)
        };


    };
}

let urls = "";
let removeurls = "";
let for_user=false;

export const GalleryImageShow = (id, url = "product/getGallery", removeurl = "product/deleteimagegallery",for_users=false) => {
    urls = url;

    for_user=for_users
    removeurls = removeurl
    $("#idSearchImage").val(id);
    let btns = $("#btndeleteimageevent");
    DivImage.innerHTML = ""
    Fetching(url, { idSearch: id }).then((data) => {

        ModalImage.modal("show");
        let d = data.data.data;
        let str = "";
        d.forEach(e => {

            str += '<div class="col-md-2 m-1 text-center justify-content-center row ">';
            str += '<img class="rounded covers" src="' + URL + e.file_url + '/small/' + e.file_name + '">';
            str += '<button data-id="' + e.id + '" class="btn btn-s btn-danger btn-remove-image-gallery b-radus mt-1"><i class="bi bi-trash-fill"></i></button>'
            str += ' </div>';
        });
        if (str !== "") {
            DivImage.innerHTML = str;
            btns.css("display", "");
        } else {
            btns.css("display", "none");
        }
        RunAfterShows();
    })
}

const Refresh = (id) => {
    GalleryImageShow(id, urls,removeurls);
    RefreshTable();
}

export const Remove = (e ) => {

    let params= { idSearch: $("#idSearchImage").val(), img_id: e.currentTarget.dataset.id };

    if(for_user)
    {
        params['for_user']='1';
    }

    SwalRemoveFetch(removeurls,params, Refresh, 'Are you sure?', '', 'warning', 'Your file is safe!', $("#idSearchImage").val());
}

export const SetImageGallery = (btns, url = "product/updateimagegallery",callBack=()=>{}) => {
    if (document.getElementById("file_image_gallery").files.length == 0) {
        toast('no files selected', "error");

        return false;
    }
    let modal = btns.dataset.id;
    block();
    let formData = new FormData();
    formData.append('count', $('#file_image_gallery')[0].files.length);
    if(for_user)
    {
        formData.append('for_user','1');
    }
    for (let i = 0; i < $('#file_image_gallery')[0].files.length; i++) {
        formData.append('img' + i, $('#file_image_gallery')[0].files[i]);
    }


    formData.append('idSearch', $("#idSearchImage").val());
    FetchingFile(url, formData).then((data) => {
        unblock();
        GalleryImageShow($("#idSearchImage").val(), urls,removeurls);
        if (data.status === "true") {
            
            callBack();
            toast("successful", "success");
            fileInputCleare("file_image_gallery");
            RefreshTable();
         
        }
        else {
            toast(data.err, "error");
        }
    })
}
