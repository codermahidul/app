import { RefreshTable, setDataTable } from "../../DataTable.js";



const Search = document.getElementById("searchbtn");

const column = [
    { "data": "id" },
    { "data": "table_type" },
    { "data": "item_id" },
    {"data":"item_title"},
    { "data": "numbers" },
    { "data": "proofs" },
   

];
const param = {
    table_type: () => { return $("#type").val() },
};



/////set data for category selected

///datatble
setDataTable("datatable", "reporttable/get_all", param, column);

Search.onclick = () => {
    RefreshTable();
}







/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {

        case "view": {

           // ShowInfoDataDiv(data.id)
            break;
        }

  

    }

});


