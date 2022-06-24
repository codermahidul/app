import { GetUserOnlineInfo, Fetching } from '../../../Fetch/Common.js';

export const GetInfoUserOnline = () => {
    GetUserOnlineInfo().then((data) => {
        if (data.status === "true") {
            return data.data[0];
        } else
            return {
                about: "",
                active: "",
                birthday: "",
                country_id: "",
                created_at: "",
                email: "",
                fname: "",
                headline: "",
                id: "",
                industry: "",
                lname: "",
                password: "",
                telephone: " "

            }

    });
}

export const GetWebSiteUser = (param) => {

    return Fetching("useraction/getUseruserWebSite",param).then((data) => {

        return data;
    });

}

export const GetEducation = (param) => {
    return Fetching("useraction/getUseruserEducation", param).then((data) => {
        return data;
    });

}

export const GetExperienceser = (param) => {

    return Fetching("useraction/getUserExperience", param).then((data) => {

        return data;
    });

}
export const GetVExperienceser = (param) => {

    return Fetching("useraction/getUserVExperience", param).then((data) => {

        return data;
    });

}

export const GetLicense = (param) => {

    return Fetching("useraction/getUserLicense", param).then((data) => {

        return data;
    });

}

export const GetPublication = (param) => {

    return Fetching("useraction/getUserPublication", param).then((data) => {

        return data;
    });

}

export const GetPatent = (param) => {

    return Fetching("useraction/getUserPatent", param).then((data) => {

        return data;
    });

}

export const GetCourse = (param) => {
    return Fetching("useraction/getUserCourse", param).then((data) => {
        return data;
    });
}


export const GetProject = (param) => {
    return Fetching("useraction/getUserProject", param).then((data) => {
        return data;
    });

}

export const GetHonors = (param) => {

    return Fetching("useraction/getUserHonors", param).then((data) => {

        return data;
    });

}

export const GetScore = (param) => {
    return Fetching("useraction/getUserScore", param).then((data) => {
        return data;
    });

}

export const GetLanguage = (param) => {
    return Fetching("useraction/getUserLanguage", param).then((data) => {
        return data;
    });

}

export const GetOrganization = (param) => {
    return Fetching("useraction/getUserOrganization", param).then((data) => {
        return data;
    });

}

export const GetSkill = (param) => {
    return Fetching("useraction/getUserSkill", param).then((data) => {
        return data;
    });

}

export const GetInterest = (param) => {
    return Fetching("useraction/getUserInterest", param).then((data) => {
        return data;
    });

}