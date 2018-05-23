import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="ul-navbar">
        <li className="nav-li">
          <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-a">
            <span className="glyphicon glyphicon-user" /> Logout
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

export default connect(mapStatToProps, { logoutUser })(Navbar);
