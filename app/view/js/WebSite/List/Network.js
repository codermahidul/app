import { ResetWithoutCategory } from '../../Admin/Confirm/view/Common.js';
import { Fetching } from '../../Fetch/Common.js';
import { URL, URLPATH, VIEWURL } from '../../Fetch/Setting.js';
import { block, unblock } from '../../functions/Block.js';
import { checkNull, GetBanner } from '../../functions/Common.js';
import './SortBtn.js';

const DivShow = $("#dataList");
const BtnLoad = document.getElementById("BtnnLoad");
const SerachBtn = document.getElementById("SerachBtn");
const ResetBtn = document.getElementById("resetbtn");

const SearchBtn = document.getElementsByClassName("SearchBtn");
const resetBtn = document.getElementsByClassName("resetBtn");

let exist = 30;
let start = 30;
let number = '30';
let continueGet = true;

let idNotIn = $("#idNotIn").val();


const getData = () => {
    block();
    let param = {
        start: start.toString(),
        number,
        idNotIn
    }
    
    if ($("#titlese").val() !== '') {
        param['display_name'] = $("#titlese").val();
    }

    if ($("#titles2").val() !== '') {
        param['display_name'] = $("#titles2").val()
    }
    if ($("#display_name_search").val() !== '') {
        param['display_name'] = $("#display_name_search").val()
    }

    if ($("#orderser").val() !== '') {
        let data = $("#orderser").val().split(",");
        param['order'] = data[0];
        param['order_type'] = data[1];
    }

    if ($('input[name="orderPage"]:checked').val() !== undefined) {
        let data = $('input[name="orderPage"]:checked').val().split(",");
        param['order'] = data[0];
        param['order_type'] = data[1];
    }

    Fetching("useraction/getUserInfo", param).then((data) => {
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
            GetBanner(DivShow,"network");
        } else
            continueGet = false;

    })
}

const ShowDataList = (data) => {

    let str = '';
    data.forEach(d => {


        let imgurl = "";
        if (d.image !== "" && d.image !== null) {
            imgurl = URL + 'uploads/user/' + d.id + '/profile/image/middle/' + d.image;
        } else {
            imgurl = VIEWURL + "imgs/user_defult.jpg";
        }


        str += '<a href="' + URLPATH + d.display_name_slug + '" class="hrefs col-md-4">';
        str += '  <div class="card-contain ">';
        str += '    <div class="card-image position-relative ">';
        str += '          <img src="' + imgurl + '" alt="' + d.display_name_slug + '" class="img-sam-size">';
        str += '  </div>';
        str += '  <div class="card-details">';
        str += '     <div class="card-title">' + d.display_name + '</div>';
        str += '      <div class="mt-1 ">';
        str += '        <span class="text-muted">' + checkNull(d.headline).substring(0, 100)+ '</span>';
        str += '       </div>';
        str += '  </div>';
        str += ' </div>';
        str += ' </a>';


    });
    DivShow.append(str);
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
        ResetWithoutCategory();

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

$('input:radio[name="orderPage"]').change(function() {

    //let value=$(this).val();
    ResetData()
});