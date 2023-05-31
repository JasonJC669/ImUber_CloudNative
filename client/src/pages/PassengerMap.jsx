import React, { Component } from 'react'
// eslint-disable-next-line
import styled from 'styled-components'
// eslint-disable-next-line
import { Redirect } from 'react-router-dom';
// eslint-disable-next-line
import api from '../api'

import { GoogleMap, LoadScript } from '@react-google-maps/api';


const OverlayTable = styled.div`
  position: absolute;
  margin-left: 20px;
  margin-top: 20px; 
  width: 10vw;
  height: 100vh;
  background-color: white
`;

const DataRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

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
      zoom: 8
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
        googleMapsApiKey=""
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
        <OverlayTable>
            <DataRow>安安</DataRow>
            <DataRow>你好</DataRow>
            <DataRow>滾</DataRow>
        </OverlayTable>
      </LoadScript>
    )
  }
}

export default PassengerMap
