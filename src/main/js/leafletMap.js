import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

class MyMap extends React.Component {
constructor(props){
    super(props);
}
  render() {
    return (
      <LeafletMap
        center={[this.props.lat, this.props.lng]}
        zoom={12}
        maxZoom={15}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={[this.props.lat, this.props.lng]}>
          <Popup>
            {this.props.loc}
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

export default MyMap