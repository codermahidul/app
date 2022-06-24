
import { fileInput, GetIdFromUrl } from "../functions/Common.js";

let Ticket= await import('./TicketClass.js?v='+Date.now());


const TicketClass=Ticket.TicketClass;

const Ti=new TicketClass("result_ticket");

const btnAdd=document.getElementById("btnReply");


fileInput("fileInput","Drag & drop file or image here &hellip;",[
    "jpg", "png", "jpeg","pdf","doc", "docx"
]);

const GetData=()=>{
    Ti.EmptyDiv();
    Ti.GetData("support/getTicket",{support_id:GetIdFromUrl()});
    $("#support_id").val(GetIdFromUrl());
}

btnAdd.onclick=()=>{

    Ti.AddTxt(btnAdd,"support/addNewTicketAdmin","addFrm",GetData);
}
GetData()
