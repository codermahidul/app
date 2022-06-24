import { RefreshTable } from "../../DataTable.js";
import { Fetching, FetchingFile } from "../../Fetch/Common.js";
import { URL } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";
import { fileInputCleare } from "../../functions/Common.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";

const ModalEditImage = $("#ModalEditImage");
const DivImage = document.getElementById("imagep");
let urls="";

export const imageShow = (id,url="coupon/getData") => {
    urls=url;
    let btns=$("#btndeleteimageevent");
    DivImage.innerHTML = ""
    Fetching(url, { idSearch: id }).then((data) => {
        ModalEditImage.modal("show");
        let d = data.data.data[0];
        $("#idSearchImage").val(d.id);
        if (d.file_url !== '' && d.file_url !== null && d.file_name !== '' && d.file_name !== null){
            DivImage.innerHTML = '<img class="rounded" src="' + URL + d.file_url + '/small/' + d.file_name + '">';
            btns.css("display","");
        }else
        {
            btns.css("display","none"); 
        }
            
    })
}

const Refresh = (id) => {
    imageShow(id,urls);
    RefreshTable();
}

export const RemoveImage = (url="coupon/deleteimage",for_user=false) => {
    let params={ idSearch: $("#idSearchImage").val() }
    if(for_user)
    {
        params['for_user']='1';
    }
    SwalRemoveFetch(url,params, Refresh, 'Are you sure?', '', 'warning', 'Your file is safe!', $("#idSearchImage").val());
}

export const SetImages = (btns,url="coupon/updateimage",for_user=false) => {
    if (document.getElementById("file_image_edit").files.length == 0) {
        toast('no files selected', "error");

        return false;
    }
    let modal = btns.dataset.id;
    block();
    let formData = new FormData();
    formData.append('img', $('#file_image_edit')[0].files[0]);
    formData.append('idSearch', $("#idSearchImage").val());
    if(for_user)
    {
     
        formData.append('for_user','1');

    }
    FetchingFile(url, formData).then((data) => {
        unblock();
        $("#" + modal).modal("hide");
        if (data.status === "true") {
            toast("successful", "success");
            fileInputCleare("file_image_edit");
            RefreshTable();
        }
        else {
            toast(data.err, "error");
        }
    })
}
