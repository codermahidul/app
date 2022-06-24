import { URLPATH } from "../../Fetch/Setting.js";

const TypeCreator=document.getElementById("type_creator");
const Logged=document.getElementById("logged");
const BannerBtn=document.getElementById("bannerBtn");
const FeaturedBtn=document.getElementById("featuredBtn");

if(BannerBtn !==null)
{
    BannerBtn.onclick=()=>{
        
        if(Logged.value==='false')
        {

            toast("Please login first","error")
            return false;
        }
        switch(TypeCreator.value){

            case "business":{
                window.location.href=URLPATH+"BannerOrder";
                break;
            }

            case "professional":{
                window.location.href=URLPATH+"ProfessionalBannerOrder";
                break;
            }

            case "user":{
                window.location.href=URLPATH+"UserBannerOrder";
                break;
            }
        }
    }
}


if(FeaturedBtn !==null)
{
    FeaturedBtn.onclick=()=>{
        
        if(Logged.value==='false')
        {

            toast("Please login first","error")
            return false;
        }
        switch(TypeCreator.value){

            case "business":{
                $("#ModalSponsorshipSection").modal("show")
                break;
            }

            case "professional":{
                toast("Sorry, This feature is enabled for business accounts","warning")
                break;
            }

            case "user":{
                toast("Sorry, This feature is enabled for business accounts","warning")
                break;
            }
        }
    }
}