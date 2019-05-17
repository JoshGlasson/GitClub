const React = require('react');
const ReactDOM = require('react-dom');
import Fixtures from './fixtures';

class ViewResults extends React.Component {

constructor(props){
    super(props)
    this.state = {
        teamid: document.getElementById("teamid").value,
        fixtures: [],
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
           this.setState({fixtures: json._embedded.fixtureses})
           console.log(this.state.fixtures);
           console.log(this.state.teamid);
         });
}


  render() {

  const headers =   <thead class="thead-primary">
                        <tr>
                            <th>Fixtures</th>
                            <th>Date</th>
                            <th>Score</th>
                            <th>Location</th>
                            <th>Add Score</th>
                            <th>Delete Fixture</th>
                        </tr>
                    </thead>

  const contents = this.state.fixtures.sort( function(a, b){ return new Date(a.date) - new Date(b.date)})
                                          .map((item, key) => <Fixtures item={item} key={item.id} />)

    return (
    <div>
    <table class="table">
        {headers}
        {contents}
    </table>
    </div>
    )
  }
}

ReactDOM.render(
	<ViewResults />,
	document.getElementById('viewResults')
)


