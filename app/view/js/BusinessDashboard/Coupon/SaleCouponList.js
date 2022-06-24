


let DataTables= await import('../../Class/DataTable.js?v='+Date.now());



const DataTable=DataTables.DataTable;



const DtClass=new DataTable("dataTable","couponAble/get_all_shop_my_coupon");

const Search=document.getElementById("searchbtn");
const searchVal=document.getElementById("searchVal");


const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "value" },
    { "data": "product" },
    { "data": "expire" },
    { "data": "action" },

];
const param = {
    trash: "0",
    idSearch: () => { return $("#idSearchs").val() },
    display_name: () => { return $("#titlese").val() },
};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}










