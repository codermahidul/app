import { RefreshTable, setDataTable } from "../../DataTable.js";
import { block, unblock } from "../../functions/Block.js";
import  { Fetching } from '../../Fetch/Common.js';

const Search = document.getElementById("searchbtn");

const column = [
    { "data": "id" },
    { "data": "type" },
    {"data":"text"},
    // {"data":"Disabled"},
    { "data": "action" },

];
const param = {
    trash:"0",
    idSearch: () => { return $("#idSearchs").val() },
    text: () => { return $("#texts").val() },
    is_read: () => { return $("#is_reads").val() },
    type_name:()=>{ return $("#notes_types").val() }
};



///datatble
setDataTable("datatable", "notificationtable/get_all", param, column);

Search.onclick = () => {
    RefreshTable();
}


const ShowText=(txt,id)=>
{
    $("#ModalShowNotification").modal("show");
    $("#show_text").html(txt);
    Fetching("useraction/updatenote",{idSearch:id,is_read:1}).then((data)=>{RefreshTable()})
}


/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {
 
    
      
        case "view": {

            ShowText(data.txt,data.id)
            break;
        }
    
    }

});

const setUrlSearch=()=>{
    let id=window.location.pathname;
    id=id.split("/");
    if(!isNaN(id[id.length-1]))
    {
        $("#idSearchs").val(id[id.length-1]);
        RefreshTable();
    }
}

setUrlSearch();

