import React, {Component} from 'react';

class Events extends Component {
constructor(props){
    super(props)
    this.state = {fixtures: [], teamid: document.getElementById("teamid").value};
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
             });
}



    render() {
        return (
            {title: this.state.fixtures.fixture,
            start: this.state.fixtures.date
            }
        );
    }
}

export default Events;