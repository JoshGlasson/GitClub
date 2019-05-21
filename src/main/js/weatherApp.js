import React, {Component} from 'react';
const ReactDOM = require('react-dom');
import Weather from "./weather.js";


const Api_Key = "8d2de98e089f1c28e1a22fc19a24ef04";

class WeatherApp extends Component {
  constructor(props){
    super(props);
   this.state = {

    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    weatherId: undefined
  }

  fetch('http://api.openweathermap.org/data/2.5/weather?q='+this.props.item+',UK&appid='+Api_Key+'&units=metric').then((response) => {
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
                                          weatherId: json.weather[0].icon,
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
console.log(this.props.item)
  }



  render(){
  const icon = (this.state.weatherId === undefined ? null : <img src={'http://openweathermap.org/img/w/'+this.state.weatherId+'.png'} alt="Weather Icon"/>)
  const weather = (this.props.item === null ? <h1>Loading Weather...</h1> : <Weather temperature={this.state.temperature} city={this.state.city} country={this.state.country} humidity={this.state.humidity} description={this.state.description} error={this.state.error} />)
      return(
        <div>
          {icon}
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
