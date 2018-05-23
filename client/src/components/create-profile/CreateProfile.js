import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroupProfile from "../common/TextFieldGroupProfile";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      location: "",
      dob: "",
      bio: "",
      twitter: "",
      facebook: "",
      instagram: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      location: this.state.location,
      dob: this.state.dob,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <i id="twitter-icon" class="fab fa-twitter" />
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <i id="facebook-icon" class="fab fa-facebook" />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <i id="instagram-icon" class="fab fa-instagram" />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      );
    }
    // const options = [
    //   { label: "*Select Professional Status", value: 0 }
    //   {label: "Developer", value: }
    // ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="diplay-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="small">* = required fields</small>
              <form className="profile-form" onSubmit={this.onSubmit}>
                <TextFieldGroupProfile
                  placeholder="* Profile Handle"
                  name="handle"
                  className="profile-fields"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                />
                <TextFieldGroupProfile
                  placeholder="* Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <TextFieldGroupProfile
                  placeholder="* Date Of Birth"
                  name="dob"
                  value={this.state.dob}
                  onChange={this.onChange}
                  error={errors.dob}
                />
                <TextAreaFieldGroup
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="social-btn"
                  >
                    Add Social Network Links
                  </button>
                </div>
                {socialInputs}
                <input type="submit" value="Submit" className="submit-btn" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
