import { Fetching } from "../../Fetch/Common.js";
import { URL } from "../../Fetch/Setting.js";

const ModalView = $("#ModalView");
const DivImage = document.getElementById("img");
const Desc = document.getElementById("description");
const DivTitle = document.getElementById("title");
const DivCategory = document.getElementById("category_id_view");
const DivLink = document.getElementById("Links");
//const Award = document.getElementById("award_section");
const Guest = document.getElementById("guest");
const Role = document.getElementById("role");
const VideoLink = document.getElementById("video_link_div");
const PhotographerName = document.getElementById("photographer_name_div");
const Description = document.getElementById("description_div");
const Tags = document.getElementById("tags_div");


export const ShowInfoDataDiv = (id,url="") => {


    Fetching(url, { idSearch: id }).then((data) => {

        ModalView.modal("show");
        DivImage.innerHTML = ""
        DivTitle.innerHTML = ""
        DivCategory.innerHTML = ""
        Desc.innerHTML = ""
        DivLink.innerHTML="";
     //   Award.innerHTML="";
        Guest.innerHTML="";
        Role.innerHTML="";
        VideoLink.innerHTML="";
        PhotographerName.innerHTML="";
        Description.innerHTML="";
        Tags.innerHTML="";
        let d = data.data.data[0];

        if (d.file_url !== '' && d.file_url !== null && d.file_name !== '' && d.file_name !== null) {
            DivImage.innerHTML = '<img class="rounded" src="' + URL + d.file_url + '/thumb/' + d.file_name + '">';
        }

        DivTitle.innerHTML='<h4>'+d.title+'</h4>';
        Desc.innerHTML=d.description;
     //   Award.innerHTML=d.award_name;
        DivCategory.innerHTML=d.program_category_name;
        VideoLink.innerHTML=d.video_link;
        PhotographerName.innerHTML=d.photographer_name;
        Description.innerHTML=d.description;
        Tags.innerHTML=d.tags;
    
        let linkStr="";
        if (d.program_tag !== '' && d.program_tag !== null) {          
            let links=d.program_tag.split(",");
            linkStr+="<h5 class='mb-3 text-dark mt-3'>play Links</h5>";
            links.forEach(e => {
                let datas=e.split("::");
                let type=datas[3];
                let href=datas[2];
                let title=datas[1];
                if(type==="play")
                {
                    linkStr+="<a class='mb-2 hrefs' target='_blank' href='"+href+"'>"+title+"</a>";
                }
            });


            linkStr+="<h5 class='mb-3 text-dark mt-3'>Download Links</h5>";
            links.forEach(e => {
                let datas=e.split("::");
                let type=datas[3];
                let href=datas[2];
                let title=datas[1];
                if(type==="download")
                {
                    linkStr+="<a class='mb-2 hrefs' target='_blank' href='"+href+"'>"+title+"</a>";
                }
            });
        }

        DivLink.innerHTML=linkStr;

        let guestLink="";
        if(d.program_guests !=='' && d.program_guests !==null)
        {
            let datas=d.program_guests.split(",");
            datas.forEach(dd => {
                let info=dd.split("::");
                let name="";
                let link="";
                if(info[1]!=="")
                {
                    name=info[1];
                }

                if(info[3]!=="")
                {
                    name=info[3];
                }

                if(info[4]!=="")
                {
                    name=info[4];
                }
                
                link=info[5];
                guestLink+='<div class="mb-2">'+name+' ( <a target="blank" href="'+link+'">'+link+'</a> )'+'</div>';
            });
         
            Guest.innerHTML=guestLink;   
        }
       
        let roleLink="";
        if(d.program_role !=='' && d.program_role !==null)
        {
            let datas=d.program_role.split(",");
            datas.forEach(dd => {
                let info=dd.split("::");
                let role=info[3];
                let crew=info[2];
        
                roleLink+='<div class="mb-2">'+role+' : '+crew+'</div>';
            });
         
            Role.innerHTML=roleLink;   
        }
    })
}

