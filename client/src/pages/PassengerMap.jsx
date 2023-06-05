import React, { Component } from 'react'
import styled from 'styled-components'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
// eslint-disable-next-line
import { Redirect } from 'react-router-dom';
import api from '../api'
import { Autocomplete, GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

import Paper from '@mui/material/Paper';
// eslint-disable-next-line
import IconButton from '@mui/material/IconButton';
// eslint-disable-next-line
import AddIcon from '@mui/icons-material/Add';
import InputBase from '@mui/material/InputBase';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from '@mui/material';

const API_KEY = process.env.REACT_APP_API_KEY;

const OverlayTable = styled.div`
  position: fixed;
  top: 80px;
  left: 10px;
  width: auto;
  height: auto;
  background-color: white;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const ADDbottom = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class ADD extends Component {
  AddUser = event => {
    event.preventDefault()
    if (window.confirm(`Do you want to add the trip that ${this.props.original.Dname} drive from ${this.props.original.start} to ${this.props.original.end}`)) {
      // api.UesrJoinTeam(this.props.id)
    }
  }

  render() {
    return <ADDbottom onClick={this.AddUser}>ADD</ADDbottom>
  }
}

class PassengerMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phone: '',
      columns: [],
      isLoading: false,

      containerStyle: {
        width: '100vw',
        height: '100vh'
      },
      center: {
        lat: 23.875591362481277,
        lng: 121.03022793405411
      },
      zoom: 8,
      libraries: ['places'],
      driver_route_list: [
        {
          name: 'Jason',
          places: [
            {
              name: '國立陽明交通大學',
              latitude: 24.7868862,
              longitude: 120.9974969
            },
            {
              name: '國立清華大學',
              latitude: 24.7961217,
              longitude: 120.9966699
            },
          ]
        },
        {
          name: 'Max',
          places: [
            {
              name: '國立陽明交通大學',
              latitude: 24.7868862,
              longitude: 120.9974969
            },
            {
              name: '國立清華大學',
              latitude: 24.7961217,
              longitude: 120.9966699
            },
          ]
        },
        {
          name: 'Hsin',
          places: [
            {
              name: '國立陽明交通大學',
              latitude: 24.7868862,
              longitude: 120.9974969
            },
            {
              name: '國立清華大學',
              latitude: 24.7961217,
              longitude: 120.9966699
            },
          ]
        },
        {
          name: 'Fan',
          places: [
            {
              name: '國立陽明交通大學',
              latitude: 24.7868862,
              longitude: 120.9974969
            },
            {
              name: '國立清華大學',
              latitude: 24.7961217,
              longitude: 120.9966699
            },
          ]
        },
        {
          name: 'David',
          places: [
            {
              name: '國立陽明交通大學',
              latitude: 24.7868862,
              longitude: 120.9974969
            },
            {
              name: '國立清華大學',
              latitude: 24.7961217,
              longitude: 120.9966699
            },
          ]
        },
      ],
      render_route_index: -1,
      response: null,
      renderDirectionsFlag: false,
    }
    this.autocomplete = null
    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)

    this.directionsCallback = this.directionsCallback.bind(this)
  }

  onLoad(autocomplete) {
    // console.log('[info] autocomplete: ', autocomplete)
    this.autocomplete = autocomplete
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      const place = this.autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const { lat, lng } = place.geometry.location;
        this.getRouteList(lat(), lng());
      };
    } else {
      console.log('[info] Autocomplete is not loaded yet!')
    }
  }

  getRouteList = async (lat, lng) => {
    const { driver_route_list } = this.state
    const payload = {
      latitude: lat,
      longitude: lng,
    }
    this.setState({ isLoading: true })

    console.log('[DEBUG]-PassengerMap.jsx Sending payload: ', payload)
    // Call api
    await api.get_driver_routes_passenger(payload).then(res => {
      console.log("[DEBUG]-PassengerMap.jsx Get from api res.data: ", res.data.data)
      this.setState({
        driver_route_list: res.data.data,
        isLoading: false,
      }, () => { console.log('[DEBUG] driver_route_list: ', driver_route_list) })
    })
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
    const { driver_route_list, renderDirectionsFlag, render_route_index } = this.state;
    console.log('[DEBUG] render_route_index: ', render_route_index)
    if (renderDirectionsFlag) {
      const tmp = driver_route_list[render_route_index].places.map(place => ({
        location: {
          lat: place.latitude,
          lng: place.longitude,
        }
      }))
      console.log('tmp ', tmp)
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

  showRoute = (index) => {
    this.setState({ render_route_index: index, renderDirectionsFlag: true })
  }

  addRoute = (props) => {
    if (window.confirm(`Do you want to add the trip that ${props.original.Dname} drive from ${props.original.start} to ${props.original.end}`)) {
      console.log('[info] joining group')
      // api.UesrJoinTeam(this.props.id)
    }
  }

  onZoomChanged = () => {
    const { zoom } = this.state
    this.setState({ zoom: zoom })
  }

  handleMapClick = (event) => { //傳送經緯度給後端 //還要改
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();
    console.log(latitude, longitude);

    const place = { latitude, longitude }

    // api.createPlace(place).then(response => {
    //   console.log(response);
    // })
    //   .catch(error => {
    //     console.error(error);
    //   });
  };

  componentDidMount = () => {
    const { state } = this.props.location
    if (state && state.Pname && state.Pphone) {
      const { Pname, Pphone } = state
      this.setState({ name: Pname, phone: Pphone }, () => {
        console.log('[DEBUG]-PassengerMap.jsx this.state.name ', this.state.name)
      })
    }
    else {
      console.log('[DEBUG]-PassengerMap.jsx No name & phone from Links. Set to default.')
      this.setState({ name: 'Max', phone: '0900000000' })
    }
  }

  render() {
    const { libraries, containerStyle, center, zoom, isLoading, driver_route_list } = this.state

    console.log('driver_route_list: ', driver_route_list);
    const routes = driver_route_list.map(driver_route => ({
      Dname: driver_route.name,
      start: driver_route.places[0].name,
      end: driver_route.places[driver_route.places.length - 1].name,
      seats: 3,
    }))

    const columns = [
      {
        Header: 'Driver Name',
        accessor: 'Dname',
        filterable: true,
      },
      {
        Header: 'Start',
        accessor: 'start',
        filterable: true,
      },
      {
        Header: 'End',
        accessor: 'end',
        filterable: true,
      },
      {
        Header: 'Seats',
        accessor: 'seats',
        filterable: true,
      },
      {
        Header: '',
        accessor: '',
        Cell: (props) => {
          console.log('[DEBUG] props: ', props)
          return (
            <Button variant="contained" onClick={() => this.showRoute(props.index)}>Show</Button>
          )
        },
      },
      {
        Header: '',
        accessor: '',
        Cell: (props) => {
          console.log('[DEBUG] props: ', props)
          return (
            <Button variant="contained" onClick={() => this.addRoute(props)}>Add</Button>
          )
        },
      },
    ]

    let showTable = true
    // if (!driver.length) {
    //     showTable = false
    // }

    return (
      <>
        <OverlayTable>
          {showTable && (
            <ReactTable
              data={routes}
              columns={columns}
              loading={isLoading}
              defaultPageSize={10}
              showPageSizeOptions={true}
              minRows={0}
            />
          )}
        </OverlayTable>



        <LoadScript
          googleMapsApiKey={API_KEY}
          libraries={libraries}
        >
          <Paper
            component="div"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500, position: 'fixed', top: '10px', left: '10px', zIndex: 1 }}
          >
            <Autocomplete
              onLoad={this.onLoad}
              onPlaceChanged={this.onPlaceChanged}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, width: 500 }}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
              />
            </Autocomplete>
            {/* <IconButton type="button" sx={{ p: '10px', }} aria-label="add">
            <AddIcon />
          </IconButton> */}
          </Paper>



          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            options={{ //一些輔助功能不要出現
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onClick={this.handleMapClick} //傳送經緯度
          >
            {this.callDirectionsService()}
            {this.renderDirections()}
          </GoogleMap>
        </LoadScript>
      </>
    )
  }
}

export default PassengerMap