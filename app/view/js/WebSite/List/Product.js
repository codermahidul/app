import '../Home.js';

import { EmptyCatId, GetBanner, SetEnterFun, checkNull, tokenizAjaxCity } from '../../functions/Common.js';
import { EmptyIdsParent, EmptyParent, SetCatParam, fetchCat } from '../../functions/Category.js';
import { URL, URLPATH, VIEWURL } from '../../Fetch/Setting.js';
import { block, unblock } from '../../functions/Block.js';

import { numberFormat } from '../../functions/numberFormat.js';

let FCommon=await import("../../Fetch/Common.js?v="+Date.now());

const Fetching=FCommon.Fetching;
const getCookie=FCommon.getCookie;


const DivShow = $("#dataList");
const BtnLoad = document.getElementById("BtnnLoad");
const CategoryBox = document.getElementById("category_id");
const categories = document.getElementsByClassName("category");

const ModalCat = $("#modalCategory");
const IDCatDiv = "category_data";
const TYPECat = "product";
const CatId = [];
const SortBtn = document.getElementById("btn_sort_page");
const SortCombo =document.getElementsByClassName("orderCl");
const SearchBtn = document.getElementsByClassName("SearchBtn");

const SerachBtn = document.getElementById("SerachBtn");
const resetBtn = document.getElementsByClassName("resetBtn");

let exist = 30;
let start = 30;
let number = '30';
let continueGet=true;

let idNotIn = $("#idNotIn").val();
let country='';
let province='';
let city='';
let orders='';

const SetData = (data) => {

    EmptyCatId(CatId);
    $("#categorys_id").val(data.id);
    $("#catagories_id").val(data.id);

    ModalCat.modal("hide");

    CategoryBox.innerHTML = data.name
    for (let i = 0; i < categories.length; i++) {
        categories[i].innerHTML = data.name
    }
}

SetCatParam(ModalCat, IDCatDiv, TYPECat, SetData);



const ShowDataList=(data)=>{
    let str="";
    data.forEach(d => {
    let imgUrl = "";
    if (d.file_url !== "" && d.file_url !== null) {
        imgUrl = URL + d.file_url + '/small/' + d.file_name;
    } else {
        imgUrl = URLPATH + VIEWURL + "assets/imgs/shop/product-1-1.jpg";
    }
    let progress=1;
    if(d.total_rate>0){
        progress=d.Rating/d.total_rate;
    }
    let price = d.price;
    let mainPrice = 0;
    if (d.amount !== null) {
        if (d.coupon_type == "Numerical") {
            mainPrice = price - d.amount;
        }

        if (d.coupon_type == "Percent") {
            mainPrice = price - ((price * d.amount) / 100);
        }

    }
    let ad = "";
    if (d.top_show_id) {
        ad += '<span class="text-success">Ad </span>';
    }


    str+='<div class=" col-md-3 col-12 col-sm-6  mb-30">';
    str+='<div class="product-cart-wrap">';
    str+='<div class="product-img-action-wrap">';
    str+='<div class="product-img product-img-zoom">';
    str+=' <a href="' + URLPATH + 'ProductDetail/' + d.title_slug + '">';
    str+=' <img class="default-img img-sam-size" src="'+imgUrl+'" alt="'+d.title+'" />';
    str+=' <img class="hover-img img-sam-size" src="'+imgUrl+'" alt="'+d.title+'" />';
    str+=' </a>';
    str+='  </div>';
    str+=' <div class="product-action-1">';
    str+='     <a aria-label="Quick view" class="action-btn small hover-up" href="' + URLPATH + 'ProductDetail/' + d.title_slug + '"> <i class="fi-rs-eye"></i></a>';
    str+='    <a aria-label="Add To Wishlist" class="action-btn small hover-up" href="' + URLPATH + 'ProductDetail/' + d.title_slug + '"><i class="fi-rs-heart"></i></a>';
    str+='    <a aria-label="List" class="action-btn small hover-up" href="' + URLPATH + 'Products"><i class="fi-rs-shuffle"></i></a>';
    str+=' </div>';
       
    str+='</div>';
    str+='<div class="product-content-wrap">';
   str+='     <div class="product-category">';
   str+='      <a >'+d.category_name+'</a>';
   str+='  </div>';
   str+='   <h2><a href="' + URLPATH + 'ProductDetail/' + d.title_slug + '">'+ad+d.title.substring(0, 20)+'"..."</a></h2>';
   str+='  <div class="product-rate d-inline-block">';
   str+='      <div class="product-rating" style="width:'+ parseInt(d.Rating)*20+'%"></div>';
   str+='   </div>';
   str+='  <div class="product-price mt-10">';
   if(mainPrice != 0) {



            str+='              <span>$ '+numberFormat(mainPrice) +' </span>';
            str+='         <span class="old-price">$'+numberFormat(price)+'</span>';
            } else { 
                str+='        <span>$'+ numberFormat(parseFloat(d.price))+'</span>';

                 } 
                str+='     </div>';
                str+='    <div class="sold mt-1 mb-1">';
                str+='<div class="mb-5">'
                // str+='       <div class="progress mb-5">';
                // str+='    <div class="progress-bar" role="progressbar" style="width: '+progress+'%" aria-valuemin="0" aria-valuemax="100"></div>';
                str+='<div class="text-muted">'+checkNull(d.description).substring(0, 50)+ '...</div>';
                str+='  </div>';
                str+='<span class="font-xs text-heading"> total Ratings: '+numberFormat(d.total_rate) +'</span>';
            str+='  </div>';
            // str+=' <a href="' + URLPATH + 'ProductDetail/' + d.title_slug + '" class="btn w-100 hover-up"></i>View</a>';
            str+='</div>';
            str+='</div>';
            str+='</div>';
        });
        DivShow.append(str);
}

