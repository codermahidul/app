import { block, unblock } from "../../functions/Block.js";

import { Fetching } from "../../Fetch/Common.js";

export const SetCatSearch = (fn) => {
    let path = window.location.pathname;
    let paths = path.split("/");
    let slug = paths[(paths.length) - 1]
    if (slug !== 'Products' || slug !== 'Coupons' || slug !== 'Deal') {

        block();
        Fetching("category/get", { "name_slug": slug }).then((data) => {
            unblock();
            if (data.status === 'true') {

                if (data.data.data.length > 0) {
                    let category = data.data.data[0];

                    fn(category)
                 
                }

            }

        })
    }
}