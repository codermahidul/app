import { Fetching, FetchingFile } from "../../Fetch/Common.js";
import { URL } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";
import { SendDataForm } from "../../functions/Common.js";


const SaveBtn = document.getElementById("saveBtn");
const comment_bought = document.getElementById("comment_bought");
const comment = document.getElementById("comment");
const rate_bought = document.getElementById("rate_bought");
const rate = document.getElementById("rate");
const likes = document.getElementById("likes");


const Refresh = () => {
    window.location.reload();

}



SaveBtn.onclick = () => {
    block()
    SendDataForm(SaveBtn,
        "frmEdit", "setting/setPoint",
        [comment_bought, comment, rate_bought, rate, likes],
        [],
        false,
        Refresh,
        false);
}