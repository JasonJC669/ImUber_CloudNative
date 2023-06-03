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
      ID: 'Max', // TODO: get ID form other class
      containerStyle: {
        width: '100vw',
        height: '100vh'
      },
      center: {
        lat: 23.875591362481277,
        lng: 121.03022793405411
      },
      zoom: 8,
    }
  }

  render() {
    const { ID, containerStyle, center, zoom } = this.state

    return (
      <LoadScript
        googleMapsApiKey={API_KEY}
      >
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

export default DriverGroup
