import checkValue, { CheckCaptcha } from '../functions/Checked.js';
const btn = document.getElementById("btnLogin");
const email = document.getElementById("email");
const password = document.getElementById("password");


const RegisterCheck = () => {
    
    if (!checkValue(email))
        return false;
        
    if (!checkValue(password))
        return false;

    return true;
}


btn.onclick = () => {
   
    if(!CheckCaptcha())
    return false;
    btn.disabled = true;
    if (!RegisterCheck()) {
        btn.disabled = false;
        return 0;
    }


    $.ajax({
        url: "UserAction/bussinesslogin",
        type: "post",
        data: {
            email: email.value,
            password: password.value
        },
        success: (data) => {
            btn.disabled = false;
            let datas = JSON.parse(data);
            if (datas.status === "true") {
                
                toast("successful", "success");
                setTimeout(()=>{
                    window.location.replace(datas.href);
                 //   window.location.replace("BusinessUserDashboard");
                },1000)
            } else {
                toast(datas.err, "error");
            }
        }

    })
}