const getData = () => {
    block();
    let param = {
        start: start.toString(),
        number,
        idNotIn,
        admin_confirm: "1",
        trash: "0"
    }

    if ($("#titlese").val() !== '') {
        param['title'] = $("#titlese").val();
    }

    if ($("#categorys_id").val() !== '') {
        param['category_id'] = $("#categorys_id").val();
    }

    if (orders !== '') {
        let data = orders.split(",");
        param['order'] = "product."+data[0];

        param['order_type'] = data[1];
    }


    if ($("#titles2").val() !== '') {
        param['title'] = $("#titles2").val();
    }

    if ($("#catagories_id").val() !== '') {
        param['category_id'] = $("#catagories_id").val();
    }


    if ($("#display_name_slug").val() !== '') {
        param['display_name_slug'] = $("#display_name_slug").val()
    }

    if ($('input[name="orderPage"]:checked').val() !== undefined) {
        let data = $('input[name="orderPage"]:checked').val().split(",");
        param['order'] = data[0];
        param['order_type'] = data[1];
    }

    if ($('input[name="rate"]:checked').val() !== undefined) {

        param['Rating_big'] = $('input[name="rate"]:checked').val();
        //  param['Rating_smaller'] = (parseInt($('input[name="rate"]:checked').val())+1);
    }
    
    if($("#slider-range-value1").text() !==""){

        let p=$("#slider-range-value1").text().split("$")[1];
        param['price_big'] =parseInt(p.replace(/,/g, '')) ;
    }

    if($("#slider-range-value2").text() !==""){

        let p=$("#slider-range-value2").text().split("$")[1];
        param['price_smaller'] = parseInt(p.replace(/,/g, ''));
    }




    if (country !== '') {
        param['country_id'] = country;
    }

    if (province !== '') {
        param['province_id'] = province;
    }

    if (city !== '') {
        param['city_id'] = city;
    }

    if(getCookie("rate_cityChooseName") !=="" ){
        param["city_id"] = getCookie("rate_cityChoose");
    }

    Fetching("product/get", param).then((data) => {
        unblock();
        if (data.status === 'true') {

            exist = exist + data.data.data.length;
            if (data.data.total - exist <= 0) {
                continueGet = false;
                if (BtnLoad !== null)
                    BtnLoad.style.display = "none";
            }
            $("#totals").html(numberFormat(data.data.total));
            start = parseInt(start) + parseInt(start);
            ShowDataList(data.data.data);

            let category="";
           // category=$("#categorys_id").val().toString();
            if(category=="")
            category=$("#catagories_id").val().toString();
            GetBanner(DivShow,"product",category);
        } else
            continueGet = false;

    })
}

if(SerachBtn !==null){

    SerachBtn.onclick = () => {
        idNotIn = "";
        DivShow[0].innerHTML = "";
        exist = 0;
        start = 0;
        getData();
    }
}


if (BtnLoad !== null) {
    BtnLoad.onclick = () => {
        getData();
    }
}

const ResetData = () => {
    idNotIn = "";
    DivShow[0].innerHTML = "";
    exist = 0;
    start = 0;
    getData();
}

for (let i = 0; i < categories.length; i++) {
    categories[i].onclick = () => {
        EmptyParent()
        EmptyIdsParent();
        fetchCat({ type: "product", parent: "0" }, "0");
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
        $('input[name=orderPage]').prop('checked', false);
        $('input[name=rate]').prop('checked', false);
        $('input[name=price]').prop('checked', false);


    }
}

SetEnterFun("inp-enter", ResetData);

const SetCatSearch = () => {
    let path = window.location.pathname;
    let paths = path.split("/");
    let slug = paths[(paths.length) - 1]
    if (slug !== 'Products') {

        block();
        Fetching("fetchData/getCategory", { "name_slug": slug }).then((data) => {
            unblock();
            if (data.status === 'true') {

                if (data.data.data.length > 0) {
                    let category = data.data.data[0];

                    SetData(category);
                    ResetData();
                }

            }

        })
    }
}

SetCatSearch();





for(let i=0;i<SortCombo.length;i++)
{
    SortCombo[i].onclick=(e)=>{
        
        $(".sort-by").trigger("click");
        $(".sort-by").text('\n                                    Sort by: The '+e.currentTarget.text+'\n                                ');
        $(".orderCl").removeClass("active");
        SortCombo[i].classList.add("active");
        orders=e.currentTarget.dataset.value;
        ResetData();
    }
}

tokenizAjaxCity("city-search", false, "country/searchCity", {}, "name", "1", "name");

$('#city').on('tokenize:tokens:add', function(e, value){
    let data=value.split(",");
    let id=data[0];
    let type=data[1];
    if(type==='country')
    {
        country=id;
    }

    if(type==='province')
    {
        province=id;
    }

    if(type==='city')
    {
        city=id;
    }
    ResetData()
});
$('#city').on('tokenize:tokens:remove', function(e, value){
    country='';
    province='';
    city='';
    ResetData()
});
