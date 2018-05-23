import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import GeoCode from "../GeoCode";

import MapContainer from "./MapContainer";
// import { GoogleApiWrapper } from "google-maps-react";
class map extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      // <div className="map-wrapper">
      //   <h1 className="map-title"> Crime Map UK </h1>

      //   <div id="crime" />
      //   <div className="map-container">
      //     <div className="mapbar" />
      //     <input
      //       id="pac-input"
      //       className="controls"
      //       type="text"
      //       placeholder="Search Box"
      //     />
      //     <GoogleMap google={this.props.google} />;
      //     <div ref="map"> </div>
      //   </div>

      //   <div id="output" />
      // </div>

      <div>
        <h1> Google Maps API + React </h1>
        <MapContainer google={this.props.google} />
        <GeoCode />
      </div>
    );
  }
}

map.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyAy7v1_vRY18ut_KZ_o6tvlEioGt_Ge_Ds",
//   libraries: ["places"]
// })(map);

export default connect(mapStateToProps)(map);
