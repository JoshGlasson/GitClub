const React = require('react');
const ReactDOM = require('react-dom');

class AddFixtures extends React.Component {

constructor(props){
    super(props)
    this.state = {
        training: false,
        teamid: document.getElementById("teamid").value,
        home: '',
        away: '',
        date: '',
        time: '',
        location: '',
    };
    this.training = this.training.bind(this);
    this.addFixture = this.addFixture.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
    return (
    <div>
    <h1>Add Fixtures</h1>
    <div class="form-group">
       <form onSubmit={this.validateForm} style={{ minWidth:100, maxWidth:500, width:300 }} action="/addFixtures">
           <select type="text" class="form-control" id="season"  placeholder="Pick a Season">
               <option value="" disabled selected hidden>Select a Season</option>
               <option value="19/20"> 19/20 </option>
               <option value="20/21"> 20/21 </option>
               <option value="21/22"> 21/22 </option>
               <option value="22/23"> 22/23 </option>
               <option value="23/24"> 23/24 </option>
           </select>
          <input type="text" class="form-control" name="home" value={this.state.home} onChange={this.handleInputChange} placeholder="Home Team"></input>
          <input type="text" class="form-control" name="away" value={this.state.away} onChange={this.handleInputChange}  placeholder="Away Team" disabled={(this.state.training)? "disabled" : ""}></input>
          <input type="date" class="form-control" name="date" value={this.state.date} onChange={this.handleInputChange}  placeholder="Enter Date"></input>
          <input type="time" class="form-control" name="time" value={this.state.time} onChange={this.handleInputChange}  placeholder="Enter Time"></input>
          <input type="text" class="form-control" name="location" value={this.state.location} onChange={this.handleInputChange}  placeholder="Enter Location"></input>
          <label class="form-check-label" htmlFor="training" style={{ paddingRight:"30px" }}>
            Training Session?
          </label>
          <input type="checkbox" class="form-check-input" name="training" onClick={this.training} name="Training" value="Training"></input>
          <br />
          <a href="/addFixtures"><button type="button" class="btn btn-primary" onClick={this.validateForm} >Submit</button></a>
       </form>
    </div>
    </div>
    )
  }

  training(){
    if (this.state.training) {
        this.setState({ training:false });
    } else {
        this.setState({ training:true });
    }
  }

  validateForm(){
  console.log("VALIDATE FORM")
  if(this.state.training){
    if(this.state.home === '' || this.state.date === '' || this.state.time === '' || this.state.location === '') {
          window.alert("Please fill in all the fields")
      } else {
           console.log("Add Training")
          this.addFixture();
      }
  } else {
    if(this.state.home === '' || this.state.away === '' || this.state.date === '' || this.state.time === '' || this.state.location === '') {
          window.alert("Please fill in all the fields")
      } else {
          this.addFixture();
      }
  }

  }

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
                                 fixture: this.state.home + (this.state.training ? ' Training' : ' v ' + this.state.away),
                                 date: this.state.date + " " + this.state.time + ":00",
                                 location: this.state.location,
                                 season: document.getElementById("season").value,
                                 training: this.state.training,
                                 teamid: this.state.teamid,
                               })
                             });
                             window.alert("Fixture Added");
     }
  }

}

ReactDOM.render(
	<AddFixtures />,
	document.getElementById('addFixtures')
)


