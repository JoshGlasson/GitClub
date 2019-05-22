const React = require('react');
const ReactDOM = require('react-dom');
import WeatherApp from "./weatherApp.js";
import MyMap from "./leafletMap.js";
import Button from 'react-bootstrap/Button';


class App extends React.Component {
constructor(props){
    super(props)
    this.state = {
        teamid: document.getElementById("teamid").value,
        allFixtures: [],
        nextFixture: [],
        role: document.getElementById("role").value,
        lat: undefined,
        lon: undefined,
        place: undefined,
        map: false
    };

    this.prettyDate = this.prettyDate.bind(this);
    this.prettyTime = this.prettyTime.bind(this);

fetch('/api/fixtureses/search/findByTeamid?teamid='+ this.state.teamid, {
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
                var games = [];
                json._embedded.fixtureses.map((item) => {if(new Date(item.date) - new Date() > 0){
                                  games.push(item)}})
                  this.setState({allFixtures: games.sort( function(a, b){ return ((new Date(a.date) - new Date()) - (new Date(b.date) - new Date()))})})
                  console.log(this.state.allFixtures)
                  this.setState({nextFixture: this.state.allFixtures[0]})
                  console.log(this.state.nextFixture)
                  fetch('https://nominatim.openstreetmap.org/search/'+this.state.nextFixture.location+'?format=json&limit=1', {
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
                                          console.log(json)
                                          this.setState({
                                                lat: json[0].lat,
                                                lon: json[0].lon,
                                                place: json[0].display_name
                                              })
                                          console.log(this.state.lat)
                                          });
                });


}

  render() {

  const dateAndTime = (this.state.nextFixture === [] ? null : this.prettyDate(this.state.nextFixture.date) + ' - ' + this.prettyTime(this.state.nextFixture.date) )
  const weather = (this.state.lat === undefined ? <h3>Loading Weather...</h3> : <WeatherApp lat={this.state.lat} lng={this.state.lon} date={this.state.nextFixture.date} loc={this.state.place}/>)

    return (
    <div>
     <h3>Match Day Weather On {dateAndTime}</h3>
        {weather}
    </div>
    )
  }

      prettyDate(value){
         var monthNames = [
             "January", "February", "March",
             "April", "May", "June", "July",
             "August", "September", "October",
             "November", "December"
          ];

          var fulldate = new Date(value)
          var day = (fulldate.getDate() > 9 ? fulldate.getDate() : '0'+fulldate.getDate())
          var month = fulldate.getMonth()
          var year = fulldate.getFullYear()
          return (day+"-"+monthNames[month]+"-"+year)
      }


      prettyTime(value){
          var fulldate = new Date(value)
          var hour = (fulldate.getHours() > 9 ? fulldate.getHours() : '0' + fulldate.getHours())
          var minutes = (fulldate.getMinutes() > 9 ? fulldate.getMinutes() : '0' + fulldate.getMinutes())
          var seconds = (fulldate.getSeconds() > 9 ? fulldate.getSeconds() : '0' + fulldate.getSeconds())
          return (hour+":"+minutes+":"+seconds)
      }


}

ReactDOM.render(
	<App />,
	document.getElementById('landingPage')
)


