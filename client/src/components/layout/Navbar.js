import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="ul-navbar">
        <li className="nav-li">
          <Link className="link map-link" to="/dashboard">
            <i className="fas fa-map" /> Map
          </Link>
          <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-a">
            <i id="logout-icon" className="fas fa-sign-out-alt" />Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="ul-navbar">
        <li className="nav-li">
          <Link className="link" to="/register">
            <span className="glyphicon glyphicon-user" /> Sign Up
          </Link>
        </li>
        <li className="nav-li">
          <Link className="link" to="/login">
            <span className="glyphicon glyphicon-log-in" /> Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar">{isAuthenticated ? authLinks : guestLinks}</nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStatToProps = state => ({
  auth: state.auth
});

export default connect(mapStatToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
