import { URL, URLPATH, URLUSERFILE, VIEWURL } from "./Setting.js";

export const JustCreateOptionSelect = (data, id, param) => {
  let select = $("#" + id);
  select.html("");
  select.append('<option value=""> ...</option>');
  for (let i = 0; i < data.length; i++) {
    select.append(
      '<option value="' +
        data[i][param.value] +
        '">' +
        data[i][param.title] +
        "</option>"
    );
  }
};

export function CreateSelectOption(
  param,
  ids,
  values = "",
  trigger_change = false,
  fun = () => {}
) {
  fetch(param.url, {
    method: "post",
    // withCredentials: true,
    credentials: "include",
    body: JSON.stringify(param.params),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((datas) => {
      if (datas.status === "true") {
        let select = $("#" + ids.id);
        select.html("");
        select.append('<option value=""> Choose one </option>');
        let data = datas.data.data;
        for (let i = 0; i < data.length; i++) {
          if (values !== "" && data[i][ids.value] == values) {
            select.append(
              '<option selected value="' +
                data[i][ids.value] +
                '">' +
                data[i][ids.title] +
                "</option>"
            );
          } else
            select.append(
              '<option value="' +
                data[i][ids.value] +
                '">' +
                data[i][ids.title] +
                "</option>"
            );
        }

        if (trigger_change) {
          select.trigger("change");
        }
      }
      fun();
    });
}

export function CreateSelectOptionMultiValue(
  param,
  ids,
  values = "",
  trigger_change = false,
  fun = () => {}
) {
  fetch(param.url, {
    method: "post",
    // withCredentials: true,
    credentials: "include",
    body: JSON.stringify(param.params),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((datas) => {
      if (datas.status === "true") {
        let select = $("#" + ids.id);
        select.html("");
        select.append('<option value=""> Choose one </option>');
        let data = datas.data.data;
        for (let i = 0; i < data.length; i++) {
          if (values !== "" && data[i][ids.value] == values) {
            select.append(
              '<option selected value="' +
                data[i][ids.value] +
                '">' +
                data[i][ids.title] +
                "</option>"
            );
          } else {
              
            let AllV = [];
            let v = ids.value.split(",");
            v.forEach((d) => {
              AllV.push(data[i][d]);
            });
            select.append(
              '<option value="' +
              AllV.toString() +
                '">' +
                data[i][ids.title] +
                "</option>"
            );
          }
        }

        if (trigger_change) {
          select.trigger("change");
        }
      }
      fun();
    });
}

export function CreateSelectOptionClass(param, ids, classes) {
  fetch(param.url, {
    method: "post",
    // withCredentials: true,
    credentials: "include",
    body: JSON.stringify(param.params),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((datas) => {
      if (datas.status === "true") {
        let data = datas.data.data;
        JustCreateOptionSelectClass(data, classes, {
          value: ids.value,
          title: ids.title,
        });
      }
    });
}

export const JustCreateOptionSelectClass = (data, classess, param) => {
  let select = $("." + classess);

  for (let j = 0; j < select.length; j++) {
    let str = "";
    select[j].innerHTML = "";
    str += '<option value=""> ...</option>';
    for (let i = 0; i < data.length; i++) {
      str +=
        '<option value="' +
        data[i][param.value] +
        '">' +
        data[i][param.title] +
        "</option>";
    }
    select[j].innerHTML = str;
  }
};

export const CheckUserLogin = (callBack = () => {}) => {
  Fetching("userCheckForLogin", {}).then((data) => callBack(data));
};

export const GetUserOnlineInfoAuto = (type = "user") => {
  return fetch(URLPATH + "UserAction/getOnlineUserDataType", {
    method: "post",
    // withCredentials: true,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((datas) => {
      if (type === "user") {
        SetImageProfTeam(datas.data[0]);
      }

      if (type === "business") {
        SetImageProfBusiness(datas.data[0]);
      }

      if (type === "professional") {
        SetImageProfTeam(datas.data[0]);
      }

      return datas;
    });
};

export const GetUserOnlineInfo = () => {
  return fetch(URLPATH + "UserAction/getOnlineUserData", {
    method: "post",
    // withCredentials: true,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((datas) => {
      SetImageProfTeam(datas.data[0]);
      return datas;
    });
};

export const GetBusinessUserOnlineInfo = () => {
  return fetch(URLPATH + "UserAction/getOnlineBusinessUserData", {
    method: "post",
    // withCredentials: true,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((datas) => {
      SetImageProfBusiness(datas.data[0]);
      return datas;
    });
};

export const GetProfessionalUserOnlineInfo = () => {
  return fetch(URLPATH + "UserAction/getOnlineBusinessUserDataProfessional", {
    method: "post",
    // withCredentials: true,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((datas) => {
      SetImageProfTeam(datas.data[0]);
      return datas;
    });
};

export const GetTeamUserOnlineInfo = () => {
  return fetch(URLPATH + "UserAction/getOnlineTeamUserData", {
    method: "post",
    // withCredentials: true,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((datas) => {
      SetImageProfTeam(datas.data[0]);
      return datas;
    });
};

export const SetImageProf = (data) => {
  if (data === undefined) return false;

  let divProfImage = $(".user-image-prof");
  let divProfBanner = $(".user-banner-prof");
  let divProfBannerSmall = $(".user-banner-prof-small");

  let defproof = "user.png";
  let defbanner = "default-banner.jpg";
  let src1 = URLPATH + VIEWURL + "imgs/" + defproof;
  let src2 = URLPATH + VIEWURL + "imgs/" + defbanner;
  let src3 = URLPATH + VIEWURL + "imgs/" + defbanner;

  if (data.image !== "" && data.image !== null) {
    src1 = URLUSERFILE + data.id + "/profile/image/small/" + data.image;
  }
  if (data.banner !== "" && data.banner !== null) {
    src2 = URLUSERFILE + data.id + "/profile/banner/thumb/" + data.banner;
    src3 = URLUSERFILE + data.id + "/profile/banner/small/" + data.banner;
  }

  let img1 =
    "<img src='" + src1 + "' class='' alt='user profile'>";
  let img2 =
    "<img src='" + src2 + "' class='rounded-3 mt-5' alt='user banner'>";
  let img3 = "<img src='" + src3 + "' class='rounded-3 ' alt='user banner'>";
  divProfImage.html(img1);
  divProfBanner.html(img2);
  divProfBannerSmall.html(img3);
};

export const SetImageProfBusiness = (data) => {
  if (data === undefined) return false;

  let divProfImage = $(".user-image-prof");
  let divProfBanner = $(".user-banner-prof");
  let divProfBannerSmall = $(".user-banner-prof-small");

  let defproof = "logo.png";
  let defbanner = "default-banner.jpg";
  let src1 = URLPATH + VIEWURL + "imgs/" + defproof;
  let src2 = URLPATH + VIEWURL + "imgs/" + defbanner;
  let src3 = URLPATH + VIEWURL + "imgs/" + defbanner;

  if (data.file_url !== "" && data.file_url !== null) {
    src1 = URL + data.file_url + "/small/" + data.file_name;
  }
  if (data.banner_file_url !== "" && data.banner_file_url !== null) {
    src2 = URL + data.banner_file_url + "/thumb/" + data.banner_file_name;
    src3 = URL + data.banner_file_url + "/small/" + data.banner_file_name;
  }

  let img1 =
    "<img src='" + src1 + "' class='' alt='user profile'>";
  let img2 =
    "<img src='" + src2 + "' class='rounded-3 mt-5' alt='user banner'>";
  let img3 = "<img src='" + src3 + "' class='rounded-3 ' alt='user banner'>";
  divProfImage.html(img1);
  divProfBanner.html(img2);
  divProfBannerSmall.html(img3);
};

export const SetImageProfTeam = (data) => {
  if (data === undefined) return false;

  let divProfImage = $(".user-image-prof");
  let divProfBanner = $(".user-banner-prof");
  let divProfBannerSmall = $(".user-banner-prof-small");

  let defproof = "user.png";
  let defbanner = "default-banner.jpg";

  let src1 = URLPATH + VIEWURL + "imgs/" + defproof;
  let src2 = URLPATH + VIEWURL + "imgs/" + defbanner;
  let src3 = URLPATH + VIEWURL + "imgs/" + defbanner;

  if (data.file_url !== "" && data.file_url !== null) {
    src1 = URL + data.file_url + "/small/" + data.file_name;
  }

  if (data.banner_file_url !== "" && data.banner_file_url !== null) {
    src2 = URL + data.banner_file_url + "/thumb/" + data.banner_file_name;
    src3 = URL + data.banner_file_url + "/small/" + data.banner_file_name;
  }

  let img1 =
    "<img src='" + src1 + "' class='' alt='team profile'>";
  let img2 =
    "<img src='" + src2 + "' class='rounded-3 mt-5' alt='user banner'>";
  let img3 = "<img src='" + src3 + "' class='rounded-3 ' alt='user banner'>";
  divProfImage.html(img1);
  divProfBanner.html(img2);
  divProfBannerSmall.html(img3);
};

export const Fetching = (url, body) => {
  return fetch(URLPATH + url, {
    method: "post",
    // withCredentials: true,
    credentials: "include",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((datas) => {
      return datas;
    });
};

export const FetchingFile = (url, body) => {
  return fetch(URLPATH + url, {
    method: "post",
    // withCredentials: true,
    credentials: "include",
    body: body,
    headers: {
      //'Content-Type': 'multipart/form-data'
    },
  })
    .then((res) => res.json())
    .then((datas) => {
      return datas;
    });
};


export const SetCooke = (token,name="") => {
  let d = new Date();
  d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie =name + "=" + token + ";" + expires + ";path=/";
};

export const RemoveCooke = (cname) => {
  document.cookie =
  cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

export const getCookie = (cname = "") => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
};

export const AddLoginUrl=()=>{
  let  url = location.href;
  localStorage.setItem("urlLogout", url);
}