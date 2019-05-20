import React, {Component} from 'react';
const ReactDOM = require('react-dom');

class Availability extends Component {
constructor(props){
    super(props);
    this.state = {allFixtures: [], nextFixture: [], nextFixtureID: null, userid: this.props.item._links.self.href.split("/")[this.props.item._links.self.href.split("/").length-1], checked: false };
    this.available = this.available.bind(this);

    fetch('/api/fixtureses/search/findByTeamid?teamid='+ this.props.team, {
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
                      fetch('/api/availabilities/search/findByFixtureidAndUserid?fixtureid='+ this.state.nextFixtureID +'&userid='+ this.state.userid, {
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
                                             if(json._embedded.availabilities.length > 0){
                                             this.setState({checked: true});
                                             } else {
                                             this.setState({checked: false});
                                             }
                                             });
                    });



}

    render() {
        return (
        <tbody>
          <td>{this.props.item.name}</td>
          <td><input type="checkbox" class="form-check-input" checked={this.state.checked} onChange={this.available} name='checked'></input></td>
        </tbody>
         )
    };



    available(event){
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      console.log(target.checked)
      console.log(name)

      this.setState({
        [name]: value
      });

      if (target.checked) {
          console.log("ADD TO DB")
          fetch('/api/availabilities', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fixtureid: this.state.nextFixtureID,
              userid: this.state.userid,
            })
          });
          if(window.location.href.indexOf('landingpage')){
          location.href = self.location.href;
          };
      } else {
          console.log("DELETE FROM DB")
          fetch('/api/availabilities/search/findByFixtureidAndUserid?fixtureid='+ this.state.nextFixtureID +'&userid='+ this.state.userid, {
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
                     var availabilityID = (json._embedded.availabilities[0]._links.self.href.split("/")[json._embedded.availabilities[0]._links.self.href.split("/").length-1]);
                     fetch('/api/availabilities/'+ availabilityID, {
                                                    method: 'DELETE',
                                                    headers: {
                                                      'Accept': 'application/json',
                                                      'Content-Type': 'application/json',
                                                    },
                                                  });
                   });
                   if(window.location.href.indexOf('landingpage')){
                     location.href = self.location.href;
                   };
       }
    };
}

export default Availability;