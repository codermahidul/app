import { SwalRemoveFetch } from "../functions/SwalDelete.js";
import { SendDataForm } from '../functions/Common.js';

const BtnF=await import("./Btn.js?v="+Date.now());

const ChangeToBlock=BtnF.ChangeToBlock;
const ChangeToUnBlock=BtnF.ChangeToUnBlock;

export class FollowActionClass {
  constructor() {
    
    this.AddTxtBtn=document.getElementById("addTxt");
    if(this.AddTxtBtn !==null)
    {
      this.AddTxtBtn.onclick=()=>{this.AddTxt()};
    }
  }

  SetAction() {
    const Block = document.getElementsByClassName("block");
    const Unblock = document.getElementsByClassName("unblock");
    const Message = document.getElementsByClassName("message");
    const Unfollow = document.getElementsByClassName("unfollow");
    for (let i = 0; i < Block.length; i++) {
      Block[i].onclick = (e) => {
        let data = e.currentTarget.dataset;
        this.Block(data.id);
      };
    }

    for (let i = 0; i < Unblock.length; i++) {
        Unblock[i].onclick = (e) => {
          let data = e.currentTarget.dataset;
          this.Unblock(data.id);
        };
      }
    for (let i = 0; i < Message.length; i++) {
      Message[i].onclick = (e) => {
        let data = e.currentTarget.dataset;
        this.Message(data.id);
      };
    }

    for (let i = 0; i < Unfollow.length; i++) {
      Unfollow[i].onclick = (e) => {
        let data = e.currentTarget.dataset;
        this.Unfollow(data.id,data.parent);
      };
    }
  }

  Block(id) {
    SwalRemoveFetch(
      "userBusinessAction/updateFollowing",
      { user_applicant: id, block: "1" },
      () => {
      
        ChangeToUnBlock(id);
        this.SetAction();
      },
      "Are you sure?",
      "",
      "warning",
      "ok"
    );
  }
  
  Unblock(id) {
    SwalRemoveFetch(
      "userBusinessAction/updateFollowing",
      { user_applicant: id, block: "0" },
      () => {
      
        ChangeToBlock(id);
        this.SetAction();
      },
      "Are you sure?",
      "",
      "warning",
      "ok"
    );
  }

  Message(id) {
    $("#to_user").val(id)
    $("#modalMessage").modal("show")
  }

  Unfollow(id,parent) {
    SwalRemoveFetch(
        "userBusinessAction/unfollow",
        { idSearch: id, block: "0" },
        () => {
        
          $("#main_div_part_"+parent).remove();
          this.SetAction();
        },
        "Are you sure?",
        "",
        "warning",
        "ok"
      );
    
  
  }

  AddTxt(){
    SendDataForm(this.AddTxtBtn,"frmNewTxt","userBusinessAction/AddTxt",[],[],false,()=>{ $("#modalMessage").modal("hide")});
  }
}
