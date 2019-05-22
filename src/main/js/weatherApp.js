import React, {Component} from 'react';
const ReactDOM = require('react-dom');
import Weather from "./weather.js";
import GoogleApiWrapper from "./map.js";
import MyMap from "./leafletMap.js";
import Button from 'react-bootstrap/Button';

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
    weatherId: undefined,
    lat: undefined,
    lon: undefined,
    map: true,
  }

  fetch('https://api.openweathermap.org/data/2.5/weather?q='+this.props.item+',UK&appid='+Api_Key+'&units=metric').then((response) => {
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
                                          lat: json.coord.lat,
                                          lon: json.coord.lon,
                                          error: ""
                                        })
                               });



console.log(this.props.item)
  }



  render(){
  const icon = (this.state.weatherId === undefined ? null : <img src={'https://openweathermap.org/img/w/'+this.state.weatherId+'.png'} alt="Weather Icon"/>)
  const weather = (this.props.item === null ? <h1>Loading Weather...</h1> : <Weather temperature={this.state.temperature} city={this.state.city} country={this.state.country} humidity={this.state.humidity} description={this.state.description} error={this.state.error} />)
  const map = (this.state.lat === undefined ? <h3>Loading Map...</h3> : <GoogleApiWrapper lat={this.state.lat} lng={this.state.lon} />)
  const lmap = (this.state.lat === undefined ? <h3>Loading Map...</h3> : <MyMap lat={this.state.lat} lng={this.state.lon} loc={this.props.item} />)
      return(
        <div>
          {icon}
          {weather}
          <Button variant={(this.state.map? 'outline-success' : 'outline-primary')} onClick={() => this.setState({map: !this.state.map })} >{(this.state.map ? 'Leaflet Map' : 'Google Map')}</Button>
          {(this.state.map ? map : lmap)}
        </div>
      )
    };

};

export default WeatherApp;

