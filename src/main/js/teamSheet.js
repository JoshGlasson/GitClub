const React = require('react');
const ReactDOM = require('react-dom');
import Fixtures from './fixtures';

class TeamSheet extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
              teamid: document.getElementById("teamid").value,
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
                                  games.push(item)}})
                  this.setState({allFixtures: games.sort( function(a, b){ return ((new Date(a.date) - new Date()) - (new Date(b.date) - new Date()))})})
                  this.setState({nextFixture: this.state.allFixtures[0]})
                  this.setState({nextFixtureID: this.state.nextFixture._links.self.href.split("/")[this.state.nextFixture._links.self.href.split("/").length-1]})
                  console.log(this.state.nextFixtureID)
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
                                  var confirmedPlayers = [];
                                  confirmedPlayers = json._embedded.availabilities;
                                  var playerNames =[];
                                  confirmedPlayers.map((item) =>
                                  fetch('/api/users/'+ item.userid, {
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
                                             playerNames.push(json);
                                           })
                                  )
                                  console.log(playerNames)
                                  this.setState({players: playerNames})
                               })
                });



   }

    render() {

        console.log(this.state.players)

        const headers =   <thead class="thead-dark">
                            <tr>
                                <th>Confirmed</th>
                             </tr>
                          </thead>


        const contents = (this.state.players === [] ? null : this.state.players.map((item) => <td>{item}</td>))
        console.log(contents)

        const table = (contents === null ? <h1>Loading...</h1> : <table class="table table-bordered">{headers}<tbody>{contents}</tbody></table>)

    return (
    <div>
    <h1>Next Two Fixtures</h1>
    {table}
    </div>
    )
  }

}



ReactDOM.render(<TeamSheet />, document.getElementById('teamSheet'));


