import { SendDataForm } from "../../functions/Common.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";

let DataTables= await import('../../Class/DataTable.js?v='+Date.now());


const DataTable=DataTables.DataTable;



const DtClass=new DataTable("dataTable","couponAble/get_all_user_shop_deals");

const Search=document.getElementById("searchbtn");
const AddBusiness=document.getElementById("addBusiness");

const column = [
    { "data": "id" },
    { "data": "title" },
    { "data": "value" },
    { "data": "expire" },
    { "data": "action" },

];
const param = {
    order: "coupon.id",
    idSearch: () => { return $("#idSearchs").val() },
    title: () => { return $("#titlese").val() },
};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}



const RefreshAfterAdd=()=>{
    let id=AddBusiness.dataset.id;
    $("#"+id).modal("hide");
    $("#now").val("");
    DtClass.Refresh();
}

DtClass.ClickTable("share",(data)=>{

    SwalRemoveFetch("userBusinessAction/couponShare",{idSearch:data.id},DtClass.Refresh,"Are You Sure Share this?","","info","Ok","",false);

})