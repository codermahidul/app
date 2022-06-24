import '../Home.js';

import { EmptyCatId, GetBanner, checkNull } from '../../functions/Common.js';
import { EmptyIdsParent, EmptyParent, SetCatParam, fetchCat } from '../../functions/Category.js';
import { URL, URLPATH, VIEWURL } from '../../Fetch/Setting.js';
import { block, unblock } from '../../functions/Block.js';

import { Fetching } from '../../Fetch/Common.js';
import { Reset } from '../../Admin/Confirm/view/Common.js';

const DivShow = $("#dataList");
const BtnLoad = document.getElementById("BtnnLoad");
const CategoryBox = document.getElementById("category_id");
const ModalCat = $("#modalCategory");
const IDCatDiv = "category_data";
const TYPECat = "product";
const CatId = [];
const SerachBtn = document.getElementById("SerachBtn");
const ResetBtn = document.getElementById("resetbtn");
const SearchBtn = document.getElementsByClassName("SearchBtn");
const resetBtn = document.getElementsByClassName("resetBtn");
const SortCombo = document.getElementsByClassName("orderCl");

let exist = 30;
let start = 30;
let number = '30';
let continueGet = true;
let idNotIn = $("#idNotIn").val();
let orders = "";

const SetData = (data) => {

    EmptyCatId(CatId);
    $("#categorys_id").val(data.id)
    ModalCat.modal("hide");

    CategoryBox.innerHTML = data.name
}

SetCatParam(ModalCat, IDCatDiv, TYPECat, SetData);
if (CategoryBox !== null) {
    CategoryBox.onclick = () => {
        EmptyParent()
        EmptyIdsParent();
        fetchCat({ type: "product", parent: "0" }, "0");
    }
}




const ShowDataList = (data) => {

    let str = '';
    data.forEach(d => {

        let imgUrl = "";
        if (d.file_url !== "" && d.file_url !== null) {
            imgUrl = URL + d.file_url + '/small/' + d.file_name;
        } else {
            imgUrl = VIEWURL + "assets/imgs/shop/thumbnail-1.jpg";
        }

        let banner = "";
if (d.banner_file_url !== "" && d.banner_file_url !== null) {
    banner = URL + d.banner_file_url + '/small/' + d.banner_file_name;
} 

        let ad="";
        if(d.top_show_id)
        {
            ad+='<span class="text-success">Ad </span>';
        }



        str+='<div class=" col-md-3 col-12 col-sm-6  mb-30">';
        str += '<div class="product-cart-wrap">';
        str += '<div class="card card-user">';
         if(banner !==""){
            str += ' <div class="card-header" style="background-image: url('+banner+') !important; background-position: center;background-size: cover;">';
         }else{
            str += '<div class="card-header">';
             }  
            str += '      <img class="img-md img-avatar" src="'+imgUrl+'" alt="'+d.display_name +'">';
            str += ' </div>';
            str += '  <div class="card-body text-center">';
            str += '       <h5 class="card-title mt-50">'+ad+ d.display_name+'</h5>';
            str += '      <div class="card-text text-muted ">';
            str += '          <p>'+ checkNull(d.headline).substring(0, 100)+'</p>';
            str += '        <a href="'+ URLPATH+d.display_name_slug+'" class="btn btn-sm btn-brand rounded font-sm mt-15">View details</a>';
            str += '    </div>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            
        str += '</div>';


    });
    DivShow.append(str);
}



$('.select2').select2({
    placeholder: '',
    allowClear: true
});




const getData = () => {
    block();
    let param = {
        start: start.toString(),
        number,
        idNotIn,
        admin_confirm: "1",
        trash: "0"
    }

    if ($("#titles2").val() !== '') {
        param['display_name'] = $("#titles2").val();
    }

  



    if ($('input[name="type"]:checked').val() !== undefined) {

        param['type'] = $('input[name="type"]:checked').val();
    }

    if (orders !== "") {
        let data = orders.split(",");
        param["order"] = "deals." + data[0];
    
        param["order_type"] = data[1];
      }
      
    if ($("#display_name_slug").val() !== '') {
        param['display_name_slug'] = $("#display_name_slug").val()
    }

   

    Fetching("useraction/userBusinessGet", param).then((data) => {
        unblock();
        if (data.status === 'true') {

            exist = exist + data.data.data.length;
            if (data.data.total - exist <= 0) {
                continueGet = false;
                if (BtnLoad !== null)
                    BtnLoad.style.display = "none";
            }
            start = parseInt(start) + parseInt(start);
            ShowDataList(data.data.data);

            GetBanner(DivShow,"business");
        } else
            continueGet = false;

    })
}

if (SerachBtn !== null) {
    SerachBtn.onclick = () => {
        idNotIn = "";
        DivShow[0].innerHTML = "";
        exist = 0;
        start = 0;
        getData();
    }
}



if (ResetBtn !== null) {
    ResetBtn.onclick = () => {
        Reset(CategoryBox);

    }
}


if (BtnLoad !== null) {
    BtnLoad.onclick = () => {
        getData();
    }
}

const ResetData=()=>{
    idNotIn = "";
    DivShow[0].innerHTML = "";
    exist = 0;
    start = 0;
    getData();
}

for (let i = 0; i < SearchBtn.length; i++) {
    SearchBtn[i].onclick = () => {
        ResetData()
    }
}


for (let i = 0; i < resetBtn.length; i++) {
    resetBtn[i].onclick = () => {
        
        $(".category").html("");
        $("#orders2").val("");
        $("#orderser").val("");
        $("#categorys_id").val("");
        $("#catagories_id").val("");
        $("#titlese").val("");
        $("#titles2").val("");
        $('input[name=rate]').prop('checked',false);
        $('input[name=price]').prop('checked',false);
        $('input[name=orderPage]').prop('checked',false);
        
    }
}

for (let i = 0; i < SortCombo.length; i++) {
    SortCombo[i].onclick = (e) => {
      $(".sort-by").trigger("click");
      $(".sort-by").text(
        "\n                                    Sort by: The " +
          e.currentTarget.text +
          "\n                                "
      );
      $(".orderCl").removeClass("active");
      SortCombo[i].classList.add("active");
      orders = e.currentTarget.dataset.value;
      ResetData();
    };
  }



const SetTypeSearch = () => {
    let path = window.location.pathname;
    let paths = path.split("/");
    let slug = paths[(paths.length) - 1]
    if (slug !== 'Networks') {
        $("input[name=type][value='"+slug+"']").prop("checked",true);
        ResetData();
    }
}

SetTypeSearch()