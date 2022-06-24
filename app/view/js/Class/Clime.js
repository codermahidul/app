import { SwaleConfirmAction, SwaleError } from "../functions/SwalDelete.js";
import { block, unblock } from "../functions/Block.js";

import { FetchingFile } from "../Fetch/Common.js";
import { URLPATH } from "../Fetch/Setting.js";
import getObjFormData from "../functions/ObjectFormData.js";

export class Clime{
    
    constructor(){
        this.logged='false';
        this.typeCreator='';
        this.ClimeBtn=document.getElementById("climeBtn");
        this.display_name_user=document.getElementById("display_name_user");
        this.email_online=document.getElementById("email_user");
        this.email_online_cl=document.getElementById("email_online_cl");
        this.title_item=document.getElementById("title_item");
        this.BtnAdd=document.getElementById("addClaim");
        this.reason=document.getElementById("reason");

        this.idSearch="";
        this.tableType="";
        this.Set()
        
    }

    Set=()=>{
        
        if(this.title_item!==null && document.getElementById("title_item_cl")!==null)
        document.getElementById("title_item_cl").innerHTML=this.title_item.value;
                
        
        if(document.getElementById("tableType")!==null && document.getElementById("items_type")!==null)
        document.getElementById("items_type").value=document.getElementById("tableType").value;
               
        
        if(document.getElementById("idSearch")!==null && document.getElementById("items_id") !==null)
        document.getElementById("items_id").value=document.getElementById("idSearch").value;
            

        if(this.display_name_user!==null && document.getElementById("display_name_user_cl")!==null)
        document.getElementById("display_name_user_cl").value=this.display_name_user.value;
                
        if(this.email_online!==null && this.email_online_cl!==null)
        this.email_online_cl.value=this.email_online.value;

        if(document.getElementById("logged")!==null)
        this.logged=document.getElementById("logged").value;

        if(document.getElementById("type_creator")!==null)
        this.typeCreator=document.getElementById("type_creator").value;

        if(this.BtnAdd!==null)
        {
            this.BtnAdd.onclick=()=>{this.SaveData()}
        }

        if(this.ClimeBtn!==null)
        {
            this.ClimeBtn.onclick=()=>{this.clickBtn()}
        }
      
        setTimeout(() => {
            if($(".fileInputsClime").length>0){

                $(".fileInputsClime").fileinput({
                    theme: "fas",
                
                    showUpload: false,
                    showCaption: false,
                    maxFileSize: 7000,
                    maxFileCount: 3,
                    allowedFileExtensions: [
                        "jpg", "png", "jpeg","pdf","doc", "docx"
                    ],
                    initialPreviewShowDelete: true,
                    dropZoneTitle:"Drag & drop file or image here &hellip;",
                  });
                  $(".close.fileinput-remove").css("display", "none");
            }
        }, 1000);

    }

    clickBtn=()=>{
        
        if(this.logged==='false')
        {
            SwaleConfirmAction(()=>{
                window.location.href=URLPATH+"Login";
            },"please first login","","Login","Cancel");
            return false;
        }
        if(this.typeCreator==='business')
        {
            $("#ModalClime").modal("show");
        }else
        {
            SwaleError("Sorry, only business accounts can use this form");
            return false;
        }
    }

    SaveData=()=>{
        if($("#main_image")[0].files.length<=0)
        {
            toast("please choose file","error")
        }
        let form_data = new FormData();
        let formData = getObjFormData("frmNewClime", false);
        for (let key in formData) {
            form_data.append(key, formData[key]);
          }
        form_data.append("img", $("#main_image")[0].files[0]);
        block();
        FetchingFile("claim/addNew", form_data).then((data) => {
            this.BtnAdd.disabled = false;
            unblock();
            if (data.status === "true") {
              toast("successful", "success");
         
              window.location.reload();
              
        
            } else {
              toast(data.err, "error");
            }
          });
    }
}