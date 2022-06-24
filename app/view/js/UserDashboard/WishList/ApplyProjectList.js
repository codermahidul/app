import { RefreshTable, setDataTable } from "../../DataTable.js";


const Search = document.getElementById("searchbtn");

const column = [
    { "data": "id" },
    { "data": "title" },
    {"data":"txt"},
    {"data":"send_date"},
    { "data": "action" },

];
const param = {
    trash:"0",
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
};



///datatble
setDataTable("datatable", "projectapplytable/get_all", param, column);

Search.onclick = () => {
    RefreshTable();
}



/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {
 
  
   
        case "view": {

            
            break;
        }
  
    }

});
