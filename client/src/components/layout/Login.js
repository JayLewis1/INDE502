import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    // this.onChange = this.onChange.bind(this);$4
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/map");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

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
          <h1 className="login-box">Log In</h1>
          {/* <h2 className="login-title">Crime Map Uk</h2> */}
          <form action="#" id="login" onSubmit={this.onSubmit}>
            <div className="space" />
            <div className="input-field login">
              <input
                type="text"
                name="email"
                placeholder="Email"
                className={classnames("login fields", {
                  "is-invalid": errors.email
                })}
                value={this.state.email}
                onChange={this.onChange}
              />
              {errors.email && <div className="feedback">{errors.email}</div>}
              <input
                type="password"
                name="password"
                placeholder="Password"
                className={classnames("login fields", {
                  "is-invalid": errors.password
                })}
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.password && (
                <div className="feedback">{errors.password}</div>
              )}
              <input type="submit" value="Login" className="button" />{" "}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
