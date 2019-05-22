import React, {Component} from 'react';
const ReactDOM = require('react-dom');
import Weather from "./weather.js";

class WeatherApp extends Component {
  constructor(props){
    super(props);
   this.state = {

    temperature: undefined,
    city: this.props.loc,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    weatherId: undefined,
    units: undefined,
  }
  this.formatDate = this.formatDate.bind(this)

  fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/654d610d54d4d93d721496a26d94ade3/'+this.props.lat+','+this.props.lng+','+this.formatDate(this.props.date)+'?units=auto', {
                                       method: 'GET',
                                       mode: 'cors',
                                       crossdomain: true,
                                       headers: {
                                       'Access-Control-Allow-Origin':'*',
                                       },
                                       credentials: 'same-origin'
                                       }).then((response) => {
                                    if(response.ok) {
                                      return response.json();
                                    } else {
                                      throw new Error('Server response wasn\'t OK');
                                    }
                                  })
                                  .then((json) => {
                                  console.log(json)
                                  this.setState({
                                          temperature: json.currently.temperature,
                                          humidity: json.currently.humidity,
                                          description: json.currently.summary,
                                          weatherId: json.currently.icon,
                                          units: json.flags.units,
                                        })
                               });



  }

     formatDate(value){
          var fulldate = new Date(value)
          var day = (fulldate.getDate() > 9 ? fulldate.getDate() : '0'+fulldate.getDate())
          var month = (fulldate.getMonth() + 1 > 9 ? fulldate.getMonth() + 1 : '0'+(fulldate.getMonth() + 1))
          var year = fulldate.getFullYear()
          var hour = (fulldate.getHours() > 9 ? fulldate.getHours() : '0' + fulldate.getHours())
          var minutes = (fulldate.getMinutes() > 9 ? fulldate.getMinutes() : '0' + fulldate.getMinutes())
          var seconds = (fulldate.getSeconds() > 9 ? fulldate.getSeconds() : '0' + fulldate.getSeconds())
          return (year+"-"+month+"-"+day+"T"+hour+":"+minutes+":"+seconds)
      }



  render(){
  const icon = (this.state.weatherId === undefined ? null : <img src={'https://darksky.net/images/weather-icons/'+this.state.weatherId+'.png'} alt="Weather Icon"/>)
  const weather = (this.props.item === null ? <h1>Loading Weather...</h1> : <Weather temperature={this.state.temperature} city={this.state.city} humidity={this.state.humidity} description={this.state.description} units={this.state.units}/>)

      return(
        <div>
          {icon}
          {weather}
        </div>
      )
    };

};

export default WeatherApp;

