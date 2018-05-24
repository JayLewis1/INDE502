// import React, { Component } from "react";
// import Geocode from "react-geocode";
// import EventListener, { withOptions } from "react-event-listener";
// // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.

// Geocode.setApiKey("AIzaSyAy7v1_vRY18ut_KZ_o6tvlEioGt_Ge_Ds");
// let address = document.getElementById("address");

// export default class GeoCode extends Component {
//   render() {
//     function getGeoCode() {
//       // Enable or disable logs. Its optional.
//       Geocode.enableDebug();

//       // Get latidude & longitude from address.
//       Geocode.fromAddress("#address").then(
//         response => {
//           const { lat, lng } = response.results[0].geometry.location;
//           console.log(lat, lng);
//         },
//         error => {
//           console.error(error);
//         }
//       );
//     }
//     return (
//       <div>
//         <input type="text" id="address" />
//         <input type="button" id="click" value="find" onClick={getGeoCode} />
//       </div>
//     );
//   }
// }
