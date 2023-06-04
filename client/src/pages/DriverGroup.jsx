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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '380px',
}));

class DriverGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Max', // TODO: get name form other class
      phone: '0900000000',
      containerStyle: {
        width: '100vw',
        height: '100vh'
      },
      center: {
        lat: 23.875591362481277,
        lng: 121.03022793405411
      },
      zoom: 8,
      places: [
        {
          name: 'NYCU',
          latitude: 24.787100467155234,
          longitude: 120.9975076255494
        },
        {
          name: 'NTHU',
          latitude: 24.79629699245621,
          longitude: 120.99660552369998
        },
        {
          name: 'Costco',
          latitude: 24.793388745733505,
          longitude: 121.01338658303233
        },
        {
          name: 'Shopee',
          latitude: 24.782057378055566,
          longitude: 121.01150308586197
        },
      ],
      response: null,
      renderDirectionsFlag: true,
      isLoading: false,
    }

    this.directionsCallback = this.directionsCallback.bind(this)
  }

  componentDidMount = async () => {
    const { name, phone } = this.state
    const payload = {
      name: name,
      phone: phone,
    }
    this.setState({ isLoading: true })

    await api.get_group_driver(payload).then(res => {
      this.setState({
        places: res.places,
        isLoading: false,
      })
    })
  }

  renderPlaceList = () => {
    const { places } = this.state;
    if (places.length > 0) {
      return (
        <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: 'auto', width: 400, position: 'fixed', top: '10px', left: '10px', zIndex: 1 }}
        >
          <Stack spacing={1}>
            {places.map((place, index) => (
              <Item key={index}>
                {place.name ? place.name : "Unknown Place"}
              </Item>
            ))}
          </Stack>
        </Paper>
      );
    }
    return null;
  }

  markerOnLoad = (marker, place_ele) => {
    this.setState({
      center:
      {
        lat: place_ele.latitude,
        lng: place_ele.longitude,
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
                lat: place.latitude,
                lng: place.longitude,
              }}
            />
          ))}
        </>
      )
    }
    return null;
  }

  directionsCallback(response) {
    console.log(response)
    if (response !== null) {
      if (response.status === 'OK') {
        this.setState({
          response: response,
          renderDirectionsFlag: false,
        })
      } else {
        console.log('response: ', response)
      }
    }
  }

  callDirectionsService = () => {
    const { places, renderDirectionsFlag } = this.state;
    if (renderDirectionsFlag) {
      return (
        <DirectionsService
          options={{
            destination: {
              lat: places[1].latitude,
              lng: places[1].longitude,
            },
            origin: {
              lat: places[0].latitude,
              lng: places[0].longitude,
            },
            waypoints: [
              {
                location: {
                  lat: places[2].latitude,
                  lng: places[2].longitude,
                },
              },
              {
                location: {
                  lat: places[3].latitude,
                  lng: places[3].longitude,
                },
              },
            ],
            travelMode: 'DRIVING',
          }}
          callback={this.directionsCallback}
          onLoad={directionsService => {
            console.log('DirectionsService onLoad directionsService: ', directionsService)
          }}
          onUnmount={directionsService => {
            console.log('DirectionsService onUnmount directionsService: ', directionsService)
          }}
        />
      )
    }
    return null;
  }

  renderDirections = () => {
    return (
      <>
        {this.state.response !== null && (
          <DirectionsRenderer
            options={{
              directions: this.state.response
            }}
            onLoad={directionsRenderer => {
              console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
            }}
            onUnmount={directionsRenderer => {
              console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
            }}
          />
        )}
      </>
    )
  }

  render() {
    const { containerStyle, center, zoom } = this.state

    return (
      <LoadScript
        googleMapsApiKey={API_KEY}
      >
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
          {this.callDirectionsService()}
          {this.renderDirections()}
        </GoogleMap>
      </LoadScript >
    )
  }
}

export default DriverGroup
