const React = require('react');
const ReactDOM = require('react-dom');
import Fixtures from './fixtures';

class AddFixtures extends React.Component {

constructor(props){
    super(props)
    this.state = {
        training: false,
        teamid: document.getElementById("teamid").value,
        opponent: '',
        date: '',
        time: '',
        location: '',
        season: '',
        fixtures: [],
        teamname: null,
        homeCheck: true,
        role: document.getElementById("role").value,
    };
    this.training = this.training.bind(this);
    this.addFixture = this.addFixture.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.homeCheck = this.homeCheck.bind(this);
    this.awayCheck = this.awayCheck.bind(this);

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
               this.setState({teamname: json.teamname})
               console.log(this.state.teamname);
             });
}

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
      }


  render() {

  const managerHeaders =   <thead class="thead-dark">
                         <tr>
                             <th>Fixtures</th>
                             <th>Date</th>
                             <th>Score</th>
                             <th>Location</th>
                             <th>Add Score</th>
                             <th>Delete Fixture</th>
                         </tr>
                     </thead>

  const playerHeaders =   <thead class="thead-dark">
                         <tr>
                             <th>Fixtures</th>
                             <th>Date</th>
                             <th>Score</th>
                             <th>Location</th>
                         </tr>
                     </thead>

  const headers = (this.state.role === 'manager' ? managerHeaders : playerHeaders)


  const contents = this.state.fixtures.sort( function(a, b){ return (b._links.self.href.split("/")[b._links.self.href.split("/").length-1]) - (a._links.self.href.split("/")[a._links.self.href.split("/").length-1])})
                                       .map((item, key) => <Fixtures item={item} key={item.id} />)

  let fixtureBox;
  fixtureBox =
  <div className='fixtures-item'>
      <div class="card">
           <div class="card-header" id={"fixtures"}>
               <h2 class="mb-0">
                   <button class="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapse"} aria-expanded="true" aria-controls={"collapse"}>
                       <h5>View Fixtures</h5>
                   </button>
               </h2>
           </div>

           <div id={"collapse"} class="collapse" aria-labelledby={"fixtures"}>
               <div class="card-body">
                   <table class="table table-bordered">
                       {headers}
                       {contents}
                   </table>
               </div>
           </div>
      </div>
  </div>



    return (
    <div>
    <h1>Add Fixtures</h1>
    <div class="form-group">
       <form onSubmit={this.validateForm} style={{ minWidth:100, maxWidth:500, width:300 }} action="/addFixtures">
           <select type="text" class="form-control" id="season" name="season" onChange={this.handleInputChange} placeholder="Pick a Season">
               <option value="" disabled selected hidden>Select a Season</option>
               <option value="19/20"> 19/20 </option>
               <option value="20/21"> 20/21 </option>
               <option value="21/22"> 21/22 </option>
               <option value="22/23"> 22/23 </option>
               <option value="23/24"> 23/24 </option>
           </select>

           <div class="form-check form-check-inline">
             <input class="form-check-input" type="radio" name="homeCheckbox" id="homeCheckbox" value="homeCheckbox" onClick={this.homeCheck} checked={this.state.homeCheck} ></input>
             <label class="form-check-label" for="homeCheckbox">Home?</label>
           </div>
           <div class="form-check form-check-inline">
             <input class="form-check-input" type="radio" name="awayCheckbox" id="awayCheckbox" value="awayCheckbox" onClick={this.awayCheck} checked={!this.state.homeCheck} ></input>
             <label class="form-check-label" for="awayCheckbox">Away?</label>
           </div>

          <input type="text" class="form-control" name="opponent" value={this.state.opponent} onChange={this.handleInputChange}  placeholder="Opponent" disabled={(this.state.training)? "disabled" : ""}></input>
          <input type="date" class="form-control" name="date" value={this.state.date} onChange={this.handleInputChange}  placeholder="Enter Date"></input>
          <input type="time" class="form-control" name="time" value={this.state.time} onChange={this.handleInputChange}  placeholder="Enter Time"></input>
          <input type="text" class="form-control" name="location" value={this.state.location} onChange={this.handleInputChange}  placeholder="Enter Location"></input>
          <label class="form-check-label" htmlFor="training" style={{ paddingRight:"30px" }}>
            Training Session?
          </label>
          <input type="checkbox" class="form-check-input" name="training" onClick={this.training} name="Training" value="Training"></input>
          <br />
          <button type="button" class="btn btn-primary" onClick={this.validateForm} >Submit</button>
       </form>
    </div>

    {fixtureBox}

    </div>
    )
  }

  training(){
    if (this.state.training) {
        this.setState({ training:false });
    } else {
        this.setState({ training:true });
    }
  };


  homeCheck(){
    this.setState({ homeCheck:true });
  };

  awayCheck(){
    this.setState({ homeCheck:false });
  };

  validateForm(){
  console.log("VALIDATE FORM")
  if(this.state.training){
    if(this.state.date === '' || this.state.time === '' || this.state.location === '' || this.state.season === '') {
          window.alert("Please fill in all the fields. Missing:" + (this.state.date === '' ? '\nDate' : '') + (this.state.time === '' ? '\nTime' : '') + (this.state.location === '' ? '\nLocation' : '') + (this.state.season === '' ? '\nSeason' : ''))
      } else {
           console.log("Add Training")
          this.addFixture();
      }
  } else {
    if(this.state.opponent === '' || this.state.date === '' || this.state.time === '' || this.state.location === '' || this.state.season === '') {
          window.alert("Please fill in all the fields. Missing:" + (this.state.opponent === '' ? "\nOpponent" : '') + (this.state.date === '' ? "\nDate" : '') + (this.state.time === '' ? '\nTime' : '') + (this.state.location === '' ? '\nLocation' : '') + (this.state.season === '' ? '\nSeason' : ''))
      } else {
          this.addFixture();
      }
  }
  };

  addFixture(){
  console.log("ADD FIXTURE")
    if (this.state.teamid !== "") {
        fetch('/api/fixtureses', {
                               method: 'POST',
                               headers: {
                                 'Accept': 'application/json',
                                 'Content-Type': 'application/json',
                               },
                               body: JSON.stringify({
                                 fixture: (this.state.training ? this.state.teamname + ' Training' : (this.state.homeCheck ? this.state.teamname + ' v ' + this.state.opponent : this.state.opponent + ' v ' + this.state.teamname)),
                                 date: this.state.date + " " + this.state.time + ":00",
                                 location: this.state.location,
                                 season: this.state.season,
                                 training: this.state.training,
                                 teamid: this.state.teamid,
                               })
                             });
                             window.alert("Fixture Added");
        fetch('/api/calendars', {
                                       method: 'POST',
                                       headers: {
                                         'Accept': 'application/json',
                                         'Content-Type': 'application/json',
                                       },
                                       body: JSON.stringify({
                                         title: (this.state.training ? this.state.teamname + ' Training' : (this.state.homeCheck ? this.state.teamname + ' v ' + this.state.opponent : this.state.opponent + ' v ' + this.state.teamname)),
                                         start: this.state.date + "T" + this.state.time + ":00",
                                         color: (this.state.training ? '#F75D59' : '#59F2F7'),
                                         teamid: this.state.teamid,
                                       })
                                     });
                                     location.href = window.location.href
     }
  };


}

ReactDOM.render(
	<AddFixtures />,
	document.getElementById('addFixtures')
)


// SORT BY DATE
//{this.state.fixtures.sort( function(a, b){ return new Date(b.date) - new Date(a.date);}).map((item, key) => <Fixtures item={item} key={item.id} />)}