import React, { Component } from 'react'
// eslint-disable-next-line
import styled from 'styled-components'
// eslint-disable-next-line
import { Redirect } from 'react-router-dom';
// eslint-disable-next-line
import api from '../api'

import { Autocomplete, GoogleMap, LoadScript } from '@react-google-maps/api';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

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
  left: 10px;
  width: 250px;
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
      searchText: '',
      libraries: ['places']
    }
    this.autocomplete = null
    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)
    this.originRef = React.createRef()
    this.destinationRef = React.createRef()

    this.directionsCallback = this.directionsCallback.bind(this)
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

  onLoad(autocomplete) {
    console.log('autocomplete: ', autocomplete)
    this.autocomplete = autocomplete
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      console.log(this.autocomplete.getPlace())
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  directionsCallback(response) {
    console.log(response)
    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response
          })
        )
      } else {
        console.log('response: ', response)
      }
    }
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
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, position: 'fixed', top: '10px', left: '10px', zIndex: 1 }}
        >
          <Autocomplete
            onLoad={this.onLoad}
            onPlaceChanged={this.onPlaceChanged}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Google Maps"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
          </Autocomplete>
          <IconButton type="button" sx={{ p: '10px' }} aria-label="add">
            <AddIcon />
          </IconButton>
        </Paper>
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
      </LoadScript >
    )
  }
}

export default DriverMap
