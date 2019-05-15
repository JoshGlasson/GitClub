//import { Calendar } from '@fullcalendar/core';
//import interactionPlugin from '@fullcalendar/interaction';
//import dayGridPlugin from '@fullcalendar/daygrid';
//import timeGridPlugin from '@fullcalendar/timegrid';
//import listPlugin from '@fullcalendar/list';
//
//
//document.addEventListener('DOMContentLoaded', function() {
//  var calendarEl = document.getElementById('calendar');
//
//  var fixtureses = fetch('/api/fixtureses/search/findByTeamid?teamid='+ document.getElementById("teamid").value, {
//                                         method: 'GET',
//                                         headers: {
//                                         'Content-Type': 'application/json',
//                                         },
//                                         credentials: 'same-origin'
//                                         }).then((response) => {
//                                              if(response.ok) {
//                                                return response.json();
//                                              } else {
//                                                throw new Error('Server response wasn\'t OK');
//                                              }
//                                            })
//                                            .then((json) => {
//                                              json._embedded.fixtureses;
//                                            });
//
//   console.log(fixtureses)
//
//  var calendar = new Calendar(calendarEl, {
//    schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
//    plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin ],
//    header: {
//      left: 'prev,next today',
//      center: 'title',
//      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
//    },
//    defaultDate: new Date(),
//    navLinks: true, // can click day/week names to navigate views
//    editable: true,
//    eventLimit: true, // allow "more" link when too many events
//    events: fetch('/api/fixtureses/search/findByTeamid?teamid='+ document.getElementById("teamid").value, {
//                      method: 'GET',
//                      headers: {
//                      'Content-Type': 'application/json',
//                      },
//                      credentials: 'same-origin'
//                      }).then((response) => {
//                           if(response.ok) {
//                             return response.json();
//                           } else {
//                             throw new Error('Server response wasn\'t OK');
//                           }
//                         })
//                         .then((json) => {
//                           return json._embedded.fixtureses.map((item) => item.date)
//                           console.log(json._embedded.fixtureses)})
//                         });
//  calendar.render();
//});
//
//
