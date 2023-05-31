import React, { Component } from 'react'
// eslint-disable-next-line
import styled from 'styled-components'
import ReactTable from 'react-table'
// eslint-disable-next-line
import { Redirect } from 'react-router-dom';
// eslint-disable-next-line
import api from '../api'

import { GoogleMap, LoadScript } from '@react-google-maps/api';


// const OverlayTable = styled.div`
//   position: fixed;
//   top: 30px;
//   left: 30px;
//   width: 25vw;
//   height: auto;
//   background-color: white;
//   z-index: 1;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
// `;

// // const DataRow = styled.div`
// //   display: flex;
// //   align-items: center;
// //   padding: 10px;
// //   border-bottom: 1px solid #ccc;
// // `;


// class PassengerMap extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       containerStyle: {
//         driver: [],
//         columns: [],
//         isLoading: false,

//         width: '100vw',
//         height: '100vh'
//       },
//       center: {
//         lat: 23.875591362481277,
//         lng: 121.03022793405411
//       },
//       zoom: 8
//     }
//   }

//   onZoomChanged = () => {
//     const { zoom } = this.state
//     this.setState({ zoom: zoom })
//   }

//   componentDidMount = async () => { //componentDidMount是React中的一個函數當組件被放置到網頁上時它會自動被調用
//     this.setState({ isLoading: true })

//     await api.getAllMovies().then(movies => {
//         this.setState({
//             movies: movies.data.data,
//             isLoading: false,
//         })
//     })
// }

//   render() {
//     const { containerStyle, center, zoom, driver, isLoading } = this.state

//     const columns = [
//       {
//           Header: 'Driver ID',
//           accessor: '_id',
//           filterable: true,
//       },
//       {
//           Header: 'Start',
//           accessor: 'start',
//           filterable: true,
//       },
//       {
//           Header: 'End',
//           accessor: 'end',
//           filterable: true,
//       },
//       {
//         Header: 'Remaining Seats',
//         accessor: 'remaining_seats',
//         filterable: true,
//       },
//     ]

//     let showTable = true
//     // if (!driver.length) {
//     //     showTable = false
//     // }

//     return (
//     <>
//       <OverlayTable>
//         {showTable && (
//           <ReactTable
//               data={driver}
//               columns={columns}
//               loading={isLoading}
//               defaultPageSize={10}
//               showPageSizeOptions={true}
//               minRows={0}
//           />
//         )}
//       </OverlayTable>

//       <LoadScript
//         googleMapsApiKey=""
//       >
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={zoom}
//           onZoomChanged={this.onZoomChanged}
//         >
//           { /* Child components, such as markers, info windows, etc. */}
//           <></>
//         </GoogleMap>
//       </LoadScript>
//     </>
//     )
//   }
// }

// export default PassengerMap











































// import React, { Component } from 'react';
// import styled from 'styled-components';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';

// const OverlayTable = styled.div`
//   position: fixed;
//   top: 30px;
//   left: 30px;
//   width: 25vw;
//   height: auto;
//   background-color: white;
//   z-index: 1;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
// `;

// const DataRow = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 10px;
//   border-bottom: 1px solid #ccc;
// `;

// class PassengerMap extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       containerStyle: {
//         width: '100vw',
//         height: '100vh',
//       },
//       center: {
//         lat: 23.875591362481277,
//         lng: 121.03022793405411,
//       },
//       zoom: 8,
//     };
//   }

//   onZoomChanged = () => {
//     const { zoom } = this.state;
//     this.setState({ zoom });
//   };

//   render() {
//     const { containerStyle, center, zoom } = this.state;
//     const { data } = this.props;

//     return (
//       <>
//         <OverlayTable>
//           {data.map((item, index) => (
//             <DataRow key={index}>{item}</DataRow>
//           ))}
//         </OverlayTable>

//         <LoadScript googleMapsApiKey="YOUR_API_KEY">
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={center}
//             zoom={zoom}
//             onZoomChanged={this.onZoomChanged}
//           >
//             { /* Child components, such as markers, info windows, etc. */}
//             <></>
//           </GoogleMap>
//         </LoadScript>
//       </>
//     );
//   }
// }



// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       data: ['安安', '你好', '滾', '= = ', 'y0'],
//     };
//   }

//   render() {
//     const { data } = this.state;

//     return (
//       <div>
//         <PassengerMap data={data} />
//       </div>
//     );
//   }
// }

// export default App;

























const OverlayTable = styled.div`
  position: fixed;
  top: 30px;
  left: 30px;
  width: auto;
  height: auto;
  background-color: white;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;



class PassengerMap extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   driver: [],
    //   isLoading: false,

    this.state = {
      containerStyle: {
        driver: [],
        columns: [],
        isLoading: false,

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

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await api.getAllMovies().then((movies) => {
      this.setState({
        driver: movies.data.data,
        isLoading: false,
      });
    });
  };

  render() {
    const { containerStyle, center, zoom, driver, isLoading } = this.state;

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
        Header: 'Remaining Seats',
        accessor: 'remaining_seats',
        filterable: true,
      },
    ];

    let showTable = true;
    // if (!driver.length) {
    //   showTable = false;
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

       <LoadScript googleMapsApiKey="">
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
      </>
    );
  }
}

export default PassengerMap;