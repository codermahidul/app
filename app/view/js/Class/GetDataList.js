import { Fetching } from "../Fetch/Common.js";
import { URL, URLPATH } from "../Fetch/Setting.js";
import { block, unblock } from "../functions/Block.js";
import { checkNull } from "../functions/Common.js";
import {numberFormat} from '../functions/numberFormat.js';

export class GetDataList {

    constructor(url,param,div,DetailPage,DetailField,ShowDataListFun,Load) {
        this.url=url;
        this.param=param
        this.ShowDataListFun=ShowDataListFun;
        this.DetailField=DetailField;
        this.DetailPage=DetailPage;
        this.DivId = div
        this.DivShow = $("#"+div);
        this.exist = 0;
        this.start = 0;
        this.number = '30';
        this.continueGet = true;
        this.BtnLoad=document.getElementById(Load);

    }

    getData = ( ) => {
        block();
        let param = { ...{ start: this.start.toString(), number:this.number }, ...this.param }

        Fetching(this.url, param).then((data) => {
            unblock();
            if (data.status === 'true') {
                this.exist = this.exist + data.data.data.length;
                if (data.data.total - this.exist <= 0) {
                    this.continueGet = false;
                    if (this.BtnLoad !== null)
                        this.BtnLoad.style.display = "none";
                }
                this.start = parseInt(this.start) + parseInt(this.start);
                this.ShowDataListFun(data.data.data);
            } else
                this.continueGet = false;

        })
    }

    ShowDataPrize = (data) => {

        let str = '';
        data.forEach(d => {
    
    
            let imgUrl = "";
            if (d.file_url !== "" && d.file_url !== null) {
                imgUrl = URL + d.file_url + '/small/' + d.file_name;
            } else {
                imgUrl = URLPATH+VIEWURL + "imgs/defult.jpg";
            }
    
            let ad="";
            if(d.top_show_id!==undefined &&d.top_show_id)
            {
                ad+='<span class="text-success">Ad </span>';
            }
    
            str+='<div class="col-md-4">';
            str += '<a href="' + URLPATH +this.DetailPage+ '/' + d[this.DetailField] + '" class="hrefs">';
            str += '  <div class="card-contain  m-1">';
            str += '    <div class="card-image position-relative">';
            str += '          <img class="img-sam-size" src="' + imgUrl + '" alt="' + d.title + '">';
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
            str += ' </div>';
    
        });
        this.DivShow.append(str);
    }

    ShowDataProduct = (data) => {
        
        let str = '';
        data.forEach(d => {
    
            let imgUrl = "";
            if (d.file_url !== "" && d.file_url !== null) {
                imgUrl = URL + d.file_url + '/small/' + d.file_name;
            } else {
                imgUrl = URLPATH + VIEWURL + "imgs/defult.jpg";
            }
    
    
            let ad = "";
            if (d.top_show_id!==undefined && d.top_show_id) {
                ad += '<span class="text-success">Ad </span>';
            }
            str+='<div class="col-md-4">';
            str += '<a href="' + URLPATH + this.DetailPage+'/' + d[this.DetailField]  + '" class="hrefs col-md-4">';
            str += '  <div class="card-contain  m-1">';
            str += '    <div class="card-image position-relative">';
            str += '          <img class="img-sam-size" src="' + imgUrl + '" alt="' + d.title_slug + '">';
            str += '             <div class="img-over-top bag-defult top-r-b-l-radus">' + d.category_name + '</div>';
            str += '  </div>';
            let rate = 0;
            if (d.Rating !== null) {
                rate = d.Rating;
            }
            str += '  <div class="card-details">';
            str += '<div>';
            str += '<span class="card-title">' + ad + d.title + '</span>';
            str += '<br>';
            str += '<span class="text-warning"><i class="bi bi-star-fill"></i></span>';
            str += ' <small class="fw-bold text-muted"> ' + parseFloat(rate).toFixed(1) + '</small>';
            str += ' <span class="ms-1 me-1"> ' + numberFormat(d.total_rate) + ' Ratings</span>';
    
            str += '</div>';
    
            str += '      <div class="mt-1 ">';
    
    
            str += ' <div class="mb-1 p-1 ">';
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
    
            if (mainPrice != 0) {
                str += '<del class="text-muted">' + numberFormat(price) + '</del> ';
                str += '<strong class="text-success">$' + numberFormat(mainPrice) + '</strong> ';
                str += '<small>';
                str += ' <span class="bag-green">';
                str += d.coupon_type == "Numerical" ? "$" : "";
                str += d.amount;
                str += d.coupon_type == "Percent" ? " %" : "";
                str += '     </span>';
                str += '  </small>';
            } else {
                str += '<strong class="text-muted fw-bolder h5">$' + numberFormat(price) + '</strong>';
            }
    
    
            str += '        <div class="text-muted">' + checkNull(d.description).substring(0, 100) + '</div>';
            str += ' </div>';
    
            str += '       </div>';
            str += '  </div>';
            str += ' </div>';
            str += ' </a>';
            str += ' </div>';
    
        });
        this.DivShow.append(str);
    }

    ShowDataCoupon = (data) => {

        let str = '';
        data.forEach(d => {
    
            let type_name="$"+d.amount;
            if(d.type_name==="Percent")
            type_name=d.amount+"%";

            let imgUrl = "";
            if (d.file_url !== "" && d.file_url !== null) {
                imgUrl = URL + d.file_url + '/small/' + d.file_name;
            } else {
                imgUrl = URLPATH+VIEWURL + "imgs/defult.jpg";
            }
    
            let ad="";
            if(d.top_show_id!==undefined && d.top_show_id)
            {
                ad+='<span class="text-success">Ad </span>';
            }
            str+='<div class="col-md-4">';
            str += '<a href="' + URLPATH +this.DetailPage+ '/' + d[this.DetailField] + '" class="hrefs col-md-4">';
            str += '  <div class="card-contain  m-1">';
            str += '    <div class="card-image position-relative">';
            str += '          <img class="img-sam-size" src="' + imgUrl + '" alt="' + d.title + '">';
            str+='             <div class="img-over-top bag-defult top-r-b-l-radus">'+type_name+'</div>';
            str += '  </div>';
            str += '  <div class="card-details">';
            str += '     <div class="card-title">' +ad+ d.title + '</div>';
            str += '      <div class="mt-1 ">';
    
       
            str += ' <div class="mb-1 p-1 ">';
            str += '        <span class="text-muted">' + checkNull(d.description).substring(0, 100) + '</span>';
            str += ' </div>';
    
            str += '       </div>';
            str += '  </div>';
            str += ' </div>';
            str += ' </a>';
            str += ' </div>';
    
        });
        this.DivShow.append(str);
    }

    ResetData=(url, param)=>{
        this.DivShow[0].innerHTML = "";
        this.exist = 0;
        this.start = 0;
        this.getData(url, param);
    }
    
}