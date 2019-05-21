import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
constructor(props) {
      super(props)
}

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
         lat: this.props.lat,
         lng: this.props.lng
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBnOC2cYnLyaaYXtnd_IEQWZLkqvg0tqoE'
})(MapContainer);