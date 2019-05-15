const ReactDOM = require('react-dom');
const React = require('react');
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

class Events extends React.Component {
constructor(props){
    super(props);
    this.state = {
    teamid: document.getElementById("teamid").value,
    fixtures: [],


    fetch('/api/calendars/search/findByTeamid?teamid='+ this.state.teamid, {
                      method: 'GET',
                      headers: {
                      'Content-Type': 'application/json',
                      },
                      credentials: 'same-origin'
                      }).then((response) => {
                           if(response.ok) {
                             return response.json();
                           } else {
                             throw new Error('Server response wasn\'t OK');
                           }
                         })
                         .then((json) => {
                           this.setState(state => {fixtures: json._embedded.calendars})
                           console.log(this.state.fixtures);
                         });
   };
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
            events: this.state.fixtures
        })
        return (
            calendar.render()
          )
    }
}

ReactDOM.render(
	<Events />,
	document.getElementById('calendar')
)
