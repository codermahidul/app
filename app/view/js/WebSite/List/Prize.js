import { Reset, ResetWithoutCategory } from '../../Admin/Confirm/view/Common.js';
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
        idNotIn,
        admin_confirm: "1",
        trash: "0"
    }
    if ($("#titlese").val() !== '') {
        param['title'] = $("#titlese").val();
    }



    if ($("#orderser").val() !== '') {
        let data = $("#orderser").val().split(",");
        param['order'] = data[0];
        param['order_type'] = data[1];
    }

    if ($("#titles2").val() !== '') {
        param['title'] = $("#titles2").val();
    }


    if ($("#orders2").val() !== '') {
        let data = $("#orders2").val().split(",");
        param['order'] = data[0];
        param['order_type'] = data[1];
    }

    if ($("#display_name_slug").val() !== '') {
        param['display_name_slug'] = $("#display_name_slug").val()
    }
    if ($('input[name="orderPage"]:checked').val() !== undefined) {
        let data = $('input[name="orderPage"]:checked').val().split(",");
        param['order'] = data[0];
        param['order_type'] = data[1];
    }

    Fetching("prize/get", param).then((data) => {
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
            GetBanner(DivShow,"prize");
        } else
            continueGet = false;

    })
}

SerachBtn.onclick = () => {
    idNotIn = "";
    DivShow[0].innerHTML = "";
    exist = 0;
    start = 0;
    getData();
}

ResetBtn.onclick = () => {
    ResetWithoutCategory();

}

if (BtnLoad !== null) {
    BtnLoad.onclick = () => {
        getData()
    }
}


const ShowDataList = (data) => {

    let str = '';
    data.forEach(d => {


        let imgurl = "";
        if (d.file_url !== "" && d.file_url !== null) {
            imgurl = URL + d.file_url + '/small/' + d.file_name;
        } else {
            imgurl = URLPATH+VIEWURL + "imgs/defult.jpg";
        }

        let ad="";
        if(d.top_show_id)
        {
            ad+='<span class="text-success">Ad </span>';
        }

        str += '<a href="' + URLPATH + 'PrizeDetail/' + d.id + '" class="hrefs">';
        str += '  <div class="card-contain  m-1">';
        str += '    <div class="card-image position-relative">';
        str += '          <img class="img-sam-size" src="' + imgurl + '" alt="' + d.title + '">';
        str+='             <div class="img-over-top bag-defult top-r-b-l-radus">'+d.jvalues+'</div>';
        str += '  </div>';
        str += '  <div class="card-details">';
        str += '     <div class="card-title">' +ad+ d.title + '</div>';
        str += '      <div class="mt-1 ">';

   
        str += ' <div class="mb-1 p-1 ">';
        str += '        <small class="text-muted">' + checkNull(d.description).substring(0, 100) + '</small>';
        str += ' </div>';

        str += '       </div>';
        str += '  </div>';
        str += ' </div>';
        str += ' </a>';


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