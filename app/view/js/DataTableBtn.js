import { URLPATH } from "./Fetch/Setting.js";

let table = '';
export const setDataTable = (className, url, data, columns) => {
    
    table = $('.' + className).DataTable({
        "processing": true,
        "serverSide": true,
        "searching": false,
        "ordering": false,
        "responsive": true,
        "pageLength": 25,
        "lengthMenu": [[ 25, 50, 100,200], [ 25, 50, 100,200]],
        dom: 'Blfrtip',
    
        buttons: [
            {
              extend: "print",
              text: "print",
              className: "btn btn-info mb-2 red",
    
              exportOptions: {
                columns: ":visible",
              },
             
            },
            {
              extend: "colvis",
              columns: ":not(.noVis)",
              //text: "",
              className: "btn btn-primary mb-2 orange",
            },
          ],
          
        language: {

            decimal: ",",
            thousands: ".",
            paginate: {
                first: '«',
                previous: '‹',
                next: '›',
                last: '»'
            },
            aria: {
                paginate: {
                    first: 'First',
                    previous: 'Previous',
                    next: 'Next',
                    last: 'Last'
                }
            }
        },
        "ajax": {
            "url": URLPATH+url,
            "type": "POST",
            data: data
        },
        "columns": columns,
        "columnDefs": [
            {
                className: "text-left",
                "targets": '_all',
                defaultContent: "<button>Click!</button>"
            }
        ]
    });
}

export const RefreshTable = () => {
    table.ajax.reload();
    
}