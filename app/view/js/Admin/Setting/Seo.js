import { Fetching, FetchingFile } from "../../Fetch/Common.js";
import { URL } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";
import { SendDataForm } from "../../functions/Common.js";


const SaveBtn = document.getElementById("saveBtn");



const Refresh = () => {
    window.location.reload();

}



SaveBtn.onclick = () => {
    block()
    SendDataForm(SaveBtn,
        "frmEdit", "setting/UpdateSeo",
        [],
        [],
        false,
        Refresh,
        false);
}