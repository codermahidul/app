export class Links{

    constructor(type=[]){
        this.index='1';
        this.type=type;    
    }

    SetIndex=(index)=>{this.index=index}

    CreateLink = (id="more_link",edit="") => {


        let div = $("#" + id);
    
        let str = '';
        str += ' <div class="col-md-4">';
        str += ' <label for="recipient-name" class="col-form-label">Link type:</label>';
        str += '  <select id="ltype'+edit + this.index + '" class="input-white min-radus select-css link-type">';
        str += '  <option value=""></option>';
        this.type.forEach(d => {
            str += '   <option value="'+d.value+'">'+d.name+' </option>';   
        });
   
    
        str += '  </select>';
        str += ' </div>';
    
        str += ' <div class="col-md-4">';
        str += ' <label for="recipient-name" class="col-form-label">Link Title:</label>';
        str += '  <input id="ltitle'+edit + this.index + '" type="text" autocomplete="off" class="input-white min-radus link-title">';
        str += ' </div>';
        str += ' <div class="col-md-4">';
        str += ' <label for="recipient-name" class="col-form-label">Link Address:</label>';
        str += ' <input id="ltag' +edit+ this.index + '" type="text" autocomplete="off" class="input-white min-radus link-tag">';
        str += ' </div>';
    
    
        div.append(str);
        this.index++;
    }
    
    GetLinkValue = (edit = false) => {
        let valS = "";
    
        for (let i = 1; i < this.index; i++) {
            let t = "ltitle";
            let ta = "ltag";
            let typ = "ltype";
            if (edit) {
                t = "ltitle_e";
                ta = "ltag_e";
                typ = "ltype_e";
            }
    
            let title = $("#" + t + i).val();
            let tags = $("#" + ta + i).val();
            let types = $("#" + typ + i).val();
            if(title===undefined)
            {
                title="";
            }
            if(tags===undefined)
            {
                tags="";
            }
            if(types===undefined)
            {
                types="";
            }
            if (i < (this.index - 1)) {
                valS += title + "::" + tags + "::" + types + ','
            } else
                valS += title + "::" + tags + "::" + types
    
        }
    
        return valS;
    }

    ResetLink=(id="more_link",edit="")=>{
        $("#"+id).html("");
        this.index=1;
        this.CreateLink(id,edit);
    }

    show_more_link = (str) => {
        
        if (str === null || str === '') {
            $("#ltitle1").val("")
            $("#ltag1").val("")
            $("#ltype1").val("")
            return false;
        }
        let data = str.split(",");
        for (let i = 0; i < data.length; i++) {
            let d = data[i].split("::");
            if ((i + 1) > 1)
                this.CreateLink()
    
            $("#ltitle" + (i + 1)).val(d[1])
            $("#ltag" + (i + 1)).val(d[2])
            $("#ltype" + (i + 1)).val(d[3])
    
        }
    }
}