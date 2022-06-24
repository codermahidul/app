import { RefreshTable } from "../../DataTable.js";
import { Fetching, FetchingFile } from "../../Fetch/Common.js";
import { URL } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";
import { fileInputCleare } from "../../functions/Common.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";

const ModalEditImage = $("#ModalEditImage");
const DivImage = document.getElementById("imagep");
let urls="";

export const imageShow = (id,url,moreParam={},small=false) => {
    urls=url;
    let Btn=$("#btndeleteimageevent");
    DivImage.innerHTML = "";
    let parameter={ idSearch: id };
    parameter={...parameter,...moreParam};
    Fetching(url, parameter).then((data) => {
        ModalEditImage.modal("show");
        let d = data.data.data[0];
        $("#idSearchImage").val(d.id);
        if (d.file_url !== '' && d.file_url !== null && d.file_name !== '' && d.file_name !== null){
            if(small)
            {DivImage.innerHTML = '<img class="rounded" src="' + URL + d.file_url + '/small/' + d.file_name + '">';}
            else
            DivImage.innerHTML = '<img class="rounded" src="' + URL + d.file_url + '/' + d.file_name + '">';
            Btn.css("display","");
        }else
        {
            Btn.css("display","none"); 
        }
            
    })
}

const Refresh = (id) => {
    imageShow(id,urls);
    RefreshTable();
}

export const RemoveImage = (url,for_user=false,parameter={}) => {
    let params={ idSearch: $("#idSearchImage").val() }
    if(for_user)
    {
        params['for_user']='1';
    }
    params={...params,...parameter}
    SwalRemoveFetch(url,params, Refresh, 'Are you sure?', '', 'warning', 'Your file is safe!', $("#idSearchImage").val());
}

export const SetImages = (Btn,url,for_user=false,parameter=[],Reset=()=>{}) => {
    if (document.getElementById("file_image_edit").files.length == 0) {
        toast('no files selected', "error");

        return false;
    }
    let modal = Btn.dataset.id;
    block();
    let formData = new FormData();
    formData.append('img', $('#file_image_edit')[0].files[0]);
    formData.append('idSearch', $("#idSearchImage").val());
    if(for_user)
    {
     
        formData.append('for_user','1');

    }
    if (parameter.length > 0) {
        for (let i = 0; i < parameter.length; i++) {
            formData.append(parameter[i].name, parameter[i].value);
        }
      }
    FetchingFile(url, formData).then((data) => {
        unblock();
        $("#" + modal).modal("hide");
        if (data.status === "true") {
            toast("successful", "success");
            fileInputCleare("file_image_edit");
            RefreshTable();
            Reset();
        }
        else {
            toast(data.err, "error");
        }
    })
}
