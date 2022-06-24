import '../Home.js';

let Common = await import("../../Fetch/Common.js?v=" + Date.now());
let FunctionsSwal = await import("../../functions/SwalDelete.js?v=" + Date.now());
let FunctionsBlock = await import("../../functions/Block.js?v=" + Date.now());
let Setting = await import("../../Fetch/Setting.js?v=" + Date.now());
let NumberFunctions = await import("../../functions/numberFormat.js?v=" + Date.now());
let Comments = await import('../../Class/Comment.js?v=' + Date.now());
let CheckedS = await import('../../functions/Checked.js?v=' + Date.now());

const numberFormat = NumberFunctions.numberFormat;
const Comment = Comments.Comment;
const URLPATH = Setting.URLPATH;
const Fetching = Common.Fetching;
const block = FunctionsBlock.block;
const unblock = FunctionsBlock.unblock;
const SwaleError = FunctionsSwal.SwaleError;
const CheckCaptcha = CheckedS.CheckCaptcha;

const AddRate = document.getElementById("btnRate");
const ModalRate = $("#modalRate");
const SaveRate = document.getElementById("saveRate");
const RateForm = document.getElementById("frmNewRate");

const typeCreator = document.getElementById("type_creator").value;
const Logged = document.getElementById("logged").value;
const AddReview = document.getElementById("btnReview");
const ModalReview = $("#modalReview");
const SaveReview = document.getElementById("addReview");
const SaveReply = document.getElementById("addReply");
const LoadMoreComment = document.getElementById("LoadMoreComment");
const DivComment = document.getElementById("comments");
const SortBtn = document.getElementById("sortBtn");
const AddToFollow = document.getElementById("AddToFollow");
const UnFollowBtn = document.getElementById("UnFollowBtn");

const CommentClass = new Comment();

let ids = [];

