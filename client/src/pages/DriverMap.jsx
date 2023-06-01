import React, { Component } from 'react'
// eslint-disable-next-line
import { Redirect } from 'react-router-dom';
// eslint-disable-next-line
import api from '../api'

import { Autocomplete, GoogleMap, LoadScript } from '@react-google-maps/api';
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
    }
    this.autocomplete = null
    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)

    this.inputRef = React.createRef()
    this.currentInput = {
      lat: 0,
      lng: 0,
    }
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
        this.currentInput = {
          name: place.name,
          lat: lat(),
          lng: lng(),
        }
        this.handlePlaceAdd();
        console.log('Place Latitude:', lat());
        console.log('Place Longitude:', lng());
      };
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  handlePlaceAdd = () => {
    const { places } = this.state;
    const updatedPlaces = [...places, this.currentInput];
    this.setState({ places: updatedPlaces });
    console.log("Success!!!");
    console.log(places);
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
        </GoogleMap>
      </LoadScript >
    )
  }
}

export default DriverMap
