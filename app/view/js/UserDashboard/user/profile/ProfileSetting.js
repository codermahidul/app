import {
  fileInput,
  fileInputCleare,
  onlyUnique,
  SendDataForm,
  tokenizAjax,
  tokenizClear,
} from "../../../functions/Common.js";
import {
  GetUserOnlineInfo,
  FetchingFile,
  Fetching,
} from "../../../Fetch/Common.js";
import { block, unblock } from "../../../functions/Block.js";
import { SwalRemoveFetch } from "../../../functions/SwalDelete.js";
import { ShowSkill } from "./ProfileShows.js";
let MoreCategoryC = await import(
  "../../../Class/MoreCategoryInOnePage.js?v=" + Date.now()
);

const BtnPass = document.getElementById("btnpass");
const btnimage = document.getElementById("btnimage");
const btnbanner = document.getElementById("btnbanner");
const btndeleteimage = document.getElementById("btndeleteimage");
const btndeletebanner = document.getElementById("btndeletebanner");
const BtnemailNote = document.getElementById("btnemailNote");
const lpass = document.getElementById("lpass");
const newpass = document.getElementById("newpass");
const rpass = document.getElementById("rpass");
const btninterest = document.getElementById("btninterest");
const AddMoreCat = document.getElementById("add_more_cat");
const ResetCat = document.getElementById("reset_cat");

const AddMoreCatC = document.getElementById("add_more_cat_coupon");
const ResetCatC = document.getElementById("reset_cat_Coupon");

const MoreCategory = MoreCategoryC.MoreCategoryInOnePage;
const MoreCategory2 = MoreCategoryC.MoreCategoryInOnePage;

const MoreCategories = new MoreCategory("product");
const MoreCategoriesCoupon = new MoreCategory2("coupon");

const BtnNewNote = document.getElementById("btnNewNote");

window.idOnline = 0;

BtnPass.onclick = () => {
  SendDataForm(
    BtnPass,
    "frmpssword",
    "userBusinessAction/changePass",
    [newpass],
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

btndeleteimage.onclick = () => {
  SwalRemoveFetch("userAction/removeImageBusiness", {}, GetDatas);
};

btndeletebanner.onclick = () => {
  SwalRemoveFetch("userAction/removeBannerBusiness", {}, GetDatas);
};

BtnemailNote.onclick = () => {
  block();
  let datas = [];
  $('input[name="send_email"]:checked').each(function () {
    let data = this.value;
    datas.push(data);
  });

  Fetching("useraction/setemailnote", { ids: JSON.stringify(datas) }).then(
    (data) => {
      unblock();
      window.location.reload();
    }
  );
};

const GetDatas = () => {
  block();
  GetUserOnlineInfo().then((data) => {
    unblock();
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
  });
};

GetDatas();

setTimeout(() => {
  fileInput("fileinputs");
}, 1000);
tokenizAjax(
  "tokenize",
  false,
  "fetchData/proof_get",
  { type: "skill" },
  "title"
);

AddMoreCat.onclick = () => {
  MoreCategories.AddCategoryInput($("#more_cat_Product"));
};

ResetCat.onclick = () => {
  MoreCategories.RemoveCategoryInput("more_cat_Product");
  MoreCategories.ResetMoreCat();
  AddMoreCat.click();
};

AddMoreCatC.onclick = () => {
  MoreCategoriesCoupon.AddCategoryInput($("#more_cat_Coupon"));
};

ResetCatC.onclick = () => {
  MoreCategoriesCoupon.RemoveCategoryInput("more_cat_Coupon");
  MoreCategoriesCoupon.ResetMoreCat();
  AddMoreCatC.click();
};

BtnNewNote.onclick = () => {
  let productCat = MoreCategories.GetCatId()
    .toString()
    .split(",")
    .filter(onlyUnique)
    .filter((n) => n);
  productCat = productCat.toString().split(",");
  let pr = [];
  for (let i = 0; i < productCat.length; i++) {
    pr.push({ category_id: productCat[i], type: "product" });
  }

  let CouponCat = MoreCategoriesCoupon.GetCatId()
    .toString()
    .split(",")
    .filter(onlyUnique)
    .filter((n) => n);
  CouponCat = CouponCat.toString().split(",");
  let cou = [];
  for (let i = 0; i < CouponCat.length; i++) {
    cou.push({ category_id: CouponCat[i], type: "coupon" });
  }
  let item = [...pr, ...cou];

  block();
  Fetching("userBusinessAction/updateNoteNew", {
    item: JSON.stringify(item),
  }).then((data) => {
    unblock();
    if (data.status === "true") {
      toast("successful", "success");
    } else {
      toast(data.err, "error");
    }
  });
};

const GetDataCategory = () => {
  Fetching("userBusinessAction/getNoteNew", {}).then((data) => {
    let d = data.data;
    d.forEach((dd) => {
      if (dd.type === "product") {
        MoreCategories.ShowEditCat(dd.category_id, [], $("#more_cat_Product"));
      }
      if (dd.type === "coupon") {
        MoreCategoriesCoupon.ShowEditCat(
          dd.category_id,
          [],
          $("#more_cat_Coupon")
        );
      }
    });
    if (d.length <= 0) {
      if ($("#more_cat_Product").length > 0)
        MoreCategories.AddCategoryInput($("#more_cat_Product"));

      if ($("#more_cat_Coupon").length > 0)
        MoreCategoriesCoupon.AddCategoryInput($("#more_cat_Coupon"));
    }
  });
};

GetDataCategory();
