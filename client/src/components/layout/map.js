import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

// import GeoCode from "../GeoCode";
// import MapContainer from "./MapContainer";
// import { GoogleApiWrapper } from "google-maps-react";

class map extends Component {
  constructor(props) {
    super(props);
    this.s$tate = {
      crimes: []
    };
  }

  componentDidMount() {
    fetch(
      "https://data.police.uk/api/crimes-street/all-crime?lat=50.353610165139514&lng=-4.111928613525379&date=2017-01"
    )
      .then(res => res.json())
      .then(data => this.setState({ crimes: data }))
      .catch(error => console.log("Fetch failed", error));
  }

  render() {
    // const { crimes } = this.state;
    return (
      <div>
        <h1> Google Maps API + React </h1>
        {/* {crimes.map(crime => (
          <div>
            <li key={crime.category}>{crime.category}</li>
          </div>
        ))} */}
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
