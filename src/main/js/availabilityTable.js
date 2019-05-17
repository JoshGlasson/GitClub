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
              console.log(this.state.user);
              console.log(this.state.userid);
              console.log(this.state.teamid);
              console.log(this.state.user);
            });
   }

//   renderTableHeader() {
//      let header = Object.keys(this.state.user)
//      return header.map((key, index) => {
//         return <th key={index}>{key.toUpperCase()}</th>
//      })
//   }

   renderTableData() {
      return this.state.user.map((key) => {
        console.log(key)
//         const {name} = key
         return (
            <tr>
               <td>{key.name}</td>
               <td><input type="checkbox" class="form-check-input" onChange={this.available} name={key._links.self.href.split("/")[key._links.self.href.split("/").length-1]}></input></td>
            </tr>
         )
         console.log(key)
         console.log(document.getElementById("available1").value);

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

           console.log(name)
       if (this.state.available) {
           this.setState({ available:false });
       } else {
           this.setState({ available:true });
//           fetch('/api/availabilities', {
//                                          method: 'POST',
//                                          headers: {
//                                            'Accept': 'application/json',
//                                            'Content-Type': 'application/json',
//                                          },
//                                          body: JSON.stringify({
//                                            fixtureid:
//                                            userid:
//                                          })
//                                        });
//                                        window.alert("Fixture Added");
       }
     };
}



ReactDOM.render(<Table />, document.getElementById('availability'));


