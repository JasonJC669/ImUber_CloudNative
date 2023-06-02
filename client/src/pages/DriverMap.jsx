import React, { Component } from 'react'
// eslint-disable-next-line
import { Redirect } from 'react-router-dom';
// eslint-disable-next-line
import api from '../api'

import { Autocomplete, GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const API_KEY = process.env.REACT_APP_API_KEY;

// const style = {
//   width: '100%',
//   maxWidth: 360,
//   bgcolor: 'background.paper',
//   borderRadius: theme => 2 * theme.shape.borderRadius
// };

// const OverlayTable = styled.div`
//   position: fixed;
//   top: 10px;
//   left: 10px;
//   width: 250px;
//   height: auto;
//   background-color: white;
//   z-index: 1;
//   border-radius: 25px;
// `;

// const OverlayTable = styled(Paper)({
//   position: 'fixed',
//   top: '10px',
//   left: '10px',
//   width: '250px',
//   height: 'auto',
//   bgcolor: 'white',
//   zIndex: 1,
//   borderRadius: '25px'
// });

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '380px',
}));

class DriverMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      containerStyle: {
        width: '100vw',
        height: '100vh'
      },
      center: {
        lat: 23.875591362481277,
        lng: 121.03022793405411
      },
      zoom: 8,
      changeToPassenger: false,
      libraries: ['places'],
      places: [],
      responses: [],
      renderDirectionsFlag: false,
    }
    this.autocomplete = null
    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)

    this.inputRef = React.createRef()

    this.directionsCallback = this.directionsCallback.bind(this)
  }

  onLoad(autocomplete) {
    console.log('autocomplete: ', autocomplete)
    this.autocomplete = autocomplete
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      const place = this.autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const { lat, lng } = place.geometry.location;
        this.handlePlaceAdd(place);
        console.log('Place Latitude:', lat());
        console.log('Place Longitude:', lng());
      };
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  handlePlaceAdd = (place_ele) => {
    const { places } = this.state;
    const updatedPlaces = [...places, place_ele];
    this.setState({ places: updatedPlaces, renderDirectionsFlag: true });
    console.log('places: ', places);
  }

  handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handlePlaceAdd();
    }
  }

  renderPlaceList = () => {
    const { places } = this.state;
    console.log("places.length = " + places.length)
    if (places.length > 0) {
      return (
        <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: 'auto', width: 400, position: 'fixed', bottom: '10px', left: '10px', zIndex: 1 }}
        >
          <Stack spacing={1}>
            {places.map((place, index) => (
              <Item key={index}>
                {place.name ? place.name : "Unknown Place"}
              </Item>
            ))}
            <Button variant="contained">開團(名稱待決定)</Button>
          </Stack>
        </Paper>
      );
    }
    return null;
  }

  markerOnLoad = (marker, place_ele) => {
    const { lat, lng } = place_ele.geometry.location;
    this.setState({
      center:
      {
        lat: lat(),
        lng: lng(),
      },
      zoom: 15,
    })
  }

  renderPlaceMarker = () => {
    const { places } = this.state;
    if (places.length > 0) {
      return (
        <>
          {places.map((place, index) => (
            <Marker
              key={index}
              onLoad={(marker) => this.markerOnLoad(marker, place)}
              position={{
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              }}
            />
          ))}
        </>
      )
    }
    return null;
  }

  directionsCallback(response) {
    const { responses } = this.state;
    const updatedResponses = [...responses, response];
    console.log('directionsCallback response: ', response)
    if (response !== null) {
      if (response.status === 'OK') {
        this.setState({
          renderDirectionsFlag: false,
          responses: updatedResponses,
        })
      } else {
        console.log('response: ', response)
      }
    }
  }

  callDirectionsService = () => {
    const { places, renderDirectionsFlag } = this.state;
    console.log('Called callDirectionsService()');
    if (places.length > 1 && renderDirectionsFlag) {
      return (
        <>
          {places.map((place, index) => {
            if (index > 0 && places[index - 1].geometry && place.geometry) {
              const origin = {
                lat: places[index - 1].geometry.location.lat(),
                lng: places[index - 1].geometry.location.lng(),
              };
              const destination = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              };

              return (
                <React.Fragment key={index}>
                  <DirectionsService
                    options={{
                      destination,
                      origin,
                      travelMode: 'DRIVING',
                    }}
                    callback={this.directionsCallback}
                    onLoad={(directionsService) => {
                      console.log(
                        'DirectionsService onLoad directionsService: ',
                        directionsService
                      );
                    }}
                    onUnmount={(directionsService) => {
                      console.log(
                        'DirectionsService onUnmount directionsService: ',
                        directionsService
                      );
                    }}
                  />
                </React.Fragment>
              );
            }
            return null;
          })}
        </>
      )
    }
    return null;
  }

  renderDirections = () => {
    const { responses } = this.state;
    console.log('responses: ', responses)
    if (responses.length > 0) {
      return (
        <>
          {responses.map((response, index) => {
            return (
              <React.Fragment key={index}>
                <DirectionsRenderer
                  options={{
                    suppressMarkers: true, // Here hide the marker form DirectionsService
                    directions: response,
                  }}
                  onLoad={(directionsRenderer) => {
                    console.log(
                      'DirectionsRenderer onLoad directionsRenderer: ',
                      directionsRenderer
                    );
                  }}
                  onUnmount={(directionsRenderer) => {
                    console.log(
                      'DirectionsRenderer onUnmount directionsRenderer: ',
                      directionsRenderer
                    );
                  }}
                />
              </React.Fragment>
            );
          })}
        </>
      )
    }
    return null;
  }

  render() {
    const { containerStyle, center, zoom, changeToPassenger, libraries } = this.state

    if (changeToPassenger)
      return <Redirect to="/passenger" />;

    return (
      <LoadScript
        googleMapsApiKey={API_KEY}
        libraries={libraries}
      >
        <Paper
          component="div"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, position: 'fixed', top: '10px', left: '10px', zIndex: 1 }}
        >
          <Autocomplete
            onLoad={this.onLoad}
            onPlaceChanged={this.onPlaceChanged}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, width: 390 }}
              placeholder="Search Google Maps"
              inputProps={{ 'aria-label': 'search google maps' }}
              inputRef={this.inputRef}
            // onKeyPress={this.handleInputKeyPress}
            />
          </Autocomplete>
        </Paper>
        {this.renderPlaceList()}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          {this.renderPlaceMarker()}
          {this.callDirectionsService()}
          {this.renderDirections()}
        </GoogleMap>
      </LoadScript >
    )
  }
}

export default DriverMap
