import { CreateSelectOption } from "../../Fetch/Common.js";
import { fileInput,GetIdFromUrl,tokenizAjax } from "../../functions/Common.js";

let Book = await import("./BookingClass.js?v=" + Date.now())

const BookClass = Book.Booking;

const BookC = new BookClass("frmNew","InterviewBooking");
const BtnAdd=document.getElementById("btnAddNew");
const AddMoreTeams=document.getElementById("add_more_teams")
const AddMoreGuest=document.getElementById("add_more_guest");

if(BtnAdd!==null)
{
    BtnAdd.onclick=()=>{
        BookC.EditInfo(BtnAdd,"team/editBooking")
    }
}

AddMoreTeams.onclick=()=>{
    BookC.CreateTeamSearch("more_team");
}

AddMoreGuest.onclick=()=>{
    BookC.CreateGuestSearch("more_guest");
}

BookC.ShowData("team/getMyBooking",{idSearch:GetIdFromUrl()})
$("#idSearch").val(GetIdFromUrl());
