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
                name: "",
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

    return Fetching("userBusinessAction/getUserUserWebSite",param).then((data) => {

        return data;
    });

}



export const GetLink = (param) => {
    return Fetching("userAction/getUserLink", param).then((data) => {
        return data;
    });

}




export const GetLanguage = (param) => {
    return Fetching("userBusinessAction/getUserLanguage", param).then((data) => {
        return data;
    });

}



export const GetSkill = (param) => {
    return Fetching("userBusinessAction/getUserSkill", param).then((data) => {
        return data;
    });

}

