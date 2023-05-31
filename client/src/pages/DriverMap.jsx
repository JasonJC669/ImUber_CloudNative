import React, { Component } from 'react'
// eslint-disable-next-line
import styled from 'styled-components'
// eslint-disable-next-line
import { Redirect } from 'react-router-dom';
// eslint-disable-next-line
import api from '../api'

import { GoogleMap, LoadScript } from '@react-google-maps/api';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';

const API_KEY = process.env.REACT_APP_API_KEY;

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
  borderRadius: theme => 2 * theme.shape.borderRadius
};

const OverlayTable = styled.div`
  position: fixed;
  top: 10px;
  left: 200px;
  width: 25vw;
  height: auto;
  background-color: white;
  z-index: 1;
  border-radius: 25px;
`;

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
      searchText: ''
    }
  }

  onZoomChanged = () => {
    const { zoom } = this.state
    this.setState({ zoom: zoom })
  }

  handleInputSearch = async event => {
    const searchText = event.target.value
    this.setState({ searchText: searchText })
  }

  handleListItemClick = (event, index) => {
    console.log("Button" + index + "click");
  };

  renderListItemButton = () => {
    const { searchText } = this.state
    if (searchText !== '') {
      return (
        <List sx={style} component="nav" aria-label="mailbox folders">
          <ListItemButton
            divider
            onClick={(event) => this.handleListItemClick(event, 0)}
          >
            <ListItemText primary="國立陽明交通大學" />
          </ListItemButton>
          <ListItemButton
            divider
            onClick={(event) => this.handleListItemClick(event, 0)}
          >
            <ListItemText primary="國立陽明交通大學" />
          </ListItemButton>
          <ListItemButton
            divider
            onClick={(event) => this.handleListItemClick(event, 1)}
          >
            <ListItemText primary="國立清華大學" />
          </ListItemButton>
          <ListItemButton
            divider
            onClick={(event) => this.handleListItemClick(event, 2)}
          >
            <ListItemText primary="台灣中油 光明站" />
          </ListItemButton>
          <ListItemButton
            onClick={(event) => this.handleListItemClick(event, 3)}
          >
            <ListItemText primary="台積創新館" />
          </ListItemButton>
        </List>
      )
    }
  }

  render() {
    const { containerStyle, center, zoom, changeToPassenger, searchText } = this.state

    if (changeToPassenger)
      return <Redirect to="/passenger" />;

    return (
      <div>
        <OverlayTable>
          <div style={{
            margin: "8px 0 8px 0",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }} >
            <TextField
              id="outlined-search"
              label="Search field"
              size="small"
              type="search"
              value={searchText}
              onChange={this.handleInputSearch}
            />
            {this.renderListItemButton()}
          </div>
        </OverlayTable>
        <LoadScript
          googleMapsApiKey={API_KEY}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onZoomChanged={this.onZoomChanged}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
          </GoogleMap>
        </LoadScript>
      </div>
    )
  }
}

export default DriverMap
