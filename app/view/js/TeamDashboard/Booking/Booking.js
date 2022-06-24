import { Fetching } from "../../Fetch/Common.js";
import { checkNull,nlbrs } from "../../functions/Common.js";

let Calenders = await import("../../functions/Calender.js?v=" + Date.now());


const CalenderClass = Calenders.Calender;

const LeftBtn = document.getElementsByClassName("fc-prev-button");
const RightBtn = document.getElementsByClassName("fc-next-button");
const TodayBtn = document.getElementsByClassName("fc-today-button");
const ModalView = $("#ModalView");

const RunAfter = () => {
  for (let i = 0; i < LeftBtn.length; i++) {
    LeftBtn[i].onclick = (e) => {
      GetData();
    };
  }

  for (let i = 0; i < RightBtn.length; i++) {
    RightBtn[i].onclick = (e) => {
      GetData();
    };
  }

  for (let i = 0; i < TodayBtn.length; i++) {
    TodayBtn[i].onclick = (e) => {
      GetData();
    };
  }
};

let events = [];
const EvFun = (arg) => {
  let idSearch = arg.event.id;
  Fetching("team/getBooking", { idSearch }).then((data) => {
    $("#title").html('');
    $("#studio").html('');
    $("#date").html('');
    $("#description").html('');
    data.data.data.forEach((d) => {

      let studio = "<p class='ms-3'>" + checkNull(d.studio_title) + "</p>";
      studio += "<p class='ms-3'>" + checkNull(d.studio_description) + "</p>";

      let date="<p class='ms-3'>"+d.date_from+' : '+d.time_from+"</p>";
      date+="<p class='ms-3'>"+d.date_to+' : '+d.time_to+"</p>";

      $("#title").html(d.title);
      $("#studio").html(studio);
      $("#date").html(date);
      $("#description").html("<p class='ms-3'>"+nlbrs(d.description) +"</p>");
      
    });

    ModalView.modal("show")
  });
};
const CalenderC = new CalenderClass(events, EvFun);

const GetData = () => {
  let date = CalenderC.GetCurrentDate();
  let param = { date_from: date.start, date_to: date.end };
  CalenderC.GetEvent("team/getBooking", param, () => {
    CalenderC.Refresh(CalenderC.GetJustCurrentDate());
    CalenderC.Render(RunAfter);
  });
};

const GetDataFirst = () => {
  let date = new Date();
  let date_from = moment(
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  ).format("YYYY-MM-01");
  let date_to = moment(date_from).add(1, "M").format("YYYY-MM-01");
  let param = { date_from, date_to };
  CalenderC.GetEvent("team/getBooking", param, () => {
    CalenderC.Refresh();
    CalenderC.Render(RunAfter);
  });
};

GetDataFirst();
