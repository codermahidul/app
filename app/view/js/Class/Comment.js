import { block, unblock } from "../functions/Block.js";

import { checkNull } from "../functions/Common.js";

let Fetch = await import("../Fetch/Common.js?v=" + Date.now());
let Setting = await import("../Fetch/Setting.js?v=" + Date.now());
let NumberFunctions = await import("../functions/numberFormat.js?v=" + Date.now());

const Fetching = Fetch.Fetching;
const URL = Setting.URL;
const URLPATH = Setting.URLPATH;
const URLUSERFILE = Setting.URLUSERFILE;
const VIEWURL = Setting.VIEWURL;
const numberFormat = NumberFunctions.numberFormat;



export class Comment {

    constructor(user_online_id = $("#user_online_id").val()) {
        this.existC = 0;
        this.startC = 0;
        this.numberC = '30';
        this.urls = "";
        this.order = "";
        this.order_type = "";
        this.user_online_id = user_online_id;
    }

    SetToFirst = () => {

        this.startC = 0;
        this.existC = 0;
    }

    SetOrder = (order, type) => {

        this.order = order;
        this.order_type = type;
    }


    showComment = (url, param = {}, fn = () => { }) => {

        Fetching(url, {
            ...param,
            ...{
                user_online_id: this.user_online_id,
                start: this.startC.toString(),
                number: this.numberC,
                order: this.order,
                order_type: this.order_type
            }
        }).then((data) => {
            if (data.status === 'true') {

                this.existC = this.existC + data.data.data.length;
                this.startC = parseInt(this.startC) + parseInt(this.numberC);

                fn(data, this.existC);

            }
        })
    }

    showCommentData = (data, logged) => {

        let str = "";
        data.forEach(d => {
            let businessmen = "";
            if (d.creator_type == "business") {
                businessmen = " p-2 bag-green ";
        
            }
            let imgUrl = "";
            imgUrl= this.GetBusinessImage(d)
      
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
                        str+='<a href="javascript:void(0)" class="btn-sm-radus-icon m-1 addLike" data-id="' + d.id + '"> ';
                        str+='<i class="bi bi-heart"></i>';
                        str+='</a>';
                    }else
                    {
                        str+='<a href="javascript:void(0)" class="btn-sm-radus-icon m-1 removeLike" data-id="' + d.id + '" >';
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
        return str;

        //SetBtnAddComment()

    }

    GetBusinessImage = (d) => {
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

    GetUserImage = (d) => {
        let imgUrl = "";
        if (d.user_image !== "" && d.user_image !== null) {
            imgUrl = URLUSERFILE + d.creator_id + '/profile/image/small/' + d.user_image;
        } else {
            imgUrl = URLPATH + VIEWURL + "imgs/user_defult.jpg";
        }

        return imgUrl;
    }

    GetBusiness = (d) => {
        let str = "";
        str += '<div class="mt-2 mb-2"><small class="text-muted"> Submitted by '
            + '<a class="hrefs" href="' + URLPATH + d.b_display_name_slug + '">' + d.b_display_name + ' ' + "businessmen" + '</a> on '
            + d.created_at + '</small></div>';
        return str;
    }

    GetUser = (d) => {
        let str = "";
        str += '<div class="mt-2 mb-2"><small class="text-muted"> Submitted by '
            + '<a class="hrefs" href="' + URLPATH + "UserDetailProfile/" + d.display_name_slug + '">' + d.display_name + '</a> on '
            + d.created_at + '</small></div>';
        return str;
    }

    SetBtnAddComment = (AddReplyOnComment, AddLikeOnComment, RemoveLikeOnComment) => {
        let btnReply = document.getElementsByClassName("reply-on-reply");
        let btnLike = document.getElementsByClassName("addLike");
        let btnDesLike = document.getElementsByClassName("removeLike");

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


    AddReplyOnComment = (e) => {

        let data = e.currentTarget.dataset;
        $("#modalAddComment").modal("show");
        $("#on_comment_id").val(data.id);
        $("#on_creator_id").val(data.user);
        $("#on_creator_type").val(data.type);
        $("#item_id").val(data.item);
        $("#textR").val("");

    }

    AddLikeOnComment = (id, url = "product/addNewCommentLike", param, fun = () => { }, Div, DivNumber) => {
        block();
        Fetching(url, param).then((data) => {
            unblock();
            if (data.status === "true") {
                fun();
                let str="";
                str+='<a href="javascript:void(0)" class="btn-sm-radus-icon m-1 removeLike" data-id="' + id + '" >';
                str+='<i class="bi bi-heart-fill text-danger"></i>';
                str+='</a>'; 
                Div.html("");
                Div.html(str)
                //Div.html('<button data-id="' + id + '" class="btn ms-1 me-1 removeLike"><i class="bi bi-heart-fill text-danger"></i></button>')
                DivNumber[0].innerText = parseInt(DivNumber[0].innerText) + 1

            } else {
                toast(data.err, "error");
            }

        })
    }

    RemoveLikeOnComment = (id, url = "product/addNewCommentLike", param, fun = () => { }, Div, DivNumber) => {
        block();
        Fetching(url, param).then((data) => {
            unblock();
            if (data.status === "true") {
                fun();
                let str='';
                str+='<a href="javascript:void(0)" class="btn-sm-radus-icon m-1 addLike" data-id="' + id + '"> ';
                str+='<i class="bi bi-heart"></i>';
                str+='</a>';
                Div.html("");
                Div.html(str)
                //Div.html('<button data-id="' + id + '" class="btn ms-1 me-1 addLike"><i class="bi bi-heart"></i></button>')
                DivNumber[0].innerText = parseInt(DivNumber[0].innerText) - 1

            } else {
                toast(data.err, "error");
            }

        })
    }
}

