import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <h4>Loading...</h4>;
    } else {
      // Check if user has profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div className="dashboard-map">
            <div className="map2">
              <img src="../assets/map.png" alt="" />
              <h2 className="h2">Where Map should be</h2>
            </div>
            <div className="data-list">
              <h3 className="data-h3">Crimes lists here</h3>
            </div>
          </div>
        );
      } else {
        // User is logged in but no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name} </p>
            <p>
              It seems you have not yet created a profile, click the button to
              add some info.
            </p>
            <Link to="/create-profile" className="btn btn-danger">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="ror">
            <div className="col-md-12">
              <h1 className="display-4" id="db-title">
                Crime Map Uk
              </h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
