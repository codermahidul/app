import checkValue, { CheckCaptcha } from '../functions/Checked.js';
const btn = document.getElementById("btnForgot");
const email = document.getElementById("email");


const DataCheck = () => {
    
    if (!checkValue(email))
        return false;
        

    return true;
}


btn.onclick = () => {
      
    if(!CheckCaptcha())
    return false;
    btn.disabled = true;
    if (!DataCheck()) {
        btn.disabled = false;
        return 0;
    }


    $.ajax({
        url: "useraction/businessforgotpassword",
        type: "post",
        data: {
            email: email.value,
        },
        success: (data) => {
            btn.disabled = false;
            let datas = JSON.parse(data);
            if (datas.status === "true") {
                toast("An email has been sent to you. Please also check the spam folder", "success");
              
            } else {
                toast(datas.err, "error");
            }
        }

    })
}
