const React = require('react');
const ReactDOM = require('react-dom');
import Team from './team';

class ViewTeam extends React.Component {

constructor(props){
    super(props)
    this.state = {
        teamid: document.getElementById("teamid").value,
        team: [],
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
}


  render() {
    return (
    <div>
    <h1>View Team</h1>
    {this.state.team.map((item, key) =>
                           <Team item={item} key={item.id} />
                       )}
    </div>
    )
  }


}

ReactDOM.render(
	<ViewTeam />,
	document.getElementById('viewTeam')
)


