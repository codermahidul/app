import { Fetching } from "../../Fetch/Common.js";
import { URLPATH } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";
import { html_entity_decode, SetCkEditor } from "../../functions/CkEditor.js";
import { SendDataForm } from "../../functions/Common.js";

let idSearch=window.location.pathname.split("/");
idSearch=idSearch[idSearch.length-1];

const AddNew=document.getElementById("addNew");


const ResetAdd=()=>{
    window.location.reload();
}

AddNew.onclick=()=>{
    SendDataForm(AddNew,"frmNew","fetchData/updateDataPage",
    [],
    [
        {name:"editor",value:CKEDITOR.instances["editors"].getData()},
        
    ],
    false,
    ResetAdd,
    false)
}

const GetData=()=>{
    block();
    Fetching("fetchData/getDataPage",{idSearch}).then((data)=>{
        unblock()
        if(data.status==="true")
        {
            let datas=data.data[0];
          
            CKEDITOR.instances["editors"].setData(html_entity_decode(datas.editor,'&lt;'))
        }else
        {
            toast(data.err, "error");
        }
     
    })
}



SetCkEditor("editors");
GetData();
