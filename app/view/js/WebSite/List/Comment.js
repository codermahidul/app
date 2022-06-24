import { URL, URLPATH, URLUSERFILE, VIEWURL } from "../../Fetch/Setting.js";
import { block, unblock } from '../../functions/Block.js';

import { Fetching } from "../../Fetch/Common.js";
import {checkNull} from '../../functions/Common.js';
import { numberFormat } from "../../functions/numberFormat.js";

let existc = 0;
let startc = 0;
let numberc = '30';
let urls = "";
let order = "";
let order_type = "";

const LoadMoreComment = document.getElementById("LoadMoreComment")
const SortBtn = document.getElementById("sortBtn");

export const SetToFirst = () => {

    startc = 0;
    existc = 0;
    $("#comments").html("")
}

export const showComment = (url) => {

    urls = url;

    Fetching(url, {
        product_id: $("#product_id").val(),
        user_online_id: $("#user_online_id").val(),
        start: startc.toString(),
        number: numberc,
        order,
        order_type
    }).then((data) => {
        if (data.status === 'true') {
            let total = data.data.total;
            existc = existc + data.data.data.length;
            startc = parseInt(startc) + parseInt(numberc);
            showCommentData(data.data.data);
            $("#number_comment").html(numberFormat(total))
            if (total - existc > 0) {
                LoadMoreComment.style.display = "";
            } else {
                LoadMoreComment.style.display = "none";
            }
        }
    })
}

export const SetBtnAddComment = () => {
    let btnReply = document.getElementsByClassName("reply-on-reply");
    let btnLike = document.getElementsByClassName("addlike");
    let btnDesLike = document.getElementsByClassName("removelike");

    for (let i = 0; i < btnReply.length; i++) {
        btnReply[i].onclick = (e) => {
            AddReplyOnComment(e)
        };
    };

    for (let i = 0; i < btnLike.length; i++) {
        btnLike[i].onclick = (e) => {
            AddLikeOnComment(e)
        };
    };

    for (let i = 0; i < btnDesLike.length; i++) {
        btnDesLike[i].onclick = (e) => {
            RemoveLikeOnComment(e)
        };
    };

}

const AddReplyOnComment = (e) => {

    let data = e.currentTarget.dataset;
    $("#modalAddComment").modal("show");
    $("#on_comment_id").val(data.id);
    $("#on_creator_id").val(data.user);
    $("#on_creator_type").val(data.type);
    $("#item_id").val(data.item);
    $("#textR").val("");

}

export const showCommentData = (data) => {

    let logged = $("#logged").val();

    let div = $("#comments");
    let str = "";
    data.forEach(d => {
        let businessmen = "";
        if (d.creator_type == "business") {
            businessmen = " p-2 bag-green ";
    
        }
        let imgUrl = "";
        imgUrl= GetBusinessImage(d)
  
       str+=' <div id=' + d.id + ' class="single-comment justify-content-between d-flex mb-30  ' + businessmen + '">';
       str+='<div class="user " style="width:100%;display: grid;grid-template-columns: 27% auto;grid-gap: 0.2rem;">';
       str+='<div class="thumb text-start" style="display: grid;gap: .5rem;">';
       str+='<img src="'+imgUrl +'" alt="'+checkNull(d.display_name)+'" />';
       str+='<a href="'+URLPATH+d.display_name_slug+'" class="font-heading text-brand">' + checkNull(d.display_name) + '</a>';
       if (d.on_creator_id !== '0') {
            str += ' <a class="hrefs" href="#' + d.on_comment_id + '"> @' + checkNull(d.display_name_reply) + '</a>';
        }
       str+='</div>';
       str+='<div class="desc">';
       str+='<div class="d-flex justify-content-between mb-10">';
       str+='<div class="d-flex align-items-center">';
       str+='<span class="font-xs text-muted">'+d.created_at+' </span>';
       str+='</div>';
       str+='<div class=" d-inline-block">';
       str+='<div class="" style="width: 100%">';

        str += '<small class="text-muted"><i class="bi bi-heart-fill text-danger"></i> ';
        str += '<span id="like_number_' + d.id + '">' + numberFormat(d.like_number) + '</span>';
        str += '</small>';
        str += '<small class="text-muted ms-1"><i class="bi bi-star"></i> ';
        str += numberFormat(d.rate_number) + ' Ratings</small>';
        
 
        str += '<small class="text-muted ms-1"><i class="bi bi-chat-square-text"></i> ';
        str+= numberFormat(d.post_number) + ' Reviews</small>';
        
       str += ' </div>';

       str+=' </div>';
       str+='</div>';
       
       str+='<p class="mb-10">'+d.text;
            //str+=' <a href="#" class="reply">Reply</a>';
            if (logged === 'true') {
                // str += '<div class="col-md-1" id="like_' + d.id + '">';
    
                // if (d.have_like === 'false') {
                //     str += '<button data-id="' + d.id + '" class="btn ms-1 me-1 addlike"><i class="bi bi-heart"></i></button>'
                // } else {
                //     str += '<button data-id="' + d.id + '" class="btn ms-1 me-1 removelike"><i class="bi bi-heart-fill text-danger"></i></button>'
                // }
                // str += '</div>';
                // str += '<div class="col-md-2">';
                // str += '<button class="btn reply-on-reply" data-type="' + d.on_creator_type + '" data-item="' + d.product_id + '" data-user="' + d.creator_id + '" data-id="' + d.id + '">';
                // str += '<strong>Reply</strong></button>';
                // str += '</div>';
    
                str+='<div class="product-extra-link2 d-flex">';
                str+='<div id="like_' + d.id + '">';
                if (d.have_like === 'false') {                             
                    str+='<a href="javascript:void(0)" class="btn-sm-radus-icon m-1 addlike" data-id="' + d.id + '"> ';
                    str+='<i class="bi bi-heart"></i>';
                    str+='</a>';
                }else
                {
                    str+='<a href="javascript:void(0)" class="btn-sm-radus-icon m-1 removelike" data-id="' + d.id + '" >';
                    str+='<i class="bi bi-heart-fill text-danger"></i>';
                    str+='</a>'; 
                }

                str+='</div>';
    
                str+='<a href="javascript:void(0)"  class="btn-sm-radus-icon m-1 reply-on-reply" data-type="' + d.on_creator_type + '" data-item="' + d.product_id + '" data-user="' + d.creator_id + '" data-id="' + d.id + '">';
                str+='Reply';
                str+='</a>';
          
                
                str+='</div>';
            }
       str+='</p>';
       str+='</div>';
       str+='</div>';
       str+='</div>';
       str+='</div>';
       
            




    });
    div.append(str);
    SetBtnAddComment()

}


