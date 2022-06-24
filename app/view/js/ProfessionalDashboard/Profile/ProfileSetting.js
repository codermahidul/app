import {
  fileInput,
  fileInputCleare,
  SendDataForm,
  tokenizAjax,
  tokenizClear,
} from "../../functions/Common.js";
import {
  GetProfessionalUserOnlineInfo,
  FetchingFile,
  Fetching,
} from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";
import { GetInterest } from "./ProfileFetch.js";
import { ShowSkill } from "./ProfileShows.js";
import { URL } from "../../Fetch/Setting.js";

const btnPass = document.getElementById("btnPass");
const btnimage = document.getElementById("btnimage");
const btnbanner = document.getElementById("btnbanner");
const btndeleteimage = document.getElementById("btndeleteimage");
const btndeletebanner = document.getElementById("btndeletebanner");
const BtnemailNote = document.getElementById("btnemailNote");
const newPass = document.getElementById("newPass");
const btninterest = document.getElementById("btninterest");
const BtnResume = document.getElementById("btnResume");
const BtnDeleteResume=document.getElementById("btnDeleteResume");

window.idOnline = 0;

btnPass.onclick = () => {
  SendDataForm(
    btnPass,
    "frmPassword",
    "userBusinessAction/changePass",
    [newPass],
    [],
    false
  );
};

const RunAfterShows = () => {
  let skillremove = document.getElementsByClassName("remove-skill");

  for (let i = 0; i < skillremove.length; i++) {
    skillremove[i].onclick = (e) => {
      RemoveSkill(e);
    };
  }
};

btnimage.onclick = () => {
  if (document.getElementById("user_image").files.length == 0) {
    toast("no files selected", "error");

    return false;
  }

  block();
  let formData = new FormData();
  formData.append("img", $("#user_image")[0].files[0]);

  FetchingFile("userBusinessAction/image", formData).then((data) => {
    unblock();
    if (data.status === "true") {
      toast("successful", "success");
      fileInputCleare("user_image");
      GetDatas();
    } else {
      toast(data.err, "error");
    }
  });
};

BtnResume.onclick = () => {
  if (document.getElementById("user_resume_file").files.length == 0) {
    toast("no files selected", "error");

    return false;
  }
  block();
  let formData = new FormData();
  formData.append("pdf", $("#user_resume_file")[0].files[0]);

  FetchingFile("userBusinessAction/pdf", formData).then((data) => {
    unblock();
    if (data.status === "true") {
      toast("successful", "success");
      fileInputCleare("user_resume_file");
      GetDatas();
    } else {
      toast(data.err, "error");
    }
  });
};

btnbanner.onclick = () => {
  if (document.getElementById("user_banner").files.length == 0) {
    toast("no files selected", "error");

    return false;
  }

  block();
  let formData = new FormData();
  formData.append("img", $("#user_banner")[0].files[0]);
  FetchingFile("userBusinessAction/banner", formData).then((data) => {
    unblock();
    if (data.status === "true") {
      toast("successful", "success");
      fileInputCleare("user_banner");
      GetDatas();
    } else {
      toast(data.err, "error");
    }
  });
};

BtnDeleteResume.onclick=()=>{
    SwalRemoveFetch(
        "userBusinessAction/deleteMyResume",
        {  },
        GetDatas
      );
}

btndeleteimage.onclick = () => {
  SwalRemoveFetch(
    "userAction/removeImageBusiness",
    {  },
    GetDatas
  );
};

btndeletebanner.onclick = () => {
  SwalRemoveFetch(
    "userAction/removeBannerBusiness",
    {  },
    GetDatas
  );
};

btninterest.onclick = () => {
  let skills = $("#skills").val();
  if (skills.length <= 0) {
    toast("skill is empty", "error");
    return false;
  }
  let param = { user_id: window.idOnline };
  block();

  Fetching("userBusinessAction/addUserInterest", {
    skills: JSON.stringify(skills),
  }).then((data) => {
    GetInterest(param).then((data) => {
      ShowSkill(data.data.data);
      tokenizClear("tokenize");
      RunAfterShows();
      unblock();
    });
  });
};

BtnemailNote.onclick = () => {
  block();
  let datas = [];
  $('input[name="send_email"]:checked').each(function () {
    let data = this.value;
    datas.push(data);
  });

  Fetching("userBusinessAction/setEmailNote", {
    ids: JSON.stringify(datas),
  }).then((data) => {
    unblock();
    window.location.reload();
  });
};

const RemoveSkill = (event) => {
  let idSearch = event.currentTarget.dataset.id;
  Fetching("userBusinessAction/removeUserInterest", { idSearch }).then(
    (data) => {
      GetDatas();
    }
  );
};

const GetDatas = () => {
  block();
  GetProfessionalUserOnlineInfo().then((data) => {
    idOnline = data.data[0].id;
    if (data.data[0].file_url !== "" && data.data[0].file_url !== null) {
      btndeleteimage.style.display = "block";
    } else {
      btndeleteimage.style.display = "none";
    }

    if (
      data.data[0].banner_file_url !== "" &&
      data.data[0].banner_file_url !== null
    ) {
      btndeletebanner.style.display = "block";
    } else {
      btndeletebanner.style.display = "none";
    }
    if (
        data.data[0].resume_url !== "" &&
        data.data[0].resume_url !== null
      ) {
        BtnDeleteResume.style.display = "block";
        $("#resumeF").html('<a class="h1" href="'+URL+data.data[0].resume_url+'/'+data.data[0].resume_name+'"><i class="bi bi-file-earmark-pdf-fill text-danger"></i></a>')
      } else {
        BtnDeleteResume.style.display = "none";
        $("#resumeF").html('')
      }
    
    GetInterest({ user_id: idOnline }).then((data) => {
      ShowSkill(data.data.data);
      RunAfterShows();
      unblock();
    });
  });
};

GetDatas();

setTimeout(() => {
  fileInput("fileinputs");
  fileInput("fileInputResume", "Pdf File", ["pdf"]);
}, 1000);
tokenizAjax(
  "tokenize",
  false,
  "fetchData/proof_get",
  { type: "skill" },
  "title"
);
