import { SwalRemoveFetch } from '../../functions/SwalDelete.js';



const AddToFolow=document.getElementById("AddToFolow");
const UnFollowBtn=document.getElementById("UnFollowBtn");

const RefreshPage=()=>{
window.location.reload();
}

if(AddToFolow !==null)
{
    AddToFolow.onclick=()=>{
        let id=AddToFolow.dataset.id;
        let param={
            user_responder:id,
       
        }
        
        SwalRemoveFetch("useraction/requestfollow"
            , param
            , RefreshPage
            , "Are you sure of your request"
            , ""
            , "info"
            , "No request sent"
            , ""
            , false
            ,"Your request has been sent"
        );
    }
}

if(UnFollowBtn !==null)
{
    UnFollowBtn.onclick=()=>{
        let id= UnFollowBtn.dataset.id;
        let param={
            id,
        }
        SwalRemoveFetch("useraction/unfollow"
        , param
        , RefreshPage
        , "Are you sure of your request"
        , ""
        , "info"
        , "No request sent"
        , ""
        , true
        ,"Your request has been sent"
    );
    }
}