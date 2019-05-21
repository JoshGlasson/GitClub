const React = require('react');
const ReactDOM = require('react-dom');
import WeatherApp from "./weatherApp.js";


class App extends React.Component {
constructor(props){
    super(props)
    this.state = {
        role: document.getElementById("role").value
    };


}

  render() {
    let managerView;
      if(this.state.role === "manager"){
        managerView = 'Manager'

      } else {
        managerView = 'Player'
      }

    return (
    <div>
        <h1>"Hello"</h1>
        {managerView}

    </div>

    )
  }


}

ReactDOM.render(
	<App />,
	document.getElementById('landingPage')
)


