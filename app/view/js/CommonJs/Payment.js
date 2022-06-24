import { RefreshTable, setDataTable } from "../DataTableBtn.js";

import { fileInput } from "../functions/Common.js";


const column = [
    { "data": "id" },
    {"data":"transActionId"},
    { "data": "currency" },
    { "data": "status" },
    { "data": "amount" },
    { "data": "created_at" },


];
const param = {
    creator_type: $("#creator_types").val(),

};


///datatble
setDataTable("datatable", "paymentTable/get_all", param, column);
fileInput("fileinputs", 'Drag & drop Image here &hellip;', ['jpg', 'png', 'jpeg', 'gif']);















/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {





    }

});

