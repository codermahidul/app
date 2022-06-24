import { CheckCaptcha } from "../functions/Checked.js";
import { SendDataForm } from "../functions/Common.js";

const LoginModal=$("#modalLogin");
const BtnLogin = document.getElementById("btnLogin");
const email = document.getElementById("email");
const password = document.getElementById("password");


export const ShowLoginModal=()=>{
    LoginModal.modal("show");
}

const Refresh=()=>{
    window.location.reload()
}

BtnLogin.onclick=()=>{
    if (!CheckCaptcha())
    return false;
    SendDataForm(BtnLogin,"frmLogin","UserAction/loginFetch",[email,password],[],false,Refresh);
}