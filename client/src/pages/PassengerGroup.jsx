import React, { Component } from 'react'
import api from '../api'

import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const API_KEY = process.env.REACT_APP_API_KEY;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '380px',
}));

class PassengerGroup extends Component {
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
      // places: [],
      Dname: '',
      Dphone: '',
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
      renderDirectionsFlag: false,
      isLoading: false,
    }

    this.directionsCallback = this.directionsCallback.bind(this)
  }

  componentDidMount = () => {
    const { state } = this.props.location
    if (state && state.Pname && state.Pphone) {
      const { Pname, Pphone } = state
      this.setState({ name: Pname, phone: Pphone }, () => {
        console.log('[DEBUG]-PassengerGroup.jsx this.state.name ', this.state.name)
        this.getPlaceList()
      })
    }
    else {
      console.log('[DEBUG]-PassengerGroup.jsx No name & phone from DriverMap. Set to default.')
      this.setState({ name: 'Max', phone: '0900000000' }, () => {
        this.getPlaceList();
      })
    }
  }

  getPlaceList = async () => {
    const { name, phone } = this.state
    const payload = {
      name: name,
      phone: phone,
    }
    this.setState({ isLoading: true })

    console.log('[DEBUG]-PassengerGroup.jsx Sending payload: ', payload)
    await api.get_group_passenger(payload).then(res => {
      console.log("[DEBUG]-PassengerGroup.jsx Get from api res.data: ", res.data)
      this.setState({
        Dname: name,
        Dphone: phone,
        places: res.data.data.places,
        isLoading: false,
        renderDirectionsFlag: true,
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
      const tmp = places.map(place => ({
        location: {
          lat: place.latitude,
          lng: place.longitude,
        }
      }))
      const waypoints = tmp.slice(1, -1)
      const origin = tmp[0]
      const destination = tmp[tmp.length - 1]

      return (
        <DirectionsService
          options={{
            destination: destination,
            origin: origin,
            waypoints: waypoints,
            travelMode: 'DRIVING',
          }}
          callback={this.directionsCallback}
          onLoad={directionsService => {
            console.log('[info] DirectionsService onLoad directionsService: ', directionsService)
          }}
          onUnmount={directionsService => {
            console.log('[info] DirectionsService onUnmount directionsService: ', directionsService)
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
              console.log('[info] DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
            }}
            onUnmount={directionsRenderer => {
              console.log('[info] DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
            }}
          />
        )}
      </>
    )
  }

  renderPlaceList = () => {
    const { places } = this.state;
    if (places.length > 0) {
      return (
        <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: 'auto', width: 400, position: 'fixed', top: '30px', left: '10px', zIndex: 1 }}
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

  render() {
    const { containerStyle, center, zoom } = this.state

    return (
      <LoadScript
        googleMapsApiKey={API_KEY}
      >
        <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', height: 'auto', width: 400, position: 'fixed', top: '10px', left: '10px', zIndex: 1 }}
        >
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
          {this.callDirectionsService()}
          {this.renderDirections()}
        </GoogleMap>
      </LoadScript >
    )
  }
}

export default PassengerGroup
