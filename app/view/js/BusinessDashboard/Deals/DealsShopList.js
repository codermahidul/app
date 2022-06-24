


let DataTables= await import('../../Class/DataTable.js?v='+Date.now());
let Deals = await import("./DealsClass.js?v=" + Date.now())



const DataTable=DataTables.DataTable;
const DealClass = Deals.DealClass;
const DealsC = new DealClass("","");



const DtClass=new DataTable("dataTable","couponAble/get_all_shop_my_deals");

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
    category_id:()=>{return DealsC.GetCategoryId();}
};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}





DtClass.ClickTable("view",(data)=>{
    DealsC.ViewInfo("deals/getData",{idSearch:data.id},()=>{$("#ModalView").modal("show")})
})






