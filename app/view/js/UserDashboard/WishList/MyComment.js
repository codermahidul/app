import { RefreshTable, setDataTable } from "../../DataTable.js";


const Search = document.getElementById("searchbtn");

const column = [
    { "data": "id" },
    {"data":"text"},
    {"data":"forum"},
    { "data": "like_number" },
    { "data": "created_at" },

];
const param = {
    trash:"0",
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
};



///datatble
setDataTable("datatable", "forummycommenttable/get_all", param, column);

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
