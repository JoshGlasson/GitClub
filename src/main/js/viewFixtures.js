const React = require('react');
const ReactDOM = require('react-dom');
import Fixtures from './fixtures';

class ViewFixtures extends React.Component {

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
    {this.state.fixtures.reverse().map((item, key) =>
                           <Fixtures item={item} key={item.id} />
                       )}
    </div>
    )
  }

    getPosts() {
      return this.props.posts.sort( function(a, b){
      return new Date(b.time_stamp) - new Date(a.time_stamp);
      }).map(post =>
  			<Post key={post._links.self.href} post={post}/>

  		);
    }


}

ReactDOM.render(
	<ViewFixtures />,
	document.getElementById('viewFixtures')
)


