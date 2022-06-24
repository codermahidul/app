import checkValue from '../functions/Checked.js';
const btn = document.getElementById("btnLogin");
const email = document.getElementById("email");
const password = document.getElementById("password");




btn.onclick = () => {
    
    btn.disabled = true;

    $.ajax({
        url: "userAction/teamLogin",
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
                  window.location.replace("TeamProfile");
                },1000)
            } else {
                toast(datas.err, "error");
            }
        }

    })
}
