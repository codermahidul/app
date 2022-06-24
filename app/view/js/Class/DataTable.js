let DTable=await import("../DataTable.js?v="+Date.now());

const setDataTable=DTable.setDataTable;
const RefreshTable=DTable.RefreshTable;

export class DataTable {
    constructor(className,Url) {
        this.className = className;
        this.Url = Url;
     
    }

    CreateDataTable(param,column){
        setDataTable(this.className,this.Url, param, column);
    }

    Refresh(){
        RefreshTable();
    }

    ClickTable(action,fn){
        $('#m_table_1 tbody').on('click', 'a', function (e) {

            let data = e.currentTarget.dataset;
            switch (data.action) {
                case action: {
                    fn(data);
                    break;
                }
          
            }
        
        });
    }
    
}