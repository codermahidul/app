


let Common = await import("../../Fetch/Common.js?v=" + Date.now());
let FunctionsSwal = await import("../../functions/SwalDelete.js?v=" + Date.now());
let FunctionsBlock = await import("../../functions/Block.js?v=" + Date.now());
let Setting = await import("../../Fetch/Setting.js?v=" + Date.now());
let NumberFunctions = await import("../../functions/numberFormat.js?v=" + Date.now());
let Comments = await import('../../Class/Comment.js?v='+Date.now());
let CheckedS = await import('../../functions/Checked.js?v='+Date.now());

const numberFormat = NumberFunctions.numberFormat;
const Comment=Comments.Comment;
const URLPATH=Setting.URLPATH;
const Fetching=Common.Fetching;
const block=FunctionsBlock.block;
const unblock=FunctionsBlock.unblock;
const SwaleError=FunctionsSwal.SwaleError;
const CheckCaptcha=CheckedS.CheckCaptcha;

const typeCreator = document.getElementById("type_creator").value;
const Logged = document.getElementById("logged").value;
const AddReview = document.getElementById("btnReview");
const ModalReview = $("#modalReview");
const SaveReview = document.getElementById("addReview");
const SaveReply = document.getElementById("addReply");
const LoadMoreComment = document.getElementById("LoadMoreComment");
const DivComment=document.getElementById("comments");
const SortBtn = document.getElementById("sortBtn");

const CommentClass = new Comment();

AddReview.onclick = () => {

    if (Logged === 'false') {
        //ShowLoginModal();
        window.location.href=URLPATH+"LOGIN";
        return false;
    }

    if (typeCreator !== 'user') {
        SwaleError("Only general users are allowed to do this");
        return false;
    }

    let datas = AddReview.dataset;
    $("#boughtReview").val("");
    $("#text").val("");
    ModalReview.modal("show");
}



SaveReview.onclick = () => {
    // if (!CheckCaptcha())
    //     return false;
    let modal = SaveReview.dataset.id;
    block();

    let val = $("#text").val();
    let param = {
        text: val,
        program_id: $("#program_id").val(),
        
    };

    Fetching("program/addNewComment", param).then((data) => {

        unblock();
        CommentClass.SetToFirst();
        GetComments();
        $("#" + modal).modal("hide")
    })
}

SaveReply.onclick = () => {
    // if (!CheckCaptcha())
    //     return false;

    let type_user = $("#type_creator").val();
    let modal = SaveReply.dataset.id;
    block();

    let val = $("#textR").val();

    let param = {
        text: val,
        program_id: $("#program_id").val(),
        on_creator_type: $("#on_creator_type").val(),
    };
    let on_comment_id = $("#on_comment_id").val();
    let on_creator_id = $("#on_creator_id").val();
    if (on_comment_id !== '') {
        param['on_comment_id'] = on_comment_id;
    }

    if (on_creator_id !== '') {
        param['on_creator_id'] = on_creator_id;
    }

    let urls = "program/addReplyComment";
    if (type_user === "business") {
        urls = "program/addReplyCommentBusiness";
        param['creator_type'] = typeCreator;
    }

    Fetching(urls, param).then((data) => {
        unblock();
        CommentClass.SetToFirst();
        GetComments()
        $("#" + modal).modal("hide")
    })
}


const GetComments=()=>{
    CommentClass.showComment("program/getComment", { program_id:$("#program_id").val() },AfterGetComment);
}
const AfterGetComment=(data, existC) => {
    DivComment.innerHTML=CommentClass.showCommentData(data.data.data,Logged);
    CommentClass.SetBtnAddComment(CommentClass.AddReplyOnComment, AddLikeOnComment, RemoveLikeOnComment)
    let total = data.data.total;
    $("#number_comment").html(numberFormat(total))
    if (total - existC > 0) {
        LoadMoreComment.style.display = "";
    } else {
        LoadMoreComment.style.display = "none";
    }
};

const AddLikeOnComment=(e)=>{
    let data = e.currentTarget.dataset;
    let id = data.id;
    let div = $("#like_" + id);
    let divNumber = $("#like_number_" + id);
    let params={ idSearch: id, creator_type: $("#type_creator").val() };
    CommentClass.AddLikeOnComment(id,"program/addNewCommentLike",params,CommentClass.SetBtnAddComment,div,divNumber);
    CommentClass.SetBtnAddComment(CommentClass.AddReplyOnComment, AddLikeOnComment, RemoveLikeOnComment)

}
const RemoveLikeOnComment=(e)=>{
    let data = e.currentTarget.dataset;
    let id = data.id;
    let div = $("#like_" + id);
    let divNumber = $("#like_number_" + id);
    let params={ idSearch: id, creator_type: $("#type_creator").val() };
    CommentClass.AddLikeOnComment(id,"program/removeCommentLike",params,CommentClass.SetBtnAddComment,div,divNumber);
    CommentClass.SetBtnAddComment(CommentClass.AddReplyOnComment, AddLikeOnComment, RemoveLikeOnComment)

}

if(LoadMoreComment !==null)
{
    LoadMoreComment.onclick = () => {

        GetComments();
    }
}

if (SortBtn !== null) {
    SortBtn.onclick = () => {
        let value = $("#orders_by").val().split(",");
        CommentClass.SetToFirst();
        CommentClass.SetOrder(value[0],value[1]);
        GetComments()
    }
}

GetComments();






