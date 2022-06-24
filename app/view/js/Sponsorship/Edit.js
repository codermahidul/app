import { URLPATH } from "../Fetch/Setting.js";

let SpClass = await import("./SponsorshipClass.js?v=" + Date.now());

const Sponsorship = SpClass.Sponsorship;
const SaveToList = document.getElementById("SaveToList");

const SponsorClass= new Sponsorship("frmNew");

SponsorClass.SetCheckBox();

SponsorClass.ShowData("sponsorship/getMyRequest",{idSearch:$("#idSearch").val()});

SaveToList.onclick = () => {
    
    SponsorClass.EditData(SaveToList,"sponsorship/updateRequest",()=>{
        location.href=URLPATH+"PaymentSponsorship/"+$("#idSearch").val();

    })
}