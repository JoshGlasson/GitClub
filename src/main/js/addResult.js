const React = require('react');
const ReactDOM = require('react-dom');
import Fixtures from './fixtures';

class AddResult extends React.Component {

constructor(props){
    super(props)
    this.state = {
        home: '',
        away: '',

    };
    this.addResult = this.addResult.bind(this);
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
    <h4>Add Match Result</h4>
        <div class="form-group">
           <form onSubmit={this.validateForm} style={{ minWidth:100, maxWidth:500, width:160 }} action="/addResult">
              <input type="number" class="form-control" name="home" value={this.state.home} onChange={this.handleInputChange} placeholder="Home Score"></input>
              <input type="number" class="form-control" name="away" value={this.state.away} onChange={this.handleInputChange} placeholder="Away Score"></input>
              <button type="button" class="btn btn-primary" onClick={this.validateForm} >Submit</button>
           </form>
        </div>
    </div>
    )
  }


  validateForm(){
  console.log("VALIDATE FORM")
    if(this.state.home === '' || this.state.away === '') {
          window.alert("Please fill in all the fields")
      } else {
          this.addResult();
        location.href = self.location.href;
      }
  }


  addResult(){
  console.log("ADD FIXTURE")
        fetch('/api/fixtureses/'+ this.props.item, {
                               method: 'PATCH',
                               headers: {
                                 'Accept': 'application/json',
                                 'Content-Type': 'application/json',
                               },
                               body: JSON.stringify({
                                 result: this.state.home + ' - ' + this.state.away
                               })

                             });
                             location.href = self.location.href;



  }
}

export default AddResult;


