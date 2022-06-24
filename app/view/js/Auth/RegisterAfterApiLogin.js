import checkValue, { CheckCaptcha } from '../functions/Checked.js';

const btn = document.getElementById("btnRegister");
const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rpassword = document.getElementById("rpassword");
const Type = document.getElementById("type");

const RegisterCheck = () => {
    if (!checkValue(name))
        return false;

    if (!checkValue(email))
        return false;

    if (!checkValue(Type))
        return false;

    if (!checkValue(password))
        return false;

    if (!checkValue(rpassword))
        return false;

    return true;
}

const check_pass_repass = () => {
    if (password.value !== rpassword.value) {
        toast("password and reapet password is not equal", "error")
        return false;
    }
    return true;
}
if(btn !==null){
    btn.onclick = () => {
        if (!CheckCaptcha())
            return false;
        btn.disabled = true;
        if (!RegisterCheck()) {
            btn.disabled = false;
            return 0;
        }
    
        if (!check_pass_repass()) {
            btn.disabled = false;
            return 0;
        }
    
        $.ajax({
            url: "UserAction/newBusinessUser",
            type: "post",
            data: {
                name: name.value,
                email: email.value,
                password: password.value,
                type: Type.value,
                verify:1,
            },
            success: (data) => {
                
                btn.disabled = false;
                let datas = JSON.parse(data);
                if (datas.status === "true") {
                    toast("Your registration was successful, an email was sent to you. You do not need an answer and you do not need a verifier", "success");
                    setTimeout(() => {
                        window.location.replace("Login");
                    }, 1000)
                } else {
                    toast(datas.err, "error");
                }
            }
    
        })
    }
}

