const React = require('react');
const ReactDOM = require('react-dom');
import Weather from "./weather.js";
import Form from "./form.js";


const Api_Key = "8d2de98e089f1c28e1a22fc19a24ef04";

class WeatherApp extends React.Component {
  constructor(props){
    super(props)
   this.state = {

    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  fetch('http://api.openweathermap.org/data/2.5/weather?q='+this.props.item.location+',UK&appid='+Api_Key).then((response) => {
                                    if(response.ok) {
                                      return response.json();
                                    } else {
                                      throw new Error('Server response wasn\'t OK');
                                    }
                                  })
                                  .then((json) => {
                                  console.log(json)
                                  this.setState({
                                          temperature: json.main.temp,
                                          city: json.name,
                                          country: json.sys.country,
                                          humidity: json.main.humidity,
                                          description: json.weather[0].description,
                                          error: ""
                                        })
                               });


//  // getWeather is a method we'll use to make the api call
//  this.getWeather = async (e) => {
//    const city = this.props.item.location;
//    const country = 'UK';
//    e.preventDefault();
//    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
//    const response = await api_call.json();
//    console.log(response);
//    if(city && country){
//      this.setState({
//        temperature: response.main.temp,
//        city: response.name,
//        country: response.sys.country,
//        humidity: response.main.humidity,
//        description: response.weather[0].description,
//        error: ""
//      })
//    }else{
//      this.setState({
//        error: "Please input search values..."
//      })
//    }
//  }

  }

  render(){
  const weather = (this.state.temperature === undefined ? <h1>Loading...</h1> : <Weather temperature={this.state.temperature} city={this.state.city} country={this.state.country} humidity={this.state.humidity} description={this.state.description} error={this.state.error} />)
      return(
        <div>
          {weather}
        </div>
      )
    };

};

export default WeatherApp;

//ReactDOM.render(
//	<WeatherApp />,
//	document.getElementById('weatherApp')
//)
