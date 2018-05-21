const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfleInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.location = !isEmpty(data.location) ? data.location : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 20 })) {
    errors.handle = "Handle needs to be between 2 and 20 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle is required to create profile";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location is required to create a profile";
  }

  if (Validator.isEmpty(data.dob)) {
    errors.dob = "Date of Birth is required";
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
