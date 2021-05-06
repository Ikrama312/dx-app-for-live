/* global google */
import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  DirectionsRenderer
} from 'react-google-maps';

class MapDirectionsRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: null,
      error: null
    };
  }

  componentDidMount() {
    const { places, travelMode } = this.props;
    if (places && places !== null && places !== undefined) {
      const waypoints = places.map(p => ({
        location: { lat: p.lat, lng: p.lng },
        stopover: true
      }));
      const origin = waypoints.shift().location;
      const destination = waypoints.pop().location;

      const directionsService = new google.maps.DirectionsService();
      var options = null;
      if (places.length <= 2) {
        options = {
          origin: origin,
          destination: destination,
          travelMode: travelMode
        };
      } else {
        options = {
          origin: origin,
          destination: destination,
          travelMode: travelMode,
          waypoints: waypoints,

        };
      }
      directionsService.route(options, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          //this.setState({ error: result });
        }
      });
    }
  }

  render() {
    if (this.state.error) {
      return <h1>{this.state.error}</h1>;
    }
    return (
      this.state.directions && (
        <DirectionsRenderer options={{ suppressMarkers: true }} directions={this.state.directions} />
      )
    );
  }
}

const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultCenter={props.defaultCenter}
      defaultZoom={props.defaultZoom}
    >
      {props.markers.map((marker, index) => {
        return (
          <Marker
            labelStyle={{ color: "white", fontWeight: "800" }}
            key={index}
            // label={{
            //   text: index + 1 + "",
            //   color: "white",
            //   fontWeight: "800"
            // }}
            position={{
              lat: parseFloat(marker.lat),
              lng: parseFloat(marker.lng)
            }}
          />
        );
      })}
      <Marker
        labelStyle={{ color: "white", fontWeight: "800" }}
        label={{
          text: "Driver",
          color: "white",
          fontWeight: "800"
        }}
        position={{
          lat: parseFloat(props.driverMarker.lat),
          lng: parseFloat(props.driverMarker.lng)
        }}
      />
      <MapDirectionsRenderer
        places={props.markers}
        travelMode={google.maps.TravelMode.DRIVING}
      />
    </GoogleMap>
  ))
);

export default Map;
