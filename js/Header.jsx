import React from "react";
import PropTypes from "prop-types";

import MediaQuery from "react-responsive";
import Button from "./Button";

export default function Header({ addNote }) {
  // TODO: use media query to change button text
  // TODO: stop adding the undefined class to some instances of the button
  return (
    <div>
      <MediaQuery query="(max-width: 767px)">
        <div className="header">
          <div className="header-title">Notes</div>
          <Button active onClick={addNote} text="+" />
        </div>
      </MediaQuery>
      <MediaQuery query="(min-width: 768px)">
        <div className="header">
          <div className="header-title">Notes</div>
          <Button active onClick={addNote} text="+ Add Note" />
        </div>
      </MediaQuery>
    </div>
  );
}

Header.propTypes = {
  addNote: PropTypes.func.isRequired
};
