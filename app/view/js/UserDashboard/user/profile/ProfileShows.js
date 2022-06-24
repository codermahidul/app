import { URLPATH } from '../../../Fetch/Setting.js';
import { nlbrs } from '../../../functions/Common.js';

const checkNull = (str) => {
    if (str === null)
        return '';
    return str;
}
const createTag = (url) => {
    if (url !== "") {
        return "<a target='_blank' href='" + url + "'>" + url + "</a>";
    }
    return '';
}


const createButtonEdit = (id, form, modal, get, btn) => {
    let str = "";
    str += "<button  class='btn btn-sm btn-success btn-edit m-1 b-radus' data-id='" + id + "'"
        + "data-form='" + form + "' data-modal='" + modal + "' data-get='" + get + "' data-btn='" + btn + "'>"
        + "<i class='bi bi-pencil-square'></i></button>";
    return str;

}

const createButtonRemove = (id, url, modal) => {
    let str = "";
    str += "<button class='btn btn-sm btn-danger btn-remove m-1 b-radus' data-id='" + id + "'"
        + "data-url='" + url + "' data-modal='" + modal + "'><i class='bi bi-trash'></i></i></button>";
    return str;

}

const checkDisabled = (data) => {

    let str = '';
    if (data.trash === "1") {
        str = '<div class="text-danger m-1">Disabled</div>';
    }
    return str;
}

export const ShowUserInfo = (data) => {

    $("#user_name").html(data.name );
    $("#user_headline").html(data.headline);
    $("#user_birthday").html(data.birthday);
    $("#user_country_name").html(data.country_name);
    $("#user_telephone").html(data.telephone);
    //$("#user_display_name").html(data.display_name);
    $("#user_display_name").html('<a class="text-dark" href="'+URLPATH+data.display_name_slug+'">'+data.display_name+'</a>');

    $("#user_email").html(data.email);
    $("#user_industry_name").html(data.industry_name);
    $("#user_about").html("<div class='covers p-3'>" + nlbrs(data.about) + "</div>");

}

export const ShowWebSite = (data) => {
    let div = $("#user_web");
    div.html("");
    let str = "";
    data.forEach(element => {
        str += "<div class='covers strings  mb-2'>";
        str += "<div> <a class='hrefs' href='" + element.website_url + "'>" + element.website_title + "</a></div>";
        str += "<div> <small>" + element.website_type + "</small></div>";
        str += createButtonEdit(element.id, "frmWebSite", "modalWebsite", "GetWebSiteUser", "addwebBtn");
        str += createButtonRemove(element.id, "removeUserWebSite", "modalRemove");
        str += checkDisabled(element);
        str += "</div>";
    });
    div.html(str);

}


export const ShowLanguage = (data) => {
    let div = $("#user_language");
    div.html("");
    let str = "";
    data.forEach(element => {
        str += "<div class='covers strings  mb-2'>";
        str += "<div class='mb-1'><span> Language : </span><span class='text-dark bolds'>" + element.language + "</span></div>";
        str += "<div class='mb-1'><span> Proficiency: </span><span class='text-dark bolds'>" + element.proficiency + "</span></div>";
        str += createButtonEdit(element.id, "frmlang", "modalLanguage", "GetLanguage", "btnlang");
        str += createButtonRemove(element.id, "removeUserLanguage", "modalRemove");
        str += checkDisabled(element);
        str += "</div>";
    });
    div.html(str);
}

export const ShowLink = (data) => {
    let div = $("#user_links");
    div.html("");
    let str = "";
    data.forEach(d => {
        str += "<div class='covers strings  mb-2'>";
        str += "<div class='mb-1'>";
        str += "<a target='blank' href='" + d.tag + "' class='text-dark bolds'>" + d.title + "</a>";
        str +=' <span class="removeLinks" data-id="'+d.id+'"><i class="bi bi-trash text-danger  point"></i></span>';
        str += "</div>";

        str += "</div>";
    });
    div.html(str);
}



export const ShowSkill = (data) => {
    let div = $("#user_skill");
    div.html("");
    let str = "";
    data.forEach(element => {
        let desc = "";
        if (element.proof_id !== null) {
            desc = element.proof_title;
        } else {
            desc = element.skill_name;
        }
        str += '<button class="btn btn-green btn-radus m-1 p-2">' +
            '<i data-id="' + element.id + '"  class="bi bi-x-lg m-1 remove-skill"></i>' + desc + "</button>"

    });
    div.html(str);
}

export const ShowSkillWithoutBtn = (id, data) => {
    let div = $("#" + id);
    div.html("");
    let str = "";
    data.forEach(element => {
        let desc = "";
        if (element.proof_id !== null) {
            desc = element.proof_title;
        } else {
            desc = element.skill_name;
        }
        str += '<button class="btn btn-green btn-radus m-1 p-2">' + desc + "</button>"

    });
    div.html(str);
}