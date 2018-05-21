import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class map extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar">
        <li className="nav-item">
          <a href="#" onClick={this.onLogoutClick.bind(this)}>
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar">
        <li className="nav-item">
          <Link className="link" to="/register">
            Sign up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <div className="map-wrapper">
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    );
  }
}

map.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(map);
