import { Fetching } from "../../Fetch/Common.js"

export const SaveNoteAdmin=(type,itemid,itemtable,text,to_user,callback=()=>{})=>{
    let param={
        typeAdd:"admin_id",
        type,
        itemtable,
        itemid,
        text,
        to_user
    }
    Fetching("fetchdata/addnoteadmin",param).then((data)=>{
        if(data.status==="true")
        {
            toast("successful", "success");
           
        } else {
            toast(data.err, "error");
        }
        callback();
    })
}