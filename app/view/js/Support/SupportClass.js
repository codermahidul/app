import { CreateSelectOption } from "../Fetch/Common.js";
import { URLPATH } from "../Fetch/Setting.js";
import { SendDataFormFile } from "../functions/Common.js"


export class SupportClass{

    constructor(){

        this.descriptions=document.getElementById("description");
        this.priority=document.getElementById("priority");
        this.topic=document.getElementById("topic");
   
    }

    AddTicket=(Btn,frm,url,fn=()=>{})=>{
   
        SendDataFormFile(Btn,frm,url,[this.topic,this.descriptions,this.priority],[],false,()=>{
            fn()
        },false);
    }

    
  SetProof = () => {
    CreateSelectOption(
      { url: URLPATH + "fetchData/proof_get", params: { type: "priority" } },
      { id: "priority", value: "id", title: "title" },
      false,
      this.AfterSet
    );
    CreateSelectOption(
      { url: URLPATH + "fetchData/proof_get", params: { type: "topic" } },
      { id: "topic", value: "id", title: "title" },
      false,
      this.AfterSet
    );


  };

  AfterSet(){

  }
};
