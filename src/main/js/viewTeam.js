const React = require('react');
const ReactDOM = require('react-dom');
import Team from './team';

class ViewTeam extends React.Component {

constructor(props){
    super(props)
    this.state = {
        teamid: document.getElementById("teamid").value,
        team: [],
        teamName: null,
    };


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
           this.setState({team: json._embedded.users})
           console.log(this.state.teamid);
         });

    fetch('/api/teams/'+ this.state.teamid, {
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
               this.setState({teamName: json.teamname})
               console.log(this.state.teamName);
             });
}


  render() {

  const name = (this.state.teamName === null ? <h1>Loading...</h1> : this.state.teamName)

  const headers =   <thead class="thead-dark">
                              <tr>
                                  <th>Player Name</th>
                                  <th>Position</th>
                                  <th>Delete Player</th>
                               </tr>
                            </thead>

  const content = (this.state.team === [] ? <h1>Loading...</h1> : this.state.team.map((item) => <Team item={item} key={item.id} />))

    return (
    <div>
    <h1>{name}</h1>
     <table class="table table-bordered" style={{ width:500, maxWidth:1000 }}>
        {headers}
        {content}
    </table>
    </div>
    )
  }




}

ReactDOM.render(
	<ViewTeam />,
	document.getElementById('viewTeam')
)


