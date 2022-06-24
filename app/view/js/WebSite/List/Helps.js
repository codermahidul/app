import {
  Reset,
  ResetWithoutCategory,
} from "../../Admin/Confirm/view/Common.js";
import { URL, URLPATH, VIEWURL } from "../../Fetch/Setting.js";
import { block, unblock } from "../../functions/Block.js";

import { Fetching } from "../../Fetch/Common.js";
import { checkNull } from "../../functions/Common.js";

const DivShow = $("#dataList");
const BtnLoad = document.getElementById("BtnnLoad");

const ResetBtn = document.getElementById("resetbtn");
const SearchBtn = document.getElementsByClassName("SearchBtn");
const SortCombo =document.getElementsByClassName("orderCl");
let exist = 30;
let start = 30;
let number = "30";
let continueGet = true;
let category='';
let idNotIn = $("#idNotIn").val();

const getData = () => {
  block();
  let param = {
    start: start.toString(),
    number,
  };

  if (category !== "") {

    param["category_id"] =  category;
  }

  Fetching("help/get", param).then((data) => {
    unblock();
    if (data.status === "true") {
      exist = exist + data.data.data.length;
      if (data.data.total - exist <= 0) {
        continueGet = false;
        if (BtnLoad !== null) BtnLoad.style.display = "none";
      }
      start = parseInt(start) + parseInt(start);
      ShowDataList(data.data.data);
    } else continueGet = false;
  });
};

if (BtnLoad !== null) {
  BtnLoad.onclick = () => {
    getData();
  };
}

const ShowDataList = (data) => {
  let str = "";
  data.forEach((d) => {
    let imgUrl = URLPATH + VIEWURL + "assets/imgs/blog/blog-1.png";
    if (d.file_url !== "" && d.file_url !== null) {
      imgUrl = URL + d.file_url + "/thumb/" + d.file_name;
    }
    let links = [];
    if (d.help_tag !== null) {
      links = d.help_tag.split(",");
    }
    str += ' <article class="wow fadeIn animated hover-up mb-30 animated row">';
    str +=
      ' <div class="post-thumb col-md-6" style="background-image: url(' +
      imgUrl +
      ');background-size: contain;background-repeat: no-repeat;">';
    str += '  <div class="entry-meta">';
    str += " </div>";
    str += " </div>";
    str += '<div class="entry-content-2 pl-50 col-md-6">';
    str += '  <h3 class="post-title mb-20">';
    str += "          <a>" + d.title + "</a>";
    str += "    </h3>";
    str += '  <p class="post-exerpt mb-40">' + d.descriptions + "</p>";

    links.forEach((l) => {
      let link = l.split("::");
      if (link[3] == "link") {
        str += '<div class="entry-meta meta-1 font-xs color-grey mt-10 p-10">';

        str += "    <div>";
        str +=
          '      <a href="' + link[2] + '" class="post-on">' + link[1] + "</a>";
        str += "   </div>";
        str += "   </div>";
      }
    });

    str += '<div class="row">';

    links.forEach((l) => {
      let link = l.split("::");
      if (link[3] == "video") {
        str += '<div class="col-md-6">';
        str += getYoutube(link[2]);
        str += "</div>";
      }
    });

    str += " </div>    ";

    str += "</div>";

    str += " </article>";
  });
  DivShow.append(str);
};

const ResetData = () => {
  DivShow[0].innerHTML = "";
  exist = 0;
  start = 0;
  getData();
};

for (let i = 0; i < SearchBtn.length; i++) {
  SearchBtn[i].onclick = () => {
    ResetData();
  };
}

const getYoutube = (video_link) => {
  let showV = "";
  let linkV = video_link.split("v=");
  if (linkV[1] != "") {
    showV = linkV[1];
  } else {
    linkV = video_link.split("be/");
    showV = linkV[1];
  }

  let str = '<div class="contain-iframe">';
  str +=
    '  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' +
    showV +
    '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" id="YoutubeVideo" allowfullscreen>';
  str += "</iframe>";
  str += "</div>";

  return str;
}


for(let i=0;i<SortCombo.length;i++)
{
    SortCombo[i].onclick=(e)=>{
        $(".sort-by").trigger("click");
        $(".sort-by").text('\n                                    Category:  '+e.currentTarget.text+'\n                                ');
        $(".orderCl").removeClass("active");
        SortCombo[i].classList.add("active");
        category=e.currentTarget.dataset.value;
        ResetData();
    }
}