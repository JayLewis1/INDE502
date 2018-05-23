import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroupProfile = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={classnames("profile-fields", {
          "is-invalid": error
        })}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="">{info}</small>}
      {error && <div className="feedback">{error}</div>}
    </div>
  );
};

TextFieldGroupProfile.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroupProfile.defaultProps = {
  type: "text"
};

export default TextFieldGroupProfile;
