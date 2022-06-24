import { CreateSelectOption, Fetching } from '../../Fetch/Common.js';
import { GetBanner, checkNull, tokenizAjaxCity } from '../../functions/Common.js';
import { Reset, ResetWithoutCategory } from '../../Admin/Confirm/view/Common.js';
import { URL, URLPATH, VIEWURL } from '../../Fetch/Setting.js';
import { block, unblock } from '../../functions/Block.js';

const DivShow = $("#dataList");
const BtnLoad = document.getElementById("BtnnLoad");
const SortCombo =document.getElementsByClassName("orderCl");


const SerachBtn = document.getElementById("SerachBtn");
//const SearchBtn = document.getElementsByClassName("SearchBtn");
const resetBtn = document.getElementsByClassName("resetBtn");


let exist = 30;
let start = 30;
let number = '30';
let continueGet = true;

let idNotIn = $("#idNotIn").val();

let country='';
let province='';
let city='';
let orders='';

if(SerachBtn !==null){

    SerachBtn.onclick = () => {
        
        idNotIn = "";
        DivShow[0].innerHTML = "";
        exist = 0;
        start = 0;
        getData();
    }
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


    if ($("#titles2").val() !== '') {
        param['title'] = $("#titles2").val();
    }

 
    if ($("#categoryP1").val() !== '') {
        param['category_id'] = $("#categoryP1").val();
    }
  

    if ($("#typeP1").val() !== '') {
        param['type'] = $("#typeP1").val();
    }

    if ($("#display_name_slug").val() !== '') {
        param['display_name_slug'] = $("#display_name_slug").val()
    }

    if ($('input[name="orderPage"]:checked').val() !== undefined) {
        let data = $('input[name="orderPage"]:checked').val().split(",");
        param['order'] = data[0];
        param['order_type'] = data[1];
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

    if (orders !== '') {
        let data = orders.split(",");
        param['order'] = "program."+data[0];

        param['order_type'] = data[1];
    }

    Fetching("program/get", param).then((data) => {
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

            let programCat="";
           
            programCat=$("#categoryP1").val().toString();
            GetBanner(DivShow,"program","",programCat);
        } else
            continueGet = false;

    })
}



if (BtnLoad !== null) {
    BtnLoad.onclick = () => {
        getData()
    }
}

const ShowDataList = (data) => {

    let str = '';
    data.forEach(d => {


        let imgUrl = "";
        if (d.file_url !== "" && d.file_url !== null) {
            imgUrl = URL + d.file_url + '/small/' + d.file_name;
        } else {
            imgUrl = URLPATH + VIEWURL + "assets/imgs/shop/product-1-1.jpg";
        }

        str+='<div class=" col-md-3 col-12 col-sm-6  mb-30">';
        str+='<div class="product-cart-wrap">';
        str+='<div class="product-img-action-wrap">';
        str+='<div class="product-img product-img-zoom">';
        str+='<a href="' + URLPATH + 'ProgramDetail/' + d.title_slug + '">';
        str+='<img class="default-img img-sam-size" src="'+imgUrl+'" alt="'+d.title+'"';
        str+='  <img class="hover-img img-sam-size" src="'+imgUrl+'" alt="'+d.title+'"';
        str+='</a>';
        str+='</div>';
        str+='<div class="product-action-1" style="opacity: 1;visibility: visible;background-color: transparent;border:none">';
        str+=' <a aria-label="view" class="action-btn small hover-up d-flex justify-content-center">';
        str+='    <i class="bi bi-youtube" style="font-size: xx-large;color:#3bb77e"></i>';
        str+='</a>';

        str+=' </div>';
        str+='<div class="product-badges product-badges-position product-badges-mrg">';

        str+='</div>';
        str+='</div>';
        str+='<div class="product-content-wrap">';
        str+='<div class="product-category">';
        str+='<a>'+checkNull(d.program_type) +'</a>';
        str+='</div>';
        str+='<h2><a href="' + URLPATH + 'ProgramDetail/' + d.title_slug + '">'+d.title.substring(0, 50)+'...</a></h2>';
     
      
        str+='<div class="sold mt-1 mb-1">';
         
        str+='<span class="font-xs text-heading">';
        str+='<span>Guest : </span>';
       
        if(d.program_guests !=='' && d.program_guests !==null){
            let guest =d.program_guests.split(",");
            guest.foreach((g)=>{
                let guest_item = g.split("::"); 
                let name="";
        
                if(guest_item[1]!=="")
                {
                    name=guest_item[1];
                }

                if(guest_item[3]!=="")
                {
                    name=guest_item[3];
                }

                if(guest_item[4]!=="")
                {
                    name=guest_item[4];
                }
                    
                    str+='<span>'+ name+' </span><span> </span>';
            })
        }
                
            
                str+='</span> </div>';

                str+='</div>';
                str+='</div>';
                str+='</div>';


    });
    DivShow.append(str);
}

const ResetData=()=>{
    idNotIn = "";
    DivShow[0].innerHTML = "";
    exist = 0;
    start = 0;
    getData();
}

// for (let i = 0; i < SearchBtn.length; i++) {
//     SearchBtn[i].onclick = () => {
//         ResetData()
//     }
// }


for (let i = 0; i < resetBtn.length; i++) {
    resetBtn[i].onclick = () => {
        
        $("#typeP").val("");
        $("#typeP1").val("");
        $("#awardP").val("");
        $("#awardP1").val("");
        $("#orders2").val("");
        $("#orderser").val("");
        $("#categoryP").val("");
        $("#categoryP1").val("");
        $("#titlese").val("");
        $("#titles2").val("");
        $('input[name=orderPage]').prop('checked',false);
        
        
    }
}

for(let i=0;i<SortCombo.length;i++)
{
    SortCombo[i].onclick=(e)=>{
        
        $(".sort-by").trigger("click");
        $(".sort-by").text('\n                                    Sort by: the '+e.currentTarget.text+'\n                                ');
        $(".orderCl").removeClass("active");
        SortCombo[i].classList.add("active");
        orders=e.currentTarget.dataset.value;
        ResetData();
    }
}


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



const SetTypeSearch = () => {
    let path = window.location.pathname;
    let paths = path.split("/");
    let slug = paths[(paths.length) - 1]
    if (slug !== 'Programs') {
        $("#categoryP1").val(slug);
        ResetData();
    }
}

CreateSelectOption({ url: URLPATH+"fetchData/proof_get", params: { type: "program" } }, { id: "categoryP", value: "id", title: "title" })
CreateSelectOption({ url: URLPATH+"fetchData/proof_get", params: { type: "program" } }, { id: "categoryP1", value: "id", title: "title" },"",false,SetTypeSearch)
CreateSelectOption({ url: URLPATH+"fetchData/proof_get", params: { type: "programType" } }, { id: "typeP", value: "id", title: "title" })
CreateSelectOption({ url: URLPATH+"fetchData/proof_get", params: { type: "programType" } }, { id: "typeP1", value: "id", title: "title" })
CreateSelectOption({ url: URLPATH+"fetchData/proof_get", params: { type: "programAwardSection" } }, { id: "awardP", value: "id", title: "title" })
CreateSelectOption({ url: URLPATH+"fetchData/proof_get", params: { type: "programAwardSection" } }, { id: "awardP1", value: "id", title: "title" })


