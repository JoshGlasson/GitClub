import React from "react";

class Weather extends React.Component{

    render(){

        return(

            <div className="weather-info">
                {
                    this.props.city && <p className="weather__key">Location:
                        <span className="weather__value">  {this.props.city}</span>
                    </p>
                }

                {
                    (Math.round(this.props.temperature * 10) / 10) && <p className="weather__key">Temperature:
                        <span className="weather__value">  {(Math.round(this.props.temperature * 10) / 10) + (this.props.units === "us" ? '°F' : '°C')}</span>
                    </p>
                }

                {
                    this.props.humidity && <p className="weather__key">Humidity:
                        <span className="weather__value">  {this.props.humidity}</span>
                    </p>
                }

                {
                    this.props.description && <p className="weather__key">Conditions:
                        <span className="weather__value">  {this.props.description}</span>
                    </p>
                }

            </div>
        )
    }
}

export default Weather;