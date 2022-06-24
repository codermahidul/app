import { Fetching } from '../Fetch/Common.js';
import { URL } from '../Fetch/Setting.js';

export class AutoComplete {

    constructor(url, id, divID, SearchItem, ShowInfoItem,param=[]) {
        this.url = url;
        this.value = "";
        this.idInp = id;
        this.Input = document.getElementById(id);
        this.divID = divID;
        this.Div = document.getElementById(divID);
        this.SearchItem = SearchItem;
        this.ShowInfoItem = ShowInfoItem;
        this.param=param;
        this.setChange();
    }

    setChange = () => {
        this.Input.onkeyup = (e) => {
            this.Search(e.currentTarget.value)
        }
    }

    Search = (value) => {
        if (value.length > 0) {
            this.ShowSpinier();
            let param = {};
            param[this.SearchItem] = value;

            for(let i=0;i<this.param.length;i++)
            {
                param[this.param[i].name]=this.param[i].value;
            }

            Fetching(this.url, param).then((data) => {
                this.HideSpinier()
                if (data.status === 'true') {
                    let datas = [];
                    if (data.data.data !== undefined)
                        datas = data.data.data;

                    this.ShowSearchItem(datas);
                }
            })
        }
        else
        this.Empty();
    }

    ShowSearchItem = (data) => {
        this.Div.innerHTML = "";
        if (data.length > 0) {
            let str = "";
            str += '<div class="row">';
            data.forEach(d => {
                str += '<div class="col-md-12 p-2 border-bottom">';
                let title = d[this.ShowInfoItem];
                if (d.file_url !== '' && d.file_url !== null) {
                    let image = URL + d.file_url + "/small/" + d.file_name;
                    title = "<img class='sm-img-table' src='" + image + "'> <span>" + d[this.ShowInfoItem] + " " + "</span>";
                }
                str += '<div class="item-choose-search point p-2" data-id="' + d.id + '" data-value="' + d[this.ShowInfoItem] + '">' + title + '</div>';
                str += '</div>';
            });
            str += '</div>';
            this.Div.innerHTML = str;
        }
        this.AfterShowSearch();

    }

    ShowSpinier=()=>{
        $(".spinner-border").css("display","")
    }

    HideSpinier=()=>{
        $(".spinner-border").css("display","none") 
    }

    Empty=()=>{
        this.Div.innerHTML="";
        this.value="";
        this.Input.value="";
    }

    AfterShowSearch=()=>{
        let items=document.getElementsByClassName("item-choose-search");
        for(let i=0;i<items.length;i++)
        {
            items[i].onclick=(e)=>{
                this.SetValue(e);
            }
        }
    }

    SetValue=(e)=>{
        let data=e.currentTarget.dataset;
        this.value=data.id;
        this.Div.innerHTML="";
        this.Input.value=data.value;

    }
    GetValue=()=>{
        return this.value;
    }
}