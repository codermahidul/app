import checkValue from '../functions/Checked.js';
const btn = document.getElementById("btnLogin");
const username = document.getElementById("username");
const password = document.getElementById("password");


const RegisterCheck = () => {
    
    if (!checkValue(username))
        return false;
        
    if (!checkValue(password))
        return false;

    return true;
}


btn.onclick = () => {
    
    btn.disabled = true;
    if (!RegisterCheck()) {
        btn.disabled = false;
        return 0;
    }


    $.ajax({
        url: "useradmin/login",
        type: "post",
        data: {
            username: username.value,
            password: password.value
        },
        success: (data) => {
            btn.disabled = false;
            let datas = JSON.parse(data);
            if (datas.status === "true") {
                toast("successful", "success");
                setTimeout(()=>{
                  window.location.replace("AdminDashboard");
                },1000)
            } else {
                toast(datas.err, "error");
            }
        }

    })
}
