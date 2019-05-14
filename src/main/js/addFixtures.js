const React = require('react');
const ReactDOM = require('react-dom');


class AddFixtures extends React.Component {

constructor(props){
    super(props)
    this.state = {
        training:false,
        teamid:document.getElementById("teamid")
    };
    this.training = this.training.bind(this);
    this.addFixture = this.addFixture.bind(this);
}

  render() {
    return (
    <div class="form-group">
       <form onSubmit={this.addFixture} action="/addFixtures">
          <input type="text" class="form-control" id={"home"}  placeholder="Home Team"></input>
          <input type="text" class="form-control" id={"away"}  placeholder="Away Team"></input>
          <input type="date" class="form-control" id={"date"}  placeholder="Enter Date"></input>
          <input type="time" class="form-control" id={"time"}  placeholder="Enter Time"></input>
          <input type="text" class="form-control" id={"location"}  placeholder="Enter Location"></input>
          <input type="checkbox" class="form-control" id={"training"} onClick={this.training} name="Training" value="Training"></input>
          <a href="/"><button type="button" class="btn btn-primary" onClick={this.addFixture} >Submit</button></a>
       </form>
    </div>
    )
  }
  training(){
    if (this.state.training) {
        this.setState({training:false});
        }
    else {this.setState({
        training:true})
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
                                 fixture: document.getElementById("home").value + " v " + document.getElementById("away").value,
                                 date: document.getElementById("date").value + " " + document.getElementById("time").value,
                                 location: document.getElementById("location").value,
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


