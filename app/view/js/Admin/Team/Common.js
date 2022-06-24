import { Fetching } from "../../Fetch/Common.js";
import { URL } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";


const AddMoreLinkE = document.getElementById("add_more_links_e");
const AddMoreLink = document.getElementById("add_more_links");


let index = 2;

if(AddMoreLink !==null)
{
    AddMoreLink.onclick = () => {
        let id = AddMoreLink.dataset.id;
        let div = $("#" + id);
        let str = LinkHtml("");
        div.append(str);
        index++;
    }
}


if(AddMoreLinkE !==null)
{
    AddMoreLinkE.onclick = () => {
        let id = AddMoreLinkE.dataset.id;
        let div = $("#" + id);
        let str = LinkHtml("_e");
        div.append(str);
        index++;
    }
}


const LinkHtml = (edit) => {
    let str = '';
    str += ' <div class="col-md-4">';
    str += ' <label for="recipient-name" class="col-form-label">Link type:</label>';
    str += '  <select id="ltype' + edit + index + '" class="input-white min-radus select-css link-type">';
    str += '  <option value=""></option>';
    str += '   <option value="web">webSite </option>';
    str += '   <option value="socialMedia">Social Media</option>';

    str += '  </select>';
    str += ' </div>';

    str += ' <div class="col-md-4">';
    str += ' <label for="recipient-name" class="col-form-label">Link Title:</label>';
    str += '  <input id="ltitle' + edit + index + '" type="text" autocomplete="off" class="input-white min-radus link-title">';
    str += ' </div>';
    str += ' <div class="col-md-4">';
    str += ' <label for="recipient-name" class="col-form-label">Link Address:</label>';
    str += ' <input id="ltag' + edit + index + '" type="text" autocomplete="off" class="input-white min-radus link-tag">';
    str += ' </div>';
    return str;
}

export const show_more_link = (str) => {
    
    if (str === null || str === '') {
        $("#ltitle_e1").val("")
        $("#ltag_e1").val("")
        $("#ltype_e1").val("")
        return false;
    }
    let data = str.split(",");
    if(data.length>0)
    {
        index=1;
        $("#more_link_e").html("");
    }
    for (let i = 0; i < data.length; i++) {
        let d = data[i].split("::");
        
        AddMoreLinkE.click();

        $("#ltitle_e" + (i + 1)).val(d[1])
        $("#ltag_e" + (i + 1)).val(d[2])
        $("#ltype_e" + (i + 1)).val(d[3])

    }
}

export const ShowEdit=(id)=>{
    Fetching("team/getTeamAdmin", { idSearch: id }).then((data) => {
        $("#ModalEdit").modal("show");
        let d = data.data.data[0]
        $("#fname_e").val(d.fname);
        $("#idSearch").val(d.id);
        $("#lname_e").val(d.lname);
        $("#password_e").val(d.password);
        $("#email_e").val(d.email);
        $("#timezone_e").val(d.timezone);
        $("#timezone_e").trigger("change");
        $("#public_e").val(d.is_public);
        $("#about_e").val(d.about);
        if (d.trash === "1")
            $("#trash2").prop('checked', true);
        else
            $("#trash").prop('checked', true);
    
        show_more_link(d.team_tag);
        $("#display_name").val(d.display_name);
    })
}

export const ShowEditProfile=(id)=>{
    Fetching("team/getOnlineTeamData", {}).then((data) => {
        $("#ModalEdit").modal("show");
        let d = data.data[0]
        $("#fname_e").val(d.fname);
        $("#idSearch").val(d.id);
        $("#lname_e").val(d.lname);
        $("#password_e").val(d.password);
        $("#email_e").val(d.email);
        $("#public_e").val(d.is_public);
        $("#timezone_e").val(d.timezone);
        $("#timezone_e").trigger("change");
        $("#about_e").val(d.about);
        if (d.trash === "1")
            $("#trash2").prop('checked', true);
        else
            $("#trash").prop('checked', true);
    
        show_more_link(d.team_tag);
        $("#display_name").val(d.display_name);

    })
}

export const GetLinkValue = (edit = false) => {
    let vals = "";

    for (let i = 1; i < index; i++) {
        let t = "ltitle";
        let ta = "ltag";
        let typ = "ltype";
        if (edit) {
            t = "ltitle_e";
            ta = "ltag_e";
            typ = "ltype_e";
        }

        let title = $("#" + t + i).val();
        let tags = $("#" + ta + i).val();
        let types = $("#" + typ + i).val();
        if (i < (index - 1)) {
            vals += title + "::" + tags + "::" + types + ','
        } else
            vals += title + "::" + tags + "::" + types

    }

    return vals;
}

export const ShowInfoProfile=()=>{
    block()
    Fetching("team/getOnlineTeamData", {}).then((data) => {
        unblock()
        let d = data.data[0]
        $("#team_name").html(d.fname+" "+d.lname);
        $("#team_email").html(d.email);
        $("#team_about").html(d.about);
        $("#team_display_name").html(d.display_name);
        $("#idSearch").val(d.id);
        
        showLink(d.team_tag);
        ShowGallery();
    })
}

export const showLink=(data)=>{
    let div=document.getElementById("team_links");
    div.innerHTML="";
    if(data!==null && data!=="")
    {
        let links=data.split(",");
        let str="";
        links.forEach(d => {
            
            let dd=d.split("::");
            str+='<div class="covers p-2 mb-3">';
            str+='<div class="mb-2"> <small  class="btn-radus btn-blue-dark  modalbtn">'+dd[3]+'</small></div>';
            str+='<div class="h5 "><a href="'+dd[2]+'" class="hrefs" target="blank">'+dd[1]+'</a></div>';
            str+='</div>';
        });
        div.innerHTML=str;
    }
    
    
     
}

export const ShowGallery=()=>{
     let div=document.getElementById("team_gallery");
     div.innerHTML="";
    Fetching("team/getGallery",{idSearch:$("#idSearch").val()}).then((data)=>{
        
        if(data.status=="true")
        {
            let str="";
            data.data.data.forEach(d => {
                str+='<img class="img-radus" src="'+URL+d.file_url+'/middle/'+d.file_name+'">';
            });

            div.innerHTML=str;
        }
    })
}