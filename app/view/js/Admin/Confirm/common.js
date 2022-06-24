import { SwalRemoveFetch } from "../../functions/SwalDelete.js";

export const RejectData = (url, param, callback = () => { }, title = "Are you sure  to reject?", canseltitel = "I am not sure") => {
    SwalRemoveFetch(url
        , param
        , callback
        , title
        , ""
        , "info"
        , canseltitel
        , ""
        , false
    );
}

export const ConfirmData = (url, param, callback = () => { }, title = "Are you sure of the confirmation?", canseltitel = "I am not sure") => {
    SwalRemoveFetch(url
        , param
        , callback
        , title
        , ""
        , "info"
        , canseltitel
        , ""
        , false
    );
}