if (AddReview !== null) {
    AddReview.onclick = () => {

        if (Logged === 'false') {
            //ShowLoginModal();
            window.location.href = URLPATH + "LOGIN";
            AddLoginUrl();

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

}


if (SaveReview !== null) {
    SaveReview.onclick = () => {
        // if (!CheckCaptcha())
        //     return false;
        let modal = SaveReview.dataset.id;
        block();

        let val = $("#text").val();
        let param = {
            text: val,
            user_business_id: $("#user_business_id").val(),

        };

        Fetching("userAction/addNewComment", param).then((data) => {

            unblock();
            CommentClass.SetToFirst();
            GetComments();
            $("#" + modal).modal("hide")
        })
    }
}

if (SaveReply !== null) {
    SaveReply.onclick = () => {
        // if (!CheckCaptcha())
        //     return false;

        let type_user = $("#type_creator").val();
        let modal = SaveReply.dataset.id;
        block();

        let val = $("#textR").val();

        let param = {
            text: val,
            user_business_id: $("#user_business_id").val(),
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

        let urls = "userAction/addReplyComment";
        if (type_user === "business") {
            urls = "userAction/addReplyCommentBusiness";
            param['creator_type'] = typeCreator;
        }

        Fetching(urls, param).then((data) => {
            unblock();
            CommentClass.SetToFirst();
            GetComments()
            $("#" + modal).modal("hide")
        })
    }
}


if (AddRate !== null) {
    AddRate.onclick = () => {
        if (Logged === 'false') {
            AddLoginUrl();

           // ShowLoginModal();
           window.location.href=URLPATH+"LOGIN";

            return false;
        }

        if (typeCreator !== 'user') {
            SwaleError("Only general users are allowed to do this");
            return false;
        }
        let datas = AddRate.dataset;
        let category_id = datas.cat;


        block();
        Fetching("category/getQuestions", { category_id }).then((data) => {
            unblock();
            ModalRate.modal("show");
            ShowQuestions(data);
        })

    }
}


const ShowQuestions = (data) => {

    RateForm.innerHTML = "";
    ids = [];
    let datas = data.data.data;
    let str = "";

    datas.forEach(d => {
        str += '<div class="mb-3 row">';
        str += '<div class="col-md-12"><label for="recipient-name" class="col-form-label">' + d.text + '</label></div>';
        str += '<div class="col-md-12">';
        str += CreateStar(d.id);
        str += '</div>';
        str += '</div>';

        ids.push(d.id)
    });

    RateForm.innerHTML = str;

}
const CreateStar = (id) => {
    let str = "";
    str += '<div class="rate">';
    str += '<input class="question" type="radio" id="star5_' + id + '" name="rate' + id + '" value="5" />';
    str += '<label for="star5_' + id + '" title="text">5 stars</label>';
    str += '<input class="question" type="radio" id="star4_' + id + '" name="rate' + id + '" value="4" />';
    str += '<label for="star4_' + id + '" title="text">4 stars</label>';
    str += '<input class="question" type="radio" id="star3_' + id + '" name="rate' + id + '" value="3" />';
    str += '<label for="star3_' + id + '" title="text">3 stars</label>';
    str += '<input class="question" type="radio" id="star2_' + id + '" name="rate' + id + '" value="2" />';
    str += '<label for="star2_' + id + '" title="text">2 stars</label>';
    str += '<input class="question" type="radio" id="star1_' + id + '" name="rate' + id + '" value="1" />';
    str += '<label for="star1_' + id + '" title="text">1 star</label>';
    str += '</div>';

    return str;
}

if (SaveRate !== null) {
    SaveRate.onclick = () => {

        // if (!CheckCaptcha())
        // return false;



        let questions = [];


        for (let i = 0; i < ids.length; i++) {
            questions.push({ question_id: ids[i], rate: $('input[name="rate' + ids[i] + '"]:checked').val() });
        }

        let formData = {
            questions: JSON.stringify(questions),
            user_business_id: $("#user_business_id").val()
        };

        block();
        Fetching("userAction/rate", formData).then((data) => {
            unblock();
            if (data.status == "true") {
                toast("successfully", "successful")
                ModalRate.modal("hide");
            } else {
                toast(data.err, "error");
            }
        })


    }
}

const GetComments = () => {
    CommentClass.showComment("userAction/getComment", { user_business_id: $("#user_business_id").val() }, AfterGetComment);
}
const AfterGetComment = (data, existC) => {

    if (DivComment !== null) {
        DivComment.innerHTML = CommentClass.showCommentData(data.data.data, Logged);
        CommentClass.SetBtnAddComment(CommentClass.AddReplyOnComment, AddLikeOnComment, RemoveLikeOnComment)
        let total = data.data.total;
        $("#number_comment").html(numberFormat(total))
        if (total - existC > 0) {
            LoadMoreComment.style.display = "";
        } else {
            LoadMoreComment.style.display = "none";
        }
    }

};

const AddLikeOnComment = (e) => {
    let data = e.currentTarget.dataset;
    let id = data.id;
    let div = $("#like_" + id);
    let divNumber = $("#like_number_" + id);
    let params = { idSearch: id, creator_type: $("#type_creator").val() };
    CommentClass.AddLikeOnComment(id, "userAction/addNewCommentLike", params, CommentClass.SetBtnAddComment, div, divNumber);
    CommentClass.SetBtnAddComment(CommentClass.AddReplyOnComment, AddLikeOnComment, RemoveLikeOnComment)

}
const RemoveLikeOnComment = (e) => {
    let data = e.currentTarget.dataset;
    let id = data.id;
    let div = $("#like_" + id);
    let divNumber = $("#like_number_" + id);
    let params = { idSearch: id, creator_type: $("#type_creator").val() };
    CommentClass.AddLikeOnComment(id, "userAction/removeCommentLike", params, CommentClass.SetBtnAddComment, div, divNumber);
    CommentClass.SetBtnAddComment(CommentClass.AddReplyOnComment, AddLikeOnComment, RemoveLikeOnComment)

}

if (LoadMoreComment !== null) {
    LoadMoreComment.onclick = () => {

        GetComments();
    }
}

if (SortBtn !== null) {
    SortBtn.onclick = () => {
        let value = $("#orders_by").val().split(",");
        CommentClass.SetToFirst();
        CommentClass.SetOrder(value[0], value[1]);
        GetComments()
    }
}

if (AddToFollow !== null) {
    AddToFollow.onclick = () => {
        let type_responder = "userBusiness";
        if ($("#user_business_type").val() === "professional") {
            type_responder = "userProfessional";
        }
        Fetching("userBusinessAction/requestFollow", {
            user_responder: $("#user_business_id").val(),
            type_responder
        }).then((data) => {
             window.location.reload();
        })
    }

}


if (UnFollowBtn !== null) {
    UnFollowBtn.onclick = () => {
        let user_responder = UnFollowBtn.dataset.id;
        Fetching("userBusinessAction/unfollow", {
            user_responder
        }).then((data) => {
            window.location.reload();
        })
    }

}

GetComments();






