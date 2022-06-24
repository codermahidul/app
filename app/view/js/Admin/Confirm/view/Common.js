export const Reset=(CategoryBox,callback=()=>{})=>{
    CategoryBox.innerHTML = "";
    $("#idSearchs").val("")
    $("#titlese").val("")
    $("#fname").val("")
    $("#lname").val("")
    $("#email").val("")
    $("#created_at_from").val("")
    $("#created_at_to").val("")
    $("#admin_confirm").val("")
    $("#trash").val("0")
    $("#categorys_id").val("");
    $("#orderser").val("");
    callback();
}

export const ResetWithoutCategory=(callback=()=>{})=>{

    $("#idSearchs").val("")
    $("#titlese").val("")
    $("#fname").val("")
    $("#lname").val("")
    $("#email").val("")
    $("#created_at_from").val("")
    $("#created_at_to").val("")
    $("#admin_confirm").val("")
    $("#trash").val("0")
    $("#orderser").val("");
    $("#display_name_search").val("");
    callback();
}

export const Reset2=(CategoryBox,callback=()=>{})=>{
    CategoryBox.innerHTML = "";
    $("#idSearchs").val("")
    $("#titlese").val("")
    $("#fname").val("")
    $("#lname").val("")
    $("#email").val("")
    $("#created_at_from").val("")
    $("#created_at_to").val("")
    $("#admin_confirm").val("")
    $("#trashSearch").val("")
    $("#categorys_id").val("");
    callback();
}

export const ResetUser=(callback=()=>{})=>{
    $("#idSearchs").val("")
    $("#fname").val("")
    $("#lname").val("")
    $("#email").val("")
    $("#telephone").val("")
    $("#created_at_from").val("")
    $("#created_at_to").val("")
    $("#trash").val("")

    callback();
}


export const ResetProof=(callback=()=>{})=>{
    $("#idSearchs").val("")
    $("#titles").val("")
    $("#types").val("")
    callback();
}