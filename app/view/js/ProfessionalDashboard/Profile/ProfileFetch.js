import { GetProfessionalUserOnlineInfo, Fetching } from '../../Fetch/Common.js';

export const GetInfoUserOnline = () => {
    
    GetProfessionalUserOnlineInfo().then((data) => {
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
                name: "",
                headline: "",
                id: "",
                industry: "",
                password: "",
                telephone: " "

            }

    });
}

export const GetWebSiteUser = (param) => {

    return Fetching("userBusinessAction/getUserUserWebSite",param).then((data) => {

        return data;
    });

}

export const GetEducation = (param) => {
    return Fetching("userBusinessAction/getUserUserEducation", param).then((data) => {
        return data;
    });

}

export const GetExperienceser = (param) => {

    return Fetching("userBusinessAction/getUserExperience", param).then((data) => {

        return data;
    });

}
export const GetVExperienceser = (param) => {

    return Fetching("userBusinessAction/getUserVExperience", param).then((data) => {

        return data;
    });

}

export const GetLicense = (param) => {

    return Fetching("userBusinessAction/getUserLicense", param).then((data) => {

        return data;
    });

}

export const GetPublication = (param) => {

    return Fetching("userBusinessAction/getUserPublication", param).then((data) => {

        return data;
    });

}

export const GetPatent = (param) => {

    return Fetching("userBusinessAction/getUserPatent", param).then((data) => {

        return data;
    });

}

export const GetCourse = (param) => {
    return Fetching("userBusinessAction/getUserCourse", param).then((data) => {
        return data;
    });
}


export const GetProject = (param) => {
    return Fetching("userBusinessAction/getUserProject", param).then((data) => {
        return data;
    });

}

export const GetHonors = (param) => {

    return Fetching("userBusinessAction/getUserHonors", param).then((data) => {

        return data;
    });

}

export const GetScore = (param) => {
    return Fetching("userBusinessAction/getUserScore", param).then((data) => {
        return data;
    });

}

export const GetLanguage = (param) => {
    return Fetching("userBusinessAction/getUserLanguage", param).then((data) => {
        return data;
    });

}

export const GetOrganization = (param) => {
    return Fetching("userBusinessAction/getUserOrganization", param).then((data) => {
        return data;
    });

}

export const GetSkill = (param) => {
    return Fetching("userBusinessAction/getUserSkill", param).then((data) => {
        return data;
    });

}

export const GetInterest = (param) => {
    return Fetching("userBusinessAction/getUserInterest", param).then((data) => {
        return data;
    });

}