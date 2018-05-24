// import React, { Component } from "react";
// import ReactDOM from "react-dom";

// export default class MapContainer extends Component {
//   componentDidUpdate(prevProps, prevState) {
//     this.loadMap(); // Calls Load map function
//   }
//   loadMap() {
//     if (this.props && this.props.google) {
//       const { google } = this.props;
//       const maps = google.maps;

//       const mapRef = this.refs.map;
//       const node = ReactDOM.findDOMNode(mapRef);

//       // Google Map
//       var map;
//       var marker;
//       var lat;
//       var lng;

//       // Map starter lat and long
//       let latitude = 50.375456;
//       let longitude = -4.142656;

//       let myLatLng = { lat: latitude, lng: longitude };

//       // Map properties
//       var mapProp = {
//         // center: new google.maps.LatLng(latitude, longitude),
//         center: (latitude, longitude),
//         zoom: 13,
//         disableDoubleClickZoom: true,
//         mapTypeControl: false,
//         streetViewControl: false
//       };
//       // Creating the map
//       this.map = new maps.Map(node, mapProp);

//       //   // Creating the search box and link to UI
//       //   var input = document.getElementById("pac-input");
//       //   var searchBox = new google.maps.places.SearchBox(input);
//       //   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//       //   // Change viewpoint based on the search results
//       //   map.addListener("bounds_changed", function() {
//       //     searchBox.setBounds(map.getBounds());
//       //   });

//       //   // On click carry out addMarker function
//       //   map.addListener("click", function(event) {
//       //     addMarker(event.latLng);
//       //     logCords();
//       //   });

//       //   // If marker is not defined create a new marker
//       //   function addMarker(location) {
//       //     if (marker == undefined) {
//       //       marker = new google.maps.Marker({
//       //         position: location,
//       //         map: map,
//       //         animation: google.maps.Animation.DROP
//       //       });
//       //     } else {
//       //       // Set new position for marker
//       //       marker.setPosition(location);
//       //     }
//       //   }
//       // }
//       // // Gets the cordinates of the marker and puts them into variables
//       // function logCords() {
//       //   lat = marker.getPosition().lat();
//       //   lng = marker.getPosition().lng();

//       //   // giving the getApi function paramaters of lat and lng so the variables can be used in the function to change API url when marker is placed
//       //   // getApi(lat, lng);

//       //   console.log("latitude: " + lat + ", " + "longitude: " + lng);
//     }
//   }

//   render() {
//     const style = {
//       width: "90vw",
//       height: "75vh"
//     };
//     return (
//       <div ref="map" style={style}>
//         loading map...
//       </div>
//     );
//   }
// }
