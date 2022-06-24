import { RefreshTable, setDataTable } from "../../DataTable.js";
import { Fetching } from "../../Fetch/Common.js";
import { URL, URLPATH, URLUSERFILE, VIEWURL } from "../../Fetch/Setting.js";


import {  SendDataForm} from "../../functions/Common.js";




const Search = document.getElementById("searchbtn");
const AddNewBtn = document.getElementById("addNewBtn");
const BtnSaveNew = document.getElementById("btnModalAdd");
const AddModal = $("#ModalAdd");
const ModalView = $("#ModalView");
const Results = document.getElementById("results");
const type = document.getElementById("type");


const column = [
    { "data": "id" },
    { "data": "type" },
    { "data": "date" },
    { "data": "action"},
    

];
const param = {
    idSearch: () => { return $("#idSearchs").val() },
    type: () => { return $("#typese").val() },
};


///datatble
setDataTable("datatable", "lotterytable/get_all", param, column);

Search.onclick = () => {
    RefreshTable();
}


AddNewBtn.onclick = () => {
    AddModal.modal("show");
}

const ResettingAdd = () => {
    let modal = BtnSaveNew.dataset.id;
    RefreshTable();
    $("#" + modal).modal("hide");

}

BtnSaveNew.onclick = () => {

    SendDataForm(BtnSaveNew,
        "addFrm", "lotteryAction/newLottery",
        [type],
        [],
        false,
        ResettingAdd,
        false);

}

const ShowDataLottery=(id)=>{
    Fetching("lotteryAction/getWinner",{idSearch:id}).then((data)=>{
        if(data.status==="true")
        {
            ShowHtmlWinner(data.data.data);
            ModalView.modal("show")
        }else
        {
            toast(data.err, "error");
        }
    })
    
}

const ShowHtmlWinner=(data)=>{
    Results.innerHTML="";
    let str="";
    data.forEach(d => {

        str+='<div class="card-contain covers2 m-1 ">';
        str+=' <div class="card-image position-relative">';
        str+='<img src="'+URL+d.file_url+'/small/'+d.file_name+'"  class="img-sam-size">';
        str+='<div class="img-over-top bag-defult top-r-b-l-radus">'+d.jvalues+'</div>';
        str+=' </div>';
        str+='<div class="card-details">';
        str+='<div class="h5">'+d.title+'</div>';
        str+=' <div class="mt-1 min-text-show">';
           
        str+=' <div class=" p-1">';
        str+=' <span class="text-muted">'+GetUser(d)+'</span>';
        str+=' </div>';
        str+='</div>';
        str+='</div>';
        str+='</div>';
    });
    Results.innerHTML=str;
}

const GetUser = (d) => {
    let str = "";
    let imgUrl="";
    if (d.user_image !== "" && d.user_image !== null) {
        imgUrl = URLUSERFILE + d.user_id + '/profile/image/small/' + d.user_image;
    } else {
        imgUrl = URLPATH + VIEWURL + "imgs/user_defult.jpg";
    }

    str += '<div class="mt-2 mb-2"><small class="text-muted">'
        + '<a class="hrefs" href="' + URLPATH +"UserDetailProfile/"+ d.display_name_slug + '">' 
        +'<img src="'+imgUrl+'" class="vsm-img"> <strong>'+ d.display_name + '</strong></a> '
        + '</small></div>';
    return str;
}
/////set function action table
$('#m_table_1 tbody').on('click', 'a', function (e) {

    let data = e.currentTarget.dataset;
    switch (data.action) {
        case "view":{
            ShowDataLottery(data.id);
            break;
        }

       
    }

});