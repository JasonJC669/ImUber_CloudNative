import React, { Component } from 'react'
// eslint-disable-next-line
import styled from 'styled-components'
// eslint-disable-next-line
import { Redirect } from 'react-router-dom';
// eslint-disable-next-line
import api from '../api'

import { GoogleMap, LoadScript } from '@react-google-maps/api';

const API_KEY = process.env.REACT_APP_API_KEY;

class PassengerMap extends Component {
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
    }
  }

  onZoomChanged = () => {
    const { zoom } = this.state
    this.setState({ zoom: zoom })
  }

  render() {
    const { containerStyle, center, zoom } = this.state

    return (
      <LoadScript
        googleMapsApiKey={API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onZoomChanged={this.onZoomChanged}
        >
          { /* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default PassengerMap
