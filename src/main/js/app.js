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
        <img src={'https://upload.wikimedia.org/wikipedia/commons/c/c9/Boisko.svg'} alt="Pitch"/>
    </div>

    )
  }


}

ReactDOM.render(
	<App />,
	document.getElementById('landingPage')
)


