import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

document.addEventListener('DOMContentLoaded', function() {

  var calendarEl = document.getElementById('calendar');

  fetch('api/calendars/search/findByTeamid?teamid='+ document.getElementById("teamid").value, {
                                              method: 'GET',
                                              headers: {
                                                    'Content-Type': 'application/json',
                                                    },
                                              credentials: 'same-origin'
                                            })
                                            .then((response) => {return response.json()})
                                            .then(function(json) {
                                            var events = (JSON.parse(JSON.stringify(json._embedded.calendars)));

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
                                                events: events
                                                });
                                                calendar.render();
                                            });
});

//[
//{title: "Josh FC v Other Team", start: "2019-05-22T19:00:00", color: "blue", teamid: 1, _links: {self: {href: "http://localhost:8080/api/calendars/2"}, calendar: {href: "http://localhost:8080/api/calendars/2"}}},
//{title: "Josh FC Training", start: "2019-05-19T12:00:00", color: "red", teamid: 1, _links: {self: {href: "http://localhost:8080/api/calendars/1"}, calendar: {href: "http://localhost:8080/api/calendars/1"}}},
//]
//
//(fetch('api/calendars/search/findByTeamid?teamid='+ document.getElementById("teamid").value, {
//                             method: 'GET',
//                             headers: {
//                                   'Content-Type': 'application/json',
//                                   },
//                             credentials: 'same-origin'
//                           })
//                           .then((response) => {return response.json()})
//                           .then(function(json) {
//                           console.log(JSON.parse(JSON.stringify(json._embedded.calendars)));
//                           return JSON.parse(JSON.stringify(json._embedded.calendars))}))