import React, {Component} from 'react';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

class ShowCalendar extends Component {
constructor(props){
    super(props)

}

    render() {
    let calendar;
    calendar = new Calendar(document.getElementById('calendar'), {
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
        events: {
        title: 'Test',
        start: '2019-05-23'
        }
        })

        return (

            {calendar}

        );
    }
}

export default ShowCalendar;