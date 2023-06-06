import React, { Component } from 'react'
// eslint-disable-next-line
import { Redirect, useLocation } from 'react-router-dom';
// eslint-disable-next-line
import api from '../api'

import { Autocomplete, GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';

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
  width: '390px',
}));

class DriverMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phone: '',
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
      openGroupFlag: false,
      departTime: '',
    }
    this.autocomplete = null
    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)

    this.inputRef = React.createRef()

    this.directionsCallback = this.directionsCallback.bind(this)
  }

  componentDidMount = () => {
    const { state } = this.props.location
    this.setState({ departTime: Date().toLocaleString() })
    if (state && state.Dname && state.Dphone) {
      const { Dname, Dphone } = state
      this.setState({ name: Dname, phone: Dphone }, () => {
        console.log('[DEBUG]-DriverMap.jsx this.state.name ', this.state.name)
      })
    }
    else {
      console.log('[DEBUG]-DriverMap.jsx No name & phone from Links. Set to default.')
      this.setState({ name: 'Max', phone: '0900000000' })
    }
  }

  onLoad(autocomplete) {
    // console.log('[info] autocomplete: ', autocomplete)
    this.autocomplete = autocomplete
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      const place = this.autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        this.handlePlaceAdd(place);
      };
    } else {
      console.log('[info] Autocomplete is not loaded yet!')
    }
  }

  handlePlaceAdd = (place_ele) => {
    const { places } = this.state;
    const updatedPlaces = [...places, place_ele];
    this.setState({ places: updatedPlaces, renderDirectionsFlag: true }, () => {
      console.log('[DEBUG] this.state.places: ', this.state.places);
    })
  }

  handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handlePlaceAdd();
    }
  }

  renderPlaceList = () => {
    const { places, departTime } = this.state;
    if (places.length > 0) {
      return (
        <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: 'auto', width: 400, position: 'fixed', bottom: '10px', left: '10px', zIndex: 1 }}
        >
          <Stack spacing={1} >
            {places.map((place, index) => (
              <Item key={index} >
                {place.name ? place.name : "[ERROR] Unknown Place"}
              </Item>
            ))}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimeField
                label="DepartTime"
                value={departTime}
                onChange={(departTime) => { this.setState({ departTime: departTime }) }}
                format="HH:mm"
                size='small'
              />
            </LocalizationProvider>
            <Button variant="contained" onClick={this.openRoute}>開團(名稱待決定)</Button>
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
    console.log('[info] directionsCallback response: ', response)
    if (response !== null) {
      if (response.status === 'OK') {
        this.setState({
          renderDirectionsFlag: false,
          responses: updatedResponses,
        })
      } else {
        console.log('[DEBUG] response: ', response)
      }
    }
  }

  callDirectionsService = () => {
    const { places, renderDirectionsFlag } = this.state;
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
                        '[info] DirectionsService onLoad directionsService: ',
                        directionsService
                      );
                    }}
                    onUnmount={(directionsService) => {
                      console.log(
                        '[info] DirectionsService onUnmount directionsService: ',
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
                      '[info] DirectionsRenderer onLoad directionsRenderer: ',
                      directionsRenderer
                    );
                  }}
                  onUnmount={(directionsRenderer) => {
                    console.log(
                      '[info] DirectionsRenderer onUnmount directionsRenderer: ',
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

  openRoute = () => {
    const { name, phone, places, departTime } = this.state
    if (name === '' || phone === '') {
      window.alert(`No name or no phone`)
      return
    }
    if (places.length < 2) {
      window.alert(`At least 2 places needed`)
      return
    }

    const payload_places = places.map(place => ({
      name: place.name,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    }))

    const payload = { phone: phone, places: payload_places, departTime: departTime }
    api.create_group_driver(payload).then(res => {
      window.alert(`Open Group Successful`)
      this.setState({ openGroupFlag: true })
    })

    return
  }

  render() {
    const { containerStyle, center, zoom, changeToPassenger, libraries, openGroupFlag, name, phone } = this.state

    if (changeToPassenger)
      return <Redirect to="/passenger" />;

    if (openGroupFlag) {
      return <Redirect to={{
        pathname: "/driver/group",
        state: { Dname: name, Dphone: phone },
      }} />;
    }

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