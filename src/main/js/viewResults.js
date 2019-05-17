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
    return (
    <div>
    <h1>Fixtures</h1>
    {this.state.fixtures.sort( function(a, b){ return (b._links.self.href.split("/")[b._links.self.href.split("/").length-1]) - (a._links.self.href.split("/")[a._links.self.href.split("/").length-1])})
                        .map((item, key) => <Fixtures item={item} key={item.id} />)}
    </div>
    )
  }
}

ReactDOM.render(
	<ViewResults />,
	document.getElementById('viewResults')
)


