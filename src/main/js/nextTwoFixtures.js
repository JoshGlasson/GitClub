const React = require('react');
const ReactDOM = require('react-dom');
import Fixtures from './fixtures';
import WeatherApp from "./weatherApp.js";

class NextTwoFixtures extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
              teamid: document.getElementById("teamid").value,
              user: [],
              userid: null,
              available: false,
              allFixtures: [],
              nextFixtures: [],
              nextFixture: [],
          }


   fetch('/api/users/search/findByTeamid?teamid='+ this.state.teamid, {
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
              this.setState({user: json._embedded.users});
              console.log(this.state.user)
            });

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
                  var twoGames = [];
                  twoGames.push(this.state.allFixtures[0]);
                  twoGames.push(this.state.allFixtures[1]);
                  this.setState({nextFixtures: twoGames})
                  console.log(this.state.nextFixtures)
                });



   }

    render() {

        const headers =   <thead class="thead-dark">
                        <tr>
                            <th>Fixtures</th>
                            <th>Date</th>
                            <th>Score</th>
                            <th>Location</th>
                            <th>Add Score</th>
                            <th>Delete Fixture</th>
                        </tr>
                    </thead>


        const contents = this.state.nextFixtures.sort( function(a, b){ return (a._links.self.href.split("/")[a._links.self.href.split("/").length-1]) - (b._links.self.href.split("/")[b._links.self.href.split("/").length-1])})
                                       .map((item, key) => <Fixtures item={item} key={item.id} />)

        const weather = (this.state.nextFixture === [] ? <h3>Loading Weather...</h3> : <WeatherApp item={this.state.nextFixture} />)

    return (
    <div>
    <h1>Next Two Fixtures</h1>
    <table class="table table-bordered">
        {headers}
        {contents}
    </table>
    {weather}
    </div>
    )
  }

}



ReactDOM.render(<NextTwoFixtures />, document.getElementById('nextTwoFixtures'));


