const React = require('react');
const ReactDOM = require('react-dom');
import Availability from './availability';

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
      this.prettyDate = this.prettyDate.bind(this);
      this.prettyTime = this.prettyTime.bind(this);


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

   render() {

   const headers =   <thead class="thead-dark">
                           <tr>
                               <th>Player</th>
                               <th>{this.state.nextFixture.fixture + ' - ' + this.prettyDate(this.state.nextFixture.date) + ' ' + this.prettyTime(this.state.nextFixture.date)}</th>
                           </tr>
                       </thead>


   const contents = this.state.user.map((item, key) => <Availability item={item} team={this.state.teamid} />)

      return (
         <div>
            <h1 id='title'> Team Availability</h1>
            <table class="table table-bordered" style={{ width:500, maxWidth:1000 }}>
               {headers}
               {contents}
           </table>
         </div>
      )
   }

   prettyDate(value){
          var monthNames = [
              "January", "February", "March",
              "April", "May", "June", "July",
              "August", "September", "October",
              "November", "December"
           ];

           var fulldate = new Date(value)
           var day = (fulldate.getDate() > 9 ? fulldate.getDate() : '0'+fulldate.getDate())
           var month = fulldate.getMonth()
           var year = fulldate.getFullYear()
           return (day+"-"+monthNames[month]+"-"+year)
       }


       prettyTime(value){
           var fulldate = new Date(value)
           var hour = (fulldate.getHours() > 9 ? fulldate.getHours() : '0' + fulldate.getHours())
           var minutes = (fulldate.getMinutes() > 9 ? fulldate.getMinutes() : '0' + fulldate.getMinutes())
           var seconds = (fulldate.getSeconds() > 9 ? fulldate.getSeconds() : '0' + fulldate.getSeconds())
           return (hour+":"+minutes+":"+seconds)
       }

}



ReactDOM.render(<Table />, document.getElementById('availability'));


