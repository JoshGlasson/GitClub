const React = require('react');
const ReactDOM = require('react-dom');
import './availabilityTable.css';

class Table extends React.Component {
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
          }

      this.available = this.available.bind(this);

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
                  this.setState({nextFixture: this.state.allFixtures[0]})
                  this.setState({nextFixtureID: this.state.nextFixture._links.self.href.split("/")[this.state.nextFixture._links.self.href.split("/").length-1]})
                  console.log(this.state.nextFixtureID)
                });



   }


   renderTableData() {
      return this.state.user.map((key) => {
         return (
            <tr>
               <td>{key.name}</td>
               <td><input type="checkbox" class="form-check-input" onChange={this.available} name={key._links.self.href.split("/")[key._links.self.href.split("/").length-1]}></input></td>
            </tr>
         )
      })

   }

   render() {
      return (
         <div>
            <h1 id='title'> Team Availability</h1>
            <table id='players'>
               <tbody>

                  {this.renderTableData()}

               </tbody>
            </table>
         </div>
      )
   }

    available(event){
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      console.log(target.checked)
      console.log(name)

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
              userid: name,
            })
          });
      } else {
          console.log("DELETE FROM DB")
          fetch('/api/availabilities/search/findByFixtureidAndUserid?fixtureid='+ this.state.nextFixtureID +'&userid='+ name, {
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
       }
    };
}



ReactDOM.render(<Table />, document.getElementById('availability'));


