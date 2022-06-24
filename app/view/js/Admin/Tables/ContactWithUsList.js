let DataTables = await import("../../Class/DataTable.js?v=" + Date.now());

const Search = document.getElementById("searchbtn");



const DataTable = DataTables.DataTable;

const DtClass = new DataTable("dataTable", "ContactWithUsTable/get_all");

const column = [
  { data: "id" },
  { data: "company" },
  { data: "name" },
  { data: "email" },
  { data: "phone" },
  { data: "description" },

];
const param = {
  trash: () => {
    return $("#trashSearch").val();
  },
  idSearch: () => {
    return $("#idSearchs").val();
  },
  title: () => {
    return $("#titlese").val();
  },
};

///dataTable
DtClass.CreateDataTable(param, column);








