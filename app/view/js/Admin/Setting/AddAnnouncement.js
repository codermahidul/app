const { URLPATH } = require("../../Fetch/Setting");

const AnnouncementClass=await import("./AnnouncementClass.js?v="+Date.now());
const Announcement=AnnouncementClass.Announcement;

const AddMoreCat=document.getElementById("add_more_cat");
const ResetCat=document.getElementById("reset_cat");
const AddCity=document.getElementById("add_more_city");
const BtnSave=document.getElementById("btnSave");
const UserType=document.getElementById("user_type");
const Expire=document.getElementById("expire");
const Description=document.getElementById("description");
const AnnouncementC=new Announcement();

if(AddCity!==null){
    AddCity.onclick=()=>{
        AnnouncementC.AddCity();
    }
}

if(BtnSave!==null){
    BtnSave.onclick=()=>{
        AnnouncementC.SaveData(BtnSave,"frmNew","setting/addAnnouncement",()=>{
            window.location.href=URLPATH+'Announcement';
        },[
            UserType,
            Description,
            Expire
        ],"user_id")
    }
}