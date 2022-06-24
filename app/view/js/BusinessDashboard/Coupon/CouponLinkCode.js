
import { Fetching } from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";
import { fileInput, GetIdFromUrl, resetForm, SendDataForm } from "../../functions/Common.js";

let DataTables= await import('../../Class/DataTable.js?v='+Date.now());
let FunctionsSwale = await import("../../functions/SwalDelete.js?v=" + Date.now());



const DataTable=DataTables.DataTable;
const SwalRemoveFetch=FunctionsSwale.SwalRemoveFetch


const DtClass=new DataTable("dataTable","couponAble/get_all_coupon_link_code");

const BtnAdd=document.getElementById("BtnAdd");
const BtnNew=document.getElementById("btnNew");
const Search=document.getElementById("searchbtn");
const LinkCode=document.getElementById("value");
const BtnLinkCode=document.getElementById("btnLinkCodeEdit")
const Used=document.getElementById("used");
const Link_Code=document.getElementById("link_code");

const column = [
    { "data": "id" },
    { "data": "link_code" },
    { "data": "used" },
    { "data": "action" },

];
const param = {
    trash: "0",
    idSearch: () => { return GetIdFromUrl() },
    
    idSearchLink: () => { return $("#idSearchs").val() },
    link_code: () => { return $("#titlese").val() },
};


DtClass.CreateDataTable(param,column);

Search.onclick=()=>{
    DtClass.Refresh();
}

if(BtnAdd !==null)
{
    BtnAdd.onclick=()=>{
        $("#ModalAdd").modal("show");
    }
}

const AfterAdd=()=>{
    $("#ModalAdd").modal("hide");
    DtClass.Refresh();
}

if(BtnNew !==null)
{
    BtnNew.onclick=()=>{
        SendDataForm(BtnNew,"newFrm","coupon/setLinkCode",[LinkCode],[
            {name:"idSearch",value:GetIdFromUrl()}
        ],false,AfterAdd,false);
    }
}


DtClass.ClickTable("remove",(data)=>{
    SwalRemoveFetch("coupon/removeLinkCode",{idSearch:GetIdFromUrl(),idSearchLink:data.id},()=>{
        DtClass.Refresh();
    })
})

DtClass.ClickTable("update",(data)=>{
   GetInfo(data.id)
})

const GetInfoEdit=(id)=>{
    block()
    return new Promise(resolve=>{
        Fetching("coupon/getLinkCode",{idSearchLink:id}).then((data)=>{unblock();resolve(data)})
    })
}

async function GetInfo(id){
    let result=await GetInfoEdit(id);
    let data=result.data.data[0]
    $("#ModalEdit").modal("show");
    $("#idSearchLink").val(id);
    $("#used").val(data.used);
    $("#link_code").val(data.link_code);
}

BtnLinkCode.onclick=()=>{
    SendDataForm(BtnLinkCode,"linkFrm","coupon/updateLinkCode",[Used,Link_Code],[],false,()=>{
        DtClass.Refresh();
        $("#ModalEdit").modal("hide");

    },false)
}

fileInput("fileinputs");
