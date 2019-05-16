import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

var data = fetch('api/calendars/search/findByTeamid?teamid='+ document.getElementById("teamid").value, {
               method: 'GET',
               headers: {
                     'Content-Type': 'application/json',
                     },
               credentials: 'same-origin'
             })
             .then((response) => {
               if(response.ok) {
                 return response.json();
               } else {
                 throw new Error('Server response wasn\'t OK');
               }
             })
             .then(function(json) {
                if(json) {
                  return json._embedded.calendars;
                } else {
                  throw new Error('Server response wasn\'t OK');
                }
             });

document.addEventListener('DOMContentLoaded', function() {

    console.log(document.getElementById('data'))

  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
    plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin ],
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    defaultDate: new Date(),
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: [{id:1, title: "Josh FC Training", start: "2019-05-23T14:30:00", color: 'red', teamid: 1, _links: {self: {href: "http://localhost:8080/api/calendars/1"}}}]
    });

  calendar.render();
});

