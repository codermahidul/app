import { Fetching, FetchingFile } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";

import { SendDataForm } from "../../functions/Common.js";
import { URL } from "../../Fetch/Setting.js";

const SaveBtn = document.getElementById("saveBtn");
const tax = document.getElementById("tax");
const percent_deals = document.getElementById("percent_deals");
const verify_price = document.getElementById("verify_price");


const Refresh = () => {
    window.location.reload();

}



SaveBtn.onclick = () => {
    block()
    SendDataForm(SaveBtn,
        "frmEdit", "setting/setSetting",
        [tax, percent_deals, verify_price],
        [],
        true,
        Refresh,
        false);
}