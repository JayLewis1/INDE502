import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    // this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="landing">
        <div className="header">
          <h1>
            Crime Map <br />Uk
          </h1>{" "}
        </div>
        <div className="box">
          <h1 className="signup-box">Sign Up</h1>
          <form action="#" id="signup" onSubmit={this.onSubmit}>
            <div className="input-field">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className={classnames("fields", { "is-invalid": errors.name })}
                value={this.state.name}
                onChange={this.onChange}
              />
              {errors.name && <div className="feedback">{errors.name}</div>}
              <input
                type="text"
                name="email"
                placeholder="Email"
                className={classnames("fields", { "is-invalid": errors.email })}
                value={this.state.email}
                onChange={this.onChange}
              />
              {errors.name && <div className="feedback">{errors.email}</div>}
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={classnames("fields", {
                  "is-invalid": errors.password
                })}
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.name && <div className="feedback">{errors.password}</div>}
              <input
                type="password"
                name="password2"
                placeholder="Confirm Password"
                className={classnames("fields", {
                  "is-invalid": errors.password2
                })}
                value={this.state.password2}
                onChange={this.onChange}
              />
              {errors.name && (
                <div className="feedback">{errors.password2}</div>
              )}
              <input type="submit" value="Sign up" className="button" />{" "}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Landing));
