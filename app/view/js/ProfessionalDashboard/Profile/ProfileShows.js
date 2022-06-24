import {  URLPATH } from '../../Fetch/Setting.js';
import { nlbrs } from '../../functions/Common.js';

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

    let str='';
    if(data.trash==="1")
    {
        str='<div class="text-danger m-1">Disabled</div>';
    }
    return str;
}

export const ShowUserInfo = (data) => {
 
    $("#user_name").html(data.name );
    $("#user_headline").html(data.headline);
    $("#user_birthday").html(data.birthday);
    $("#user_country_name").html(data.country_name);
    $("#user_telephone").html(data.telephone);
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

export const ShowEducation = (data) => {
    let div = $("#user_education");
    div.html("");
    let str = "";
    data.forEach(element => {
        str += "<div class='covers strings  mb-2'>";
        str += "<div class='mb-1'><span> School : </span><span class='text-dark bolds'>" + element.school + "</span></div>";
        str += "<div class='mb-1'><span> Degree : </span><span class='text-dark bolds'>" + element.degree + "</span></div>";
        str += "<div class='mb-1'><span> Field Study : </span><span class='text-dark bolds'>" + element.field_study + "</span></div>";
        str += "<div class='mb-1'><span> Start Date : </span><span class='text-dark bolds'>" + element.education_start_date + "</span></div>";
        str += "<div class='mb-1'><span> End Date : </span><span class='text-dark bolds'>" + element.education_end_date + "</span></div>";
        str += "<div class='mb-1'><span> Activities and societies : </span><span class='text-dark bolds'>" + element.activitys + "</span></div>";
        str += "<div class='mb-1'><span> Description  : </span><span class='text-dark bolds'>" + element.description_education + "</span></div>";
        str += createButtonEdit(element.id, "frmEducation", "modalEducation", "GetEducation", "educatinBtn");
        str += createButtonRemove(element.id, "removeUserEducation", "modalRemove");
        str += checkDisabled(element);
        str += "</div>";
    });
    div.html(str);
}

export const ShowExperience = (data) => {
    let div = $("#user_experience");
    div.html("");
    let str = "";
    data.forEach(element => {
        let nowing = element.experience_now === "1" ? " Yes" : " No";
        str += "<div class='covers strings  mb-2'>";
        str += "<div class='mb-1'><span> Title : </span><span class='text-dark bolds'>" + element.title + "</span></div>";
        str += "<div class='mb-1'><span> Type : </span><span class='text-dark bolds'>" + element.employment_type + "</span></div>";
        str += "<div class='mb-1'><span> Company : </span><span class='text-dark bolds'>" + checkNull(element.company) + "</div>";
        str += "<div class='mb-1'><span> Location : </span><span class='text-dark bolds'>" + checkNull(element.location) + "</span></div>";
        str += "<div class='mb-1'><span> Start Date : </span><span class='text-dark bolds'>" + checkNull(element.experience_start_date) + "</span></div>";
        str += "<div class='mb-1'><span> End Date : </span><span class='text-dark bolds'>" + checkNull(element.experience_end_date) + "</span></div>";
        str += "<div class='mb-1'><span> Still going on : </span><span class='text-dark bolds'>" + nowing + "</span></div>";
        str += createButtonEdit(element.id, "frmexperience", "modalExperience", "GetExperienceser", "experincebtn");
        str += createButtonRemove(element.id, "removeUserExperience", "modalRemove");
        str += checkDisabled(element);
        str += "</div>";
    });
    div.html(str);
}


export const ShowVExperience = (data) => {
    let div = $("#user_vexperience");
    div.html("");
    let str = "";
    data.forEach(element => {
        let nowing = element.user_volunteer_experience_now === "1" ? " Yes" : " No";
        str += "<div class='covers strings  mb-2'>";
        str += "<div class='mb-1'><span> Organization : </span><span class='text-dark bolds'>" + element.organization + "</span></div>";
        str += "<div class='mb-1'><span> Role : </span><span class='text-dark bolds'>" + checkNull(element.role) + "</span></div>";
        str += "<div class='mb-1'><span> Cause : </span><span class='text-dark bolds'>" + checkNull(element.cause) + "</div>";
        str += "<div class='mb-1'><span> Start Date : </span><span class='text-dark bolds'>" + checkNull(element.user_volunteer_experience_start_date) + "</span></div>";
        str += "<div class='mb-1'><span> End Date : </span><span class='text-dark bolds'>" + checkNull(element.user_volunteer_experience_end_date) + "</span></div>";
        str += "<div class='mb-1'><span> Still going on : </span><span class='text-dark bolds'>" + nowing + "</span></div>";
        str += "<div class='mb-1'><span> Description  : </span><span class='text-dark bolds'>" + element.user_volunteer_experience_description + "</span></div>";
        str += createButtonEdit(element.id, "frmve", "modalVolunteerExperience", "GetVExperienceser", "btnve");
        str += createButtonRemove(element.id, "removeUserVExperience", "modalRemove");
        str += checkDisabled(element);
        str += "</div>";
    });
    div.html(str);
}

export const ShowLicense = (data) => {
    let div = $("#user_license");
    div.html("");
    let str = "";
    data.forEach(element => {
        let nowing = element.license_now === "1" ? " Yes" : " No";
        str += "<div class='covers strings  mb-2'>";
        str += "<div class='mb-1'><span> Name : </span><span class='text-dark bolds'>" + element.license_name + "</span></div>";
        str += "<div class='mb-1'><span> Issuin : </span><span class='text-dark bolds'>" + checkNull(element.issuin) + "</span></div>";
        str += "<div class='mb-1'><span> Credential ID : </span><span class='text-dark bolds'>" + checkNull(element.credential_id) + "</div>";
        str += "<div class='mb-1'><span> Credential URL : </span><span class='text-dark bolds'>" + checkNull(element.credential_url) + "</div>";
        str += "<div class='mb-1'><span> Issue Date : </span><span class='text-dark bolds'>" + checkNull(element.issuin_start_date) + "</span></div>";
        str += "<div class='mb-1'><span> Expiration  Date : </span><span class='text-dark bolds'>" + checkNull(element.issuin_end_date) + "</span></div>";
        str += "<div class='mb-1'><span> Expire: </span><span class='text-dark bolds'>" + nowing + "</span></div>";
        str += createButtonEdit(element.id, "frmlic", "modalLicense", "GetLicense", "licensebtn");
        str += createButtonRemove(element.id, "removeUserLicense", "modalRemove");
        str += checkDisabled(element);
        str += "</div>";
    });
    div.html(str);
}

export const ShowPublication = (data) => {
    let div = $("#user_publication");
    div.html("");
    let str = "";
    data.forEach(element => {
        str += "<div class='covers strings  mb-2'>";
        str += "<div class='mb-1'><span> Title : </span><span class='text-dark bolds'>" + element.title_publication + "</span></div>";
        str += "<div class='mb-1'><span> Publication/Publisher : </span><span class='text-dark bolds'>" + checkNull(element.publisher) + "</span></div>";
        str += "<div class='mb-1'><span> Publication date : </span><span class='text-dark bolds'>" + checkNull(element.publication_date) + "</div>";
        str += "<div class='mb-1'><span> Author : </span><span class='text-dark bolds'>" + checkNull(element.author) + "</div>";
        str += "<div class='mb-1'><span> Publication URL : </span><span class='text-dark bolds'>" + createTag(checkNull(element.publication_url)) + "</span></div>";
        str += "<div class='mb-1'><span> Description : </span><span class='text-dark bolds'>" + checkNull(element.publication_description) + "</span></div>";
        str += createButtonEdit(element.id, "frmpub", "modalPublication", "GetPublication", "frmpubbtn");
        str += createButtonRemove(element.id, "removeUserPublication", "modalRemove");
        str += checkDisabled(element);
        str += "</div>";
    });
    div.html(str);
}

export const ShowPatent = (data) => {
    let div = $("#user_patent");
    div.html("");
    let str = "";
    data.forEach(element => {
        str += "<div class='covers strings  mb-2'>";
        str += "<div class='mb-1'><span> Title : </span><span class='text-dark bolds'>" + element.title_patent + "</span></div>";
        str += "<div class='mb-1'><span> Office Country : </span><span class='text-dark bolds'>" + checkNull(element.country_name) + "</span></div>";
        str += "<div class='mb-1'><span> Patent or application number : </span><span class='text-dark bolds'>" + checkNull(element.number) + "</span></div>";
        str += "<div class='mb-1'><span> Status : </span><span class='text-dark bolds'>" + checkNull(element.status) + "</span></div>";
        str += "<div class='mb-1'><span> Issue date : </span><span class='text-dark bolds'>" + checkNull(element.issue_date) + "</div>";
        str += "<div class='mb-1'><span> Publication URL : </span><span class='text-dark bolds'>" + createTag(checkNull(element.patent_url)) + "</span></div>";
        str += "<div class='mb-1'><span> Description : </span><span class='text-dark bolds'>" + checkNull(element.patent_description) + "</span></div>";
        str += createButtonEdit(element.id, "frnpatent", "modalPatent", "GetPatent", "patentbtn");
        str += createButtonRemove(element.id, "removeUserPatent", "modalRemove");
        str += checkDisabled(element);
        str += "</div>";
    });
    div.html(str);
}

export const ShowCourse = (data) => {
    let div = $("#user_course");
    div.html("");
    let str = "";
    data.forEach(element => {
        str += "<div class='covers strings  mb-2'>";
        str += "<div class='mb-1'><span> Name : </span><span class='text-dark bolds'>" + element.course_name + "</span></div>";
        str += "<div class='mb-1'><span> Number : </span><span class='text-dark bolds'>" + checkNull(element.course_number) + "</span></div>";
        str += "<div class='mb-1'><span> Associated with : </span><span class='text-dark bolds'>" + checkNull(element.experience_title) + "</span></div>";
        str += createButtonEdit(element.id, "frmcourse", "modalCourse", "GetCourse", "btnCourse");
        str += createButtonRemove(element.id, "removeUserCourse", "modalRemove");
        str += checkDisabled(element);
        str += "</div>";
    });
    div.html(str);
}

export const ShowProject = (data) => {
    let div = $("#user_project");
    div.html("");
    let str = "";
    data.forEach(element => {
        let nowing = element.project_now === "1" ? " Yes" : " No";
        str += "<div class='covers strings  mb-2'>";
        str += "<div class='mb-1'><span> Name : </span><span class='text-dark bolds'>" + element.project_name + "</span></div>";
        str += "<div class='mb-1'><span> Associated with : </span><span class='text-dark bolds'>" + element.experience_title + "</span></div>";
        str += "<div class='mb-1'><span> Creator  : </span><span class='text-dark bolds'>" + checkNull(element.creator) + "</div>";
        str += "<div class='mb-1'><span> Start Date : </span><span class='text-dark bolds'>" + checkNull(element.project_start_date) + "</span></div>";
        str += "<div class='mb-1'><span> End Date : </span><span class='text-dark bolds'>" + checkNull(element.project_end_date) + "</span></div>";
        str += "<div class='mb-1'><span> Still going on : </span><span class='text-dark bolds'>" + nowing + "</span></div>";
        str += "<div class='mb-1'><span> Project URL : </span><span class='text-dark bolds'>" + createTag(checkNull(element.project_url)) + "</span></div>";
        str += "<div class='mb-1'><span> Project Description: </span><span class='text-dark bolds'>" + checkNull(element.project_description) + "</span></div>";
        str += createButtonEdit(element.id, "frmProject", "modalProject", "GetProject", "projectbtn");
        str += createButtonRemove(element.id, "removeUserProject", "modalRemove");
        str += checkDisabled(element);
        str += "</div>";
    });
    div.html(str);
}

export const ShowHonors = (data) => {
    let div = $("#user_honors");
    div.html("");
    let str = "";
    data.forEach(element => {
        str += "<div class='covers strings  mb-2'>";
        str += "<div class='mb-1'><span> Title : </span><span class='text-dark bolds'>" + element.honors_title + "</span></div>";
        str += "<div class='mb-1'><span> Associated with : </span><span class='text-dark bolds'>" + element.experience_title + "</span></div>";
        str += "<div class='mb-1'><span> Issuer  : </span><span class='text-dark bolds'>" + checkNull(element.honors_issuer) + "</div>";
        str += "<div class='mb-1'><span> Issuer Date : </span><span class='text-dark bolds'>" + checkNull(element.honors_issuer_date) + "</span></div>";
        str += "<div class='mb-1'><span>  Description: </span><span class='text-dark bolds'>" + checkNull(element.honors_description) + "</span></div>";
        str += createButtonEdit(element.id, "frmhonors", "modalHonors", "GetHonors", "btnhonors");
        str += createButtonRemove(element.id, "removeUserHonors", "modalRemove");
        str += checkDisabled(element);
        str += "</div>";
    });
    div.html(str);
}

export const ShowScore = (data) => {
    let div = $("#user_score");
    div.html("");
    let str = "";
    data.forEach(element => {
        str += "<div class='covers strings  mb-2'>";
        str += "<div class='mb-1'><span> Score : </span><span class='text-dark bolds'>" + element.score + "</span></div>";
        str += "<div class='mb-1'><span> Associated with : </span><span class='text-dark bolds'>" + element.experience_title + "</span></div>";
        str += "<div class='mb-1'><span> Test Date : </span><span class='text-dark bolds'>" + checkNull(element.score_date) + "</span></div>";
        str += "<div class='mb-1'><span>  Description: </span><span class='text-dark bolds'>" + checkNull(element.score_description) + "</span></div>";
        str += createButtonEdit(element.id, "frmScore", "modalScore", "GetScore", "scorebtn");
        str += createButtonRemove(element.id, "removeUserScore", "modalRemove");
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

export const ShowOrganization = (data) => {
    let div = $("#user_organization");
    div.html("");
    let str = "";
    data.forEach(element => {
        let nowing = element.organization_now === "1" ? " Yes" : " No";
        str += "<div class='covers strings  mb-2'>";
        str += "<div class='mb-1'><span> Name : </span><span class='text-dark bolds'>" + element.organization_name + "</span></div>";
        str += "<div class='mb-1'><span> Associated with : </span><span class='text-dark bolds'>" + element.experience_title + "</span></div>";
        str += "<div class='mb-1'><span> Position held  : </span><span class='text-dark bolds'>" + checkNull(element.position) + "</div>";
        str += "<div class='mb-1'><span> Start Date : </span><span class='text-dark bolds'>" + checkNull(element.organization_start_date) + "</span></div>";
        str += "<div class='mb-1'><span> End Date : </span><span class='text-dark bolds'>" + checkNull(element.organization_end_date) + "</span></div>";
        str += "<div class='mb-1'><span> Membership ongoing : </span><span class='text-dark bolds'>" + nowing + "</span></div>";
        str += "<div class='mb-1'><span> Project Description: </span><span class='text-dark bolds'>" + checkNull(element.organization_description) + "</span></div>";
        str += createButtonEdit(element.id, "frmorg", "modalOrganization", 'GetOrganization', "btnorg");
        str += createButtonRemove(element.id, "removeUserOrganization", "modalRemove");
        str += checkDisabled(element);
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

export const ShowSkillWithoutBtn = (id,data) => {
    let div = $("#"+id);
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