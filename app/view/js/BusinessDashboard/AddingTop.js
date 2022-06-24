import { TopShowActionBusiness } from "../Admin/Confirm/TopShow.js";
import { RefreshTable } from "../DataTable.js";
import { Fetching } from "../Fetch/Common.js";
import { block, unblock } from "../functions/Block.js";
import { SwalRemoveFetch } from "../functions/SwalDelete.js";
import {numberFormat} from '../functions/numberFormat.js'
import { URLPATH } from "../Fetch/Setting.js";

const BtnAddTop=document.getElementById("btnAddTop");

let Id='';
let Type='';
let Admin=false;
export const ShowAddTop=(id,type,admin=false)=>{

    Id=id;
    Type=type;
    Admin=admin;
    $("#ModalAddTop").modal("show");
    GetDataAddShow();
    $("#typeAd").val("");
    $("#numbers").val("");
    document.getElementById("addTopFrm").reset();
}

const Resets=()=>{
    unblock();
    GetDataAddShow()
    RefreshTable();

}

BtnAddTop.onclick=()=>{
    let data={
        type_table:Type,
        id_table:Id,
        numbers:$("#numbers").val(),
        type:$("#typeAd").val(),
    }
    if(Admin)
    {
        data['payment']='1'
    }
    TopShowActionBusiness("fetchdata/addnewtopshow",data,Resets)
}

const GetDataAddShow=()=>{
    block();
    Fetching("fetchdata/topShowGet",{type_table:Type,id_table:Id}).then((data)=>{
        ShowHtmlData(data.data.data);
        unblock()
    })
}

const ShowHtmlData=(data)=>{
    
    let div=$("#result_top");
    div.html("");
    let str="";
    data.forEach(d => {
        
        let paid='<a  href="'+URLPATH+'PaymentTop/'+d.id+'" class="btn btn-sm btn-success radus m-1" > ($'+numberFormat(d.price*d.numbers)+') pay with Stripe</a>' ;
        if(d.payment==="1")
        paid='Paid';

        str+='<div class="col-md-12 row mb-2 border-bottom align-items-center p-1" >';
        str+='<div class="col-md-3">'+d.type+'</div>';
        str+='<div class="col-md-3">'+d.numbers+'</div>';
        str+='<div class="col-md-3">'+paid+'</div>';
        str+='<div class="col-md-3"><i data-id="'+d.id+'" class="bi bi-trash-fill text-danger point removesTop"</div>';
        str+='</div>';
    });

    div.html(str);
    RunAfterLoadTop();
}

const RunAfterLoadTop=()=>{
    let Btn=document.getElementsByClassName("removesTop");
    for(let i=0;i<Btn.length;i++)
    {
        Btn[i].onclick=(e)=>{
            RemovesTop(e);
        }
    }
}

const RemovesTop=(e)=>{
    let data=e.currentTarget.dataset;
    let id=data.id;
    SwalRemoveFetch("fetchdata/removetopshow", { idSearch: id }, Resets, "Are you sure?", "", "warning", "Your data is safe!");

}