export const showCommentData2 = (data) => {

    let logged = $("#logged").val();

    let div = $("#comments");
    let str = "";
    data.forEach(d => {
        let businessmen = "";
        if (d.creator_type == "business") {
            businessmen = " bg-primary p-2 text-dark bg-opacity-10 ";
    
        }

        let imgUrl = "";
        
     //   if (d.creator_type == "business") {
            imgUrl= GetBusinessImage(d)
      //  } else {
      //      imgUrl= GetUserImage(d)
        //}

   
        str += '<div id=' + d.id + ' class="col-md-12 row mb-3 m-1 align-items-center ' + businessmen + '">';
        str += '<div class="col-md-12 grid-two-info">';
        str += '<img class="midel-size-radus" src="' + imgUrl + '" alt="'+d.display_name+'">';

        str+='<div>';

        str += '<div class="mt-2 mb-1"> <span class="text-dark"> '
        str += '<span class="fw-bold">';
            if (d.creator_type == "business") {
            str += d.b_display_name
        } else {
            str += d.display_name
        } + '</span>'
        str += '</span></div>';
        
        // str += '<div class="mt-2 mb-1"> <small class="text-muted"><i class="bi bi-chat-square-text"></i> '
        //     + numberFormat(d.post_number) + ' Review</small></div>';
        
        str += '<div class="mt-2 mb-1">';
        str += '<small class="text-muted"><i class="bi bi-heart-fill text-danger"></i> ';
        str += '<span id="like_number_' + d.id + '">' + numberFormat(d.like_number) + '</span>';
        str += '</small>';

        str += '<small class="text-muted ms-1"><i class="bi bi-star"></i> ';
        str += numberFormat(d.rate_number) + ' Ratings</small>';

        str += '<small class="text-muted ms-1"><i class="bi bi-chat-square-text"></i> ';
        str+= numberFormat(d.post_number) + ' Reviews</small>';
       str += ' </div>';

            

        str+='</div>';    

        str += '</div>';
        str += ' <div class="col-md-10 ">';
        if (d.on_creator_id !== '0') {
            str += '<a class="hrefs" href="#' + d.on_comment_id + '"> @' + d.display_name_reply + '</a>';
        }
        str += '<p class="text-muted">' + d.text + ' </p>';

     //   if (d.creator_type == "business") {
            str += GetBusiness(d)
      //  } else {
       //     str += GetUser(d)
      //  }


        str += '</div>';

        str += '<div class="col-md-12 row justify-content-center">';

        if (logged === 'true') {
            str += '<div class="col-md-1" id="like_' + d.id + '">';

            if (d.have_like === 'false') {
                str += '<button data-id="' + d.id + '" class="btn ms-1 me-1 addlike"><i class="bi bi-heart"></i></button>'
            } else {
                str += '<button data-id="' + d.id + '" class="btn ms-1 me-1 removelike"><i class="bi bi-heart-fill text-danger"></i></button>'
            }
            str += '</div>';
            str += '<div class="col-md-2">';
            str += '<button class="btn reply-on-reply" data-type="' + d.on_creator_type + '" data-item="' + d.product_id + '" data-user="' + d.creator_id + '" data-id="' + d.id + '">';
            str += '<strong>Reply</strong></button>';
            str += '</div>';

         }

        
        str += '</div>';
        str += ' </div>';
    });
    div.append(str);
    SetBtnAddComment()

}

