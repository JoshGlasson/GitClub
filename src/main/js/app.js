const React = require('react');
const ReactDOM = require('react-dom');


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
        managerView = <a href="/addFixtures">Add Fixtures</a>
      } else {
        managerView = <a href="/viewFixtures">View Fixtures</a>
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


