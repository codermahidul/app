import { URL, URLPATH, VIEWURL } from "../../Fetch/Setting.js";

let FCommon=await import("../../Fetch/Common.js?v="+Date.now());

const Fetching=FCommon.Fetching;
const SetCooke=FCommon.SetCooke;
const getCookie=FCommon.getCookie;
const RemoveCooke=FCommon.RemoveCooke;

const SearchHeader = document.getElementsByClassName("searchHeader");
const SearchHeaderLoc = document.getElementsByClassName("searchHeaderLoc");
const headerLocClose=document.getElementById("header-loc-close")
const headerLocCloseMobile=document.getElementById("header-loc-close-mobile")

for (let i = 0; i < SearchHeader.length; i++) {
    SearchHeader[i].onkeyup = (e) => {
        SearchHeaderData(e)
    }
}

for (let i = 0; i < SearchHeaderLoc.length; i++) {
    SearchHeaderLoc[i].onkeyup = (e) => {
        SearchHeaderLocData(e)
    }
}

let product=true;
let prize=true;
let coupon=true;
let deals=true;
let job=true;
let business=true;
let program=true;

const SearchHeaderData = (e) => {

    let search = e.currentTarget.value;
    let id = e.currentTarget.dataset.id;
    if (search.length > 1) {
        Fetching("fetchData/getSearchDataHeader", { search }).then((data) => {
            showData(data, id);
        })
    } else {
        let div = $("#" + id);
        div.html("");
        div.css("display", "none");
    }

}

const SearchHeaderLocData = (e) => {

    let search = e.currentTarget.value;
    let id = e.currentTarget.dataset.id;
    if (search.length > 1) {
        Fetching("city/get", { name:search }).then((data) => {
            showDataCity(data, id);
        })
    } else {
        let div = $("#" + id);
        div.html("");
        div.css("display", "none");
    }

}

const showDataCity =(data, id)=>{

    let div = $("#" + id);
    div.html("");
    
    let str = "";
    let d=data.data.data;
    d.forEach(e => {
        str+='<div class="col-md-12 p-2 border-bottom point">';
        str+='<span><i class="bi bi-geo-alt-fill"></i></span>';
        str+='<span class="point chooseCity" data-id="'+e.id+'" data-name="'+e.country_name+','+e.province_name+','+e.name+'">'+e.country_name+','+e.province_name+','+e.name+'</span>';
        str+='</div>';

    });
    
    if (str.length > 0) {
        let str2='<div class="row">';
        str2+=str;
        str2+='</div>';
        div.html(str2);
        div.css("display", "");
        SetCityChooseSearch(id);
    }
}

const SetCityChooseSearch=(idDiv)=>{

    let div=$("#"+idDiv);
  
    const item=document.getElementsByClassName("chooseCity");
    for(let i=0;i<item.length;i++)
    {
        item[i].onclick=(e)=>{
            
            let data = e.currentTarget.dataset;
            let id = data.id;
            let name= data.name;
            $("#locationSe").val(name);
            $("#locationSeMobile").val(name);
            
            div.css("display","none");
            SetCooke(id,"rate_cityChoose")
            SetCooke(name,"rate_cityChooseName");
            window.location.reload()

        }
    }
}




const showData = (data, id) => {

    let div = $("#" + id);

    div.html("");
    let str = "";
    data.product.forEach(d => {

        str += ShowRow(d, 'Product', 'title_slug',product);
        product=false;
    });

    data.prize.forEach(d => {
        str += ShowRow(d, 'Prize', 'id',prize);
        prize=false;
    });
    data.coupon.forEach(d => {
        str += ShowRow(d, 'Coupon', 'title_slug',coupon);
        coupon=false;
    });

    data.deals.forEach(d => {
        str += ShowRow(d, 'Deals', 'title_slug',deals);
        deals=false;
    });

    data.job.forEach(d => {
        str += ShowRow(d, 'Job', 'title_slug',job);
        job=false;
    });

    data.business.forEach(d => {
        str += ShowRowBusiness(d, 'Businesses',business);
        business=false;
    });

    data.program.forEach(d => {
        str += ShowRow(d, 'Program','title_slug',program);
        program=false;
    });
    if (str.length > 0) {
        div.html(str);
        div.css("display", "");
    }

}

const ShowRow = (data, type, href,ShowType=true) => {

    let img = URLPATH + VIEWURL + "imgs/defult.jpg";
    if (data.file_url !== '' && data.file_url !== null) {
        img = URL + data.file_url + "/middle/" + data.file_name;
    }

    let str =CreateHtml(data,type,href,ShowType,img,false);

    return str;
}


const ShowRowBusiness = (data, type,ShowType=true) => {
    let img = URLPATH + VIEWURL + "imgs/logo.png";
    if (data.file_url !== '' && data.file_url !== null) {
        img = URL + data.file_url + "/middle/" + data.file_name;
    }
    let str =CreateHtml(data,type,"",ShowType,img,true);

    return str;
}


const CreateHtml=(data,type,href,ShowType,img,isBusiness=false)=>{

    
    let str = "";

    str += '<div class="row border-bottom mb-2 p-1 h2">';
    if(ShowType)
    {
        str += '<div class="col-md-12 mb-1 p-2 border-bottom">';
        str += '   <strong class="text-dark">' + type + '</strong>';
        str += '</div>';
    }

    if(!isBusiness)
    str += '<a href="' + URLPATH + type + 'Detail/' + data[href] + '">';
    else
    {
        str += '<a href="' + URLPATH + data.display_name_slug + '">'; 
    }

    str += ' <div class="col-md-12 p-1 grid-two-div-header-search ">';
    str += '    <div class=""><img  src="' + img + '" class="img-radius"></div>';
    str += '<div class=" min-text-show ">';
    if(!isBusiness) 
    str+= '<span class="h4 fw-bolder text-dark">'+data.title+'</span>' ;
    else
    {
        str += '<span class="h4 fw-bolder text-dark">'+data.display_name+'</span>'; 
    }
    str+='<br>';
    if(!isBusiness)
    str+='<small class="text-muted fs-5 text ">'+data.description+'</small>';
    else
    {
        str+='<small class="text-muted fs-5 text ">'+data.about+'</small>'; 
    }
    str+= '</div>';

    str += ' </div>';
    str += '</a>'
    str += '</div>';

    return str;

}


if(headerLocClose !==null)
{
    headerLocClose.onclick=()=>{
        RemoveCooke("rate_cityChooseName");
        RemoveCooke("rate_cityChoose");
        window.location.reload();
    }
}


if(headerLocCloseMobile !==null)
{
    headerLocCloseMobile.onclick=()=>{
        RemoveCooke("rate_cityChooseName");
        RemoveCooke("rate_cityChoose");
        window.location.reload();
    }
}

if(getCookie("rate_cityChooseName") !=="" ){
    $("#locationSe").val(getCookie("rate_cityChooseName")); 
    $("#locationSeMobile").val(getCookie("rate_cityChooseName")); 
    
    $("#header-loc-close").css("display","")
    $("#header-loc-close-mobile").css("display","")
}
