const React = require('react');
const ReactDOM = require('react-dom');
import MyMap from "./leafletMap.js";
import Button from 'react-bootstrap/Button';


class MapPage extends React.Component {
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

  const lmap = (this.state.lat === undefined ? <h3>Loading Map...</h3> : <MyMap lat={this.state.lat} lng={this.state.lon} loc={this.state.nextFixture.location} />)

    return (
    <div>
     <h3>Next Match Location</h3>
        {lmap}
    </div>
    )
  }


}

ReactDOM.render(
	<MapPage />,
	document.getElementById('mapPage')
)


