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
        <div>
           <form class="form-inline" onSubmit={this.validateForm} style={{ display: 'inline-block', width:200}}>
              <input style={{ minWidth:50, maxWidth:100, width:80, fontSize:10 }} type="number" class="form-control mr-sm-2" name="home" value={this.state.home} onChange={this.handleInputChange} placeholder="Home"></input>
              <input style={{ minWidth:50, maxWidth:100, width:80, fontSize:10 }} type="number" class="form-control mr-sm-2" name="away" value={this.state.away} onChange={this.handleInputChange} placeholder="Away"></input>
              <button type="button" class="btn btn-primary form-inline btn-sm" onClick={this.validateForm}>Submit</button>
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


