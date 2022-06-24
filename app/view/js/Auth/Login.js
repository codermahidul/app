import checkValue, { CheckCaptcha } from "../functions/Checked.js";

import { Fetching } from "../Fetch/Common.js";

const btn = document.getElementById("btnLogin");
const email = document.getElementById("email");
const password = document.getElementById("password");

const RegisterCheck = () => {
  if (!checkValue(email)) return false;

  if (!checkValue(password)) return false;

  return true;
};

btn.onclick = () => {
  if (!CheckCaptcha()) return false;

  btn.disabled = true;

  if (!RegisterCheck()) {
    btn.disabled = false;
    return 0;
  }

  Fetching("userAction/login", {
    email: email.value,
    password: password.value,
  }).then((data) => {
    btn.disabled = false;
    if (data.status === "true") {
      toast("successful", "success");
      setTimeout(() => {
        if (localStorage.getItem("urlLogout") !== null) {
          window.location.replace(localStorage.getItem("urlLogout"));
          localStorage.removeItem(localStorage.getItem("urlLogout"));
        } else window.location.replace(data.href);
      }, 1000);
    } else {
      toast(data.err, "error");
    }
  });
};
