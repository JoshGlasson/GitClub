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


  //getWeather is a method we'll use to make the api call
  this.getWeather = async (e) => {

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
    const response = await api_call.json();
    console.log(response);
    if(city && country){
      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: ""
      })
    }else{
      this.setState({
        error: "Please input search values..."
      })
    }
  }

  }

  render(){
      return(
        <div>
          <Form loadWeather={this.getWeather} />
          <Weather
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error} />
        </div>
      )
    };

};

export default WeatherApp;

//ReactDOM.render(
//	<WeatherApp />,
//	document.getElementById('weatherApp')
//)
