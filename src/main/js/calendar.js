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