const GetBusiness = (d) => {
    let str = "";
    str += '<div class="mt-2 mb-2"><small class="text-muted"> Submitted by '
        + '<a class="hrefs" href="' + URLPATH + d.b_display_name_slug + '">' + d.b_display_name + ' ' +"businessmen" + '</a> on '
        + d.created_at + '</small></div>';
    return str;
}

const GetUser = (d) => {
    let str = "";
    str += '<div class="mt-2 mb-2"><small class="text-muted"> Submitted by '
        + '<a class="hrefs" href="' + URLPATH +"UserDetailProfile/"+ d.display_name_slug + '">' + d.display_name + '</a> on '
        + d.created_at + '</small></div>';
    return str;
}

// const GetBusinessImage=(d)=>{
//     let imgUrl="";
//     if (d.file_url !== "" && d.file_url !== null) {
//         imgUrl = URL + d.file_url + '/small/' + d.file_name;
//     } else {
//         imgUrl = URLPATH + VIEWURL + "/assets/imgs/blog/author-4.png";
//     }

//     return imgUrl;
// }

const GetBusinessImage = (d) => {
    let imgUrl = "";
    // if (d.file_url !== "" && d.file_url !== null) {
    //     imgUrl = URL + d.file_url + '/small/' + d.file_name;
    // } else {
    //     imgUrl = URLPATH + VIEWURL + "imgs/logo.png";
    // }

     if (d.image_url !== "" && d.image_url !== null) {
        imgUrl = URL + d.image_url + '/small/' + d.image_name;
    } else {
        imgUrl = URLPATH + VIEWURL + "/assets/imgs/blog/author-4.png";
    }
    return imgUrl;
}
const GetUserImage=(d)=>{
    let imgUrl="";
    if (d.user_image !== "" && d.user_image !== null) {
        imgUrl = URLUSERFILE + d.creator_id + '/profile/image/small/' + d.user_image;
    } else {
        imgUrl = URLPATH + VIEWURL + "imgs/user_defult.jpg";
    }

    return imgUrl;
}

LoadMoreComment.onclick = () => {

    showComment(urls);
}

const AddLikeOnComment = (e) => {

    let data = e.currentTarget.dataset;
    let id = data.id;
    let div = $("#like_" + id);
    let divNumber = $("#like_number_" + id);
    block();
    Fetching("product/addNewCommentLike", { idSearch: id, creator_type: $("#type_creator").val() }).then((data) => {
        unblock();
        if (data.status === "true") {
            
            let str="";
            str+='<a href="javascript:void(0)" class="btn-sm-radus-icon m-1 removelike" data-id="' + id + '" >';
            str+='<i class="bi bi-heart-fill text-danger"></i>';
            str+='</a>'; 

            div.html("");
            div.html(str);
            //div.html('<button data-id="' + id + '" class="btn ms-1 me-1 removelike"><i class="bi bi-heart-fill text-danger"></i></button>')
            divNumber[0].innerText = parseInt(divNumber[0].innerText) + 1
            SetBtnAddComment();
        } else {
            toast(data.err, "error");
        }

    })
}

const RemoveLikeOnComment = (e) => {
    let data = e.currentTarget.dataset;
    let id = data.id;
    let div = $("#like_" + id);
    let divNumber = $("#like_number_" + id);
    block();
    Fetching("product/removeCommentLike", { idSearch: id, creator_type: $("#type_creator").val() }).then((data) => {
        unblock();
        let str='';
        str+='<a href="javascript:void(0)" class="btn-sm-radus-icon m-1 addlike" data-id="' + id + '"> ';
        str+='<i class="bi bi-heart"></i>';
        str+='</a>';

        div.html("");
        div.html(str)
        //div.html('<button data-id="' + id + '" class="btn ms-1 me-1 addlike"><i class="bi bi-heart"></i></button>')
        divNumber[0].innerText = parseInt(divNumber[0].innerText) - 1
        SetBtnAddComment();
    })
}

if (SortBtn !== null) {
    SortBtn.onclick = () => {
        let value = $("#orders_by").val().split(",");
        startc = 0;
        existc = 0;
        order = value[0];
        order_type = value[1];
        $("#comments").html("");
        showComment(urls);
    }
}