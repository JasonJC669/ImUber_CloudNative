import React, { Component } from 'react'
import styled from 'styled-components'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
// eslint-disable-next-line
import { Redirect } from 'react-router-dom';
import api from '../api'
import { Autocomplete, GoogleMap, LoadScript } from '@react-google-maps/api';

import Paper from '@mui/material/Paper';
// eslint-disable-next-line
import IconButton from '@mui/material/IconButton';
// eslint-disable-next-line
import AddIcon from '@mui/icons-material/Add';
import InputBase from '@mui/material/InputBase';




// eslint-disable-next-line
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
    if (
      window.confirm(
        `Do tou want to add the trip ${this.props.id} ?`,
      )
    ) {
      api.UesrJoinTeam(this.props.id)
      window.location.reload()
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
      driver: [],
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
      libraries: ['places']
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

  // componentDidMount = async () => { //是React中的一個函數當組件被放置到網頁上時它會自動被調用
  //   this.setState({ isLoading: true })

  //   await api.getAllDriver().then(driver => {
  //     this.setState({
  //       driver: driver.data.data,
  //       isLoading: false,
  //     })
  //   })
  // }

  render() {
    const { libraries, containerStyle, center, zoom, driver, isLoading } = this.state

    const columns = [
      {
        Header: 'Driver ID',
        accessor: '_id',
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
        Cell: function (props) {
          return (
            <span>
              <ADD id={props.original._id} />
            </span>
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
              data={driver}
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
            component="form"
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
            onZoomChanged={this.onZoomChanged}

            options={{ //一些輔助功能不要出現
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}

            onClick={this.handleMapClick} //傳送經緯度
          >
          </GoogleMap>
        </LoadScript>
      </>
    )
  }
}

export default PassengerMap