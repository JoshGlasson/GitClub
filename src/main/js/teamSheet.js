const React = require('react');
const ReactDOM = require('react-dom');
import GetTeamSheet from './getTeamSheet';


class TeamSheet extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
              teamid: document.getElementById("teamid").value,
              currentUser: document.getElementById("current_user").value,
              user: [],
              userid: null,
              available: false,
              allFixtures: [],
              nextFixture: [],
              nextFixtureID: null,
              players: [],
          }

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
                                  games.push(item)}});
                  this.setState({allFixtures: games.sort( function(a, b){ return ((new Date(a.date) - new Date()) - (new Date(b.date) - new Date()))})});
                  console.log(this.state.allFixtures);
                  this.setState({nextFixture: this.state.allFixtures[0]});
                  console.log(this.state.nextFixture);
                  this.setState({nextFixtureID: this.state.nextFixture._links.self.href.split("/")[this.state.nextFixture._links.self.href.split("/").length-1]});
                  console.log(this.state.nextFixtureID);
                  fetch('/api/availabilities/search/findByFixtureid?fixtureid='+ this.state.nextFixtureID, {
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
                                this.setState({players: json._embedded.availabilities})
                             });
                  });


    }

    render() {


        const headers =   <thead class="thead-dark">
                            <tr>
                                <th>Confirmed Players</th>
                             </tr>
                          </thead>

        const content = (this.state.nextFixtureID === null ? <h1>Loading...</h1> : this.state.players.map((item) => <GetTeamSheet item={item}/>))

        console.log(this.state.currentUser)


    return (
    <div>
    <h1>Team Sheet for Next Game</h1>
    <table class="table table-bordered">
        {headers}
        {content}
    </table>
    </div>
    )
  }

}



ReactDOM.render(<TeamSheet />, document.getElementById('teamSheet'));


