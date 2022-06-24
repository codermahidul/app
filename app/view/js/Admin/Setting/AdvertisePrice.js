import { URL } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";
import { SendDataForm } from "../../functions/Common.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";


const SaveBtn = document.getElementById("saveBtn");
const section = document.getElementById("section");
const type = document.getElementById("type");
const price = document.getElementById("price");
const Removes=document.getElementsByClassName("removes");


const Refresh = () => {
    window.location.reload();

}



SaveBtn.onclick = () => {
    block()
    SendDataForm(SaveBtn,
        "frmAdd", "setting/setAdListPrice",
        [section, type, price],
        [],
        false,
        Refresh,
        false);
}

for(let i=0;i<Removes.length;i++)
{
    Removes[i].onclick=(e)=>{
        RemovesItem(e)
    }
}

const RemovesItem=(e)=>{
    
    let data=e.currentTarget.dataset;
    let id=data.id;
    SwalRemoveFetch("setting/DeleteAdListPrice", { idSearch: id }, Refresh, "Are you sure?", "", "warning", "Your data is safe!");

}