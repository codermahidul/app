import { CreateSelectOption } from "../../Fetch/Common.js";
import ShowModals from "../../functions/ShowModal.js";

export const editInfo = (event) => {
 
    ShowModals(event,
        [CreateSelectOption, CreateSelectOption],
        [
            {
                url: "fetchData/country_get",
                params: { order: "sort_name", order_type: "asc", number: "300" }
            },
            {
                url: "fetchData/proof_get",
                params: { order: "title", type: "industry", order_type: "asc", number: "300" }
            }
        ]
        , [
            {
                id: "country_id",
                value: 'id',
                title: "name"
            }
            , {
                id: "industry",
                value: 'id',
                title: "title"
            }
        ]
    );
}

export const patent = (event) => {
    ShowModals(event,
        [CreateSelectOption],
        [
            {
                url: "fetchData/country_get",
                params: { order: "sort_name", order_type: "asc", number: "300" }
            }
        ]
        , [
            {
                id: "patent_country_id",
                value: 'id',
                title: "name"
            }

        ]
    );
}


export const LoadSelectOptionCountry = (id) => {
    
    let param = {
        url: "fetchData/country_get",
        params: { order: "sort_name", order_type: "asc", number: "300" }
    }
    let ids = {
        id,
        value: 'id',
        title: "name"
    }
    CreateSelectOption(param, ids)
}

export const course = (event) => {
    ShowModals(event,
        [CreateSelectOption],
        [
            {
                url: "userBusinessAction/getUserExperience",
                params: { number: "300" }
            }
        ]
        , [
            {
                id: "course_experience_id",
                value: 'id',
                title: "title"
            }

        ]
    );
}

export const project = (event) => {
    ShowModals(event,
        [CreateSelectOption],
        [
            {
                url: "userBusinessAction/getUserExperience",
                params: { number: "300" }
            }
        ]
        , [
            {
                id: "project_experience_id",
                value: 'id',
                title: "title"
            }

        ]
    );
}

export const honors = (event) => {
    ShowModals(event,
        [CreateSelectOption],
        [
            {
                url: "userBusinessAction/getUserExperience",
                params: { number: "300" }
            }
        ]
        , [
            {
                id: "honors_experience_id",
                value: 'id',
                title: "title"
            }

        ]
    );
}
export const score = (event) => {
    ShowModals(event,
        [CreateSelectOption],
        [
            {
                url: "userBusinessAction/getUserExperience",
                params: { number: "300" }
            }
        ]
        , [
            {
                id: "score_experience_id",
                value: 'id',
                title: "title"
            }

        ]
    );
}

export const organizations = (event) => {
    ShowModals(event,
        [CreateSelectOption],
        [
            {
                url: "userBusinessAction/getUserExperience",
                params: { number: "300" }
            }
        ]
        , [
            {
                id: "organization_experience_id",
                value: 'id',
                title: "title"
            }

        ]
    );
}

export const LoadSelectOptionMyExperience = (id) => {
    let param = {
        url: "userBusinessAction/getUserExperience",
        params: {number: "300" }
    }
    let ids = {
        id,
        value: 'id',
        title: "title"
    }
    CreateSelectOption(param, ids)
}