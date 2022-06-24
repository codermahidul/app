export const SetCalender = (eventData, evFun, AfterFun) => {
  let calendarEl = document.getElementById("calendar");

  let calendar = new FullCalendar.Calendar(calendarEl, {
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
        calendar.addEvent({
          title: title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay,
        });
      }
      calendar.unselect();
    },
    eventClick: function (arg) {
      // if (confirm("Are you sure you want to delete this event?")) {
      //   arg.event.remove();
      // }
      evFun(arg);
    },

    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    events: eventData,
  });

  calendar.render();
  AfterFun()
};
