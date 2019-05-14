const React = require('react');
const ReactDOM = require('react-dom');


class AddFixtures extends React.Component {

constructor(props){
    super(props)
    this.state = {
        training: false,
        teamid: document.getElementById("teamid").value
    };
    this.training = this.training.bind(this);
    this.addFixture = this.addFixture.bind(this);
}

  render() {
  console.log(this.state.teamid)
    return (
    <div>
    <h1>Add Fixtures</h1>
    <div class="form-group">
       <form onSubmit={this.addFixture} style={{ minWidth:100, maxWidth:500, width:300 }} action="/addFixtures">
           <select type="text" class="form-control" id={"season"}  placeholder="Pick a Season" required={true}>
               <option value="19/20"> "19/20" </option>
               <option value="20/21"> "20/21" </option>
               <option value="21/22"> "21/22" </option>
               <option value="22/23"> "22/23" </option>
               <option value="23/24"> "23/24" </option>
           </select>
          <input type="text" class="form-control" id={"home"} required={true}  placeholder="Home Team"></input>
          <input type="text" class="form-control" id={"away"} required={true} placeholder="Away Team" disabled={(this.state.training)? "disabled" : ""}></input>
          <input type="date" class="form-control" id={"date"} required={true} placeholder="Enter Date"></input>
          <input type="time" class="form-control" id={"time"} required={true} placeholder="Enter Time"></input>
          <input type="text" class="form-control" id={"location"} required={true} placeholder="Enter Location"></input>
          <label class="form-check-label" htmlFor="training" style={{ paddingRight:"30px" }}>
            Training Session?
          </label>
          <input type="checkbox" class="form-check-input" id={"training"} required={true} onClick={this.training} name="Training" value="Training"></input>
          <br />
          <a href="/addFixtures"><button type="button" class="btn btn-primary" onClick={this.addFixture} >Submit</button></a>
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

  addFixture(){
    if (this.state.teamid !== "") {
        fetch('/api/fixtureses', {
                               method: 'POST',
                               headers: {
                                 'Accept': 'application/json',
                                 'Content-Type': 'application/json',
                               },
                               body: JSON.stringify({
                                 fixture: document.getElementById("home").value + (this.state.training ? ' Training' : ' v ' + document.getElementById("away").value),
                                 date: document.getElementById("date").value + " " + document.getElementById("time").value + ":00",
                                 location: document.getElementById("location").value,
                                 season: document.getElementById("season").value,
                                 training: this.state.training,
                                 teamid: this.state.teamid,
                               })
                             })
     }
  }
}

ReactDOM.render(
	<AddFixtures />,
	document.getElementById('addFixtures')
)


