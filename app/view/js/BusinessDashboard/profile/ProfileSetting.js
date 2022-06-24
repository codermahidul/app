import {
    checkNull,
  fileInput,
  fileInputCleare,
  SendDataForm,
  SendDataFormFile,
} from "../../functions/Common.js";
import {
  GetUserOnlineInfo,
  FetchingFile,
  Fetching,
  GetBusinessUserOnlineInfo,
  CreateSelectOption,
} from "../../Fetch/Common.js";
import { block, unblock } from "../../functions/Block.js";
import { SwalRemoveFetch } from "../../functions/SwalDelete.js";
import { URL, URLPATH } from "../../Fetch/Setting.js";

const btnbanner = document.getElementById("btnbanner");
const btnpass = document.getElementById("btnpass");
const lpass = document.getElementById("lpass");
const newpass = document.getElementById("newpass");
const rpass = document.getElementById("rpass");
const btnimage = document.getElementById("btnimage");
const btndeleteimage = document.getElementById("btndeleteimage");
const btndeletebanner = document.getElementById("btndeletebanner");
const BtnemailNote = document.getElementById("btnemailNote");
const BtnFile = document.getElementById("btnFile");

window.idOnline = 0;

btnpass.onclick = () => {
  SendDataForm(
    btnpass,
    "frmpssword",
    "useraction/changepassbusiness",
    [lpass, newpass, rpass],
    [],
    false
  );
};

btnimage.onclick = () => {
  if (document.getElementById("user_image").files.length == 0) {
    toast("no files selected", "error");

    return false;
  }

  block();
  let formData = new FormData();
  formData.append("img", $("#user_image")[0].files[0]);

  FetchingFile("useraction/businessimage", formData).then((data) => {
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

btndeleteimage.onclick = () => {
  SwalRemoveFetch("useraction/removeimagebusiness", {}, GetDatas);
};

const GetDatas = () => {
  block();
  GetBusinessUserOnlineInfo().then((data) => {
    idOnline = data.data[0].id;
    if (data.data[0].file_name !== "" && data.data[0].file_name !== null) {
      btndeleteimage.style.display = "block";
    } else {
      btndeleteimage.style.display = "none";
    }

    if (
      data.data[0].banner_file_name !== "" &&
      data.data[0].banner_file_name !== null
    ) {
      btndeletebanner.style.display = "block";
    } else {
      btndeletebanner.style.display = "none";
    }
    unblock();
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
  FetchingFile("useraction/businessbanner", formData).then((data) => {
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

btndeletebanner.onclick = () => {
  SwalRemoveFetch("useraction/removebannerbusiness", {}, GetDatas);
};

BtnemailNote.onclick = () => {
  block();
  let datas = [];
  $('input[name="send_email"]:checked').each(function () {
    let data = this.value;
    datas.push(data);
  });

  Fetching("useraction/setEmailNoteBusiness", {
    ids: JSON.stringify(datas),
  }).then((data) => {
    unblock();
    window.location.reload();
  });
};

const GetVerifyData = () => {
  const Div = document.getElementById("files");
  const DivPayment = document.getElementById("payment_verify");
  
  Div.innerHTML = "";
  

  Fetching("userBusinessAction/getMyVerifyFile", {}).then((data) => {
    let d = data.data.data;

    if(d.length>2)
    {
        DivPayment.style.display='block';
    }else
    {
        DivPayment.style.display='none'; 
    }
    let str = "";
    str += "";
    str += '<table class="table">';
    str += "<thead>";
    str += "<tr>";
    str += '<th scope="col">#</th>';
    str += ' <th scope="col">Type</th>';
    str += ' <th scope="col">Description</th>';
    str += ' <th scope="col">File</th>';
    str += '  <th scope="col">Remove</th>';
    str += " </tr>";
    str += "</thead>";
    str += " <tbody>";
    d.forEach((d, index) => {
      str += " <tr>";
      str += '   <th scope="row">' + (index+1) + "</th>";
      str += "  <td>" + d.type_name + "</td>";
      str += "  <td>" +checkNull(d.description)  + "</td>";
      str += "    <td><a href='" + URL + d.file_url + "/" + d.file_name + "'>"+d.file_name+"</a></td>";
      str +=
        '   <td><button data-id='+d.id+' class="btn btn-rmv"><i class="bi bi-trash text-danger"></i></td>';
      str += "  </tr>";
    });
    str += "  </tbody>";
    str += " </table>";

    Div.innerHTML = str;
    AfterCreateSrt();
  });
};

const AfterCreateSrt=()=>{
    let rmv=document.getElementsByClassName("btn-rmv");
    for(let i=0;i<rmv.length;i++)
    {
        rmv[i].onclick=(e)=>{

            let id=e.currentTarget.dataset.id
            RemoveFile(id);
        }
    }
}

BtnFile.onclick = () => {
  const type = document.getElementById("type");

  SendDataFormFile(
    BtnFile,
    "frmNewSetting",
    "userBusinessAction/addFileVerify",
    [type],
    [],
    false,
    () => {
      GetVerifyData();
    }
  );
};

const RemoveFile=(id)=>{
    SwalRemoveFetch("userBusinessAction/removeVerifyFile",{idSearch:id},GetVerifyData);
}

setTimeout(() => {
  fileInput("fileinputs");
  fileInput("fileInputsClime", "Drag & drop file here &hellip;", [
    "jpg",
    "png",
    "jpeg",
    "pdf",
    "doc",
    "docx",
  ]);
}, 1000);

GetDatas();
GetVerifyData();
CreateSelectOption(
  {
    url: URLPATH + "fetchData/proof_get",
    params: { type: "validBusinessFile" },
  },
  { id: "type", value: "id", title: "title" },
  false
);
