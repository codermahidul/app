import { Fetching } from "../Fetch/Common.js";

export class Calender {
  constructor(eventData, evFun) {
    
    this.eventData = eventData;
    this.evFun=evFun;
    this.calendarEl = document.getElementById("calendar");
    this.calendar = new FullCalendar.Calendar(this.calendarEl, {
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      },
      initialDate: Date.now(),
      initialView: "dayGridMonth",

      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectMirror: true,
      nowIndicator: true,
      select: function (arg) {
        let title = prompt("Event Title:");
        if (title) {
          this.calendar.addEvent({
            title: title,
            start: arg.start,
            end: arg.end,
            allDay: arg.allDay,
          });
        }
        this.calendar.unselect();
      },
      eventClick: function (arg) {
        
        // if (confirm("Are you sure you want to delete this event?")) {
        //   arg.event.remove();
        // }
        this.evFun(arg);
      },

      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: this.eventData,
    });
  }

  Refresh=(initialDate=Date.now(),evFun=this.evFun)=>{
    
    this.calendar = new FullCalendar.Calendar(this.calendarEl, {
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      },
      initialDate: initialDate,
      initialView: "dayGridMonth",

      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectMirror: true,
      nowIndicator: true,
      select: function (arg) {
        let title = prompt("Event Title:");
        if (title) {
          this.calendar.addEvent({
            title: title,
            start: arg.start,
            end: arg.end,
            allDay: arg.allDay,
          });
        }
        this.calendar.unselect();
      },
      eventClick: function (arg) {

        // if (confirm("Are you sure you want to delete this event?")) {
        //   arg.event.remove();
        // }
        evFun(arg);
      },

      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: this.eventData,
    });
  }

  Render = (fn) => {
    this.calendar.render();
    fn();
  };

  GetCurrentDate = () => {
    let start = moment(this.calendar.currentData.currentDate, "MMMM YY").format(
      "YYYY-MM-01"
    );
    let data = {
      start,
      end: moment(start).add(1, "M").format("YYYY-MM-01"),
    };
    return data;
  };

  GetJustCurrentDate = () => {
    return this.calendar.currentData.currentDate;
  };

  SetEvent = (data) => {
    this.eventData = data;
  };

  GetEvent = (url, param, fn) => {
    Fetching(url, param).then((data) => {
      let event = [];
      data.data.data.forEach((d) => {
        event.push({
          title: d.title,
          start: d.date_from + "T" + d.time_from,
          end: d.date_to + "T" + d.time_to,
          url: "",
          id:d.id
        });
      });
      this.eventData = event;
   
      fn();
    });
  };


}
