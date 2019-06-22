import React from "react";
import PropTypes from "prop-types";

export default function Button({ action, active, icon, onClick, text }) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={`button ${action}`}
      onClick={active ? onClick : null}
      style={active ? { opacity: "1" } : { opacity: "0.5" }}
    >
      {icon ? <i className={icon} aria-hidden="true" /> : text}
    </div>
  );
}

Button.defaultProps = {
  action: "",
  active: true,
  icon: undefined
};

Button.propTypes = {
  action: PropTypes.string,
  active: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};
