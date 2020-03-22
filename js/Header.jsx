import React from "react";
import PropTypes from "prop-types";
import MediaQuery from "react-responsive";

import Button from "./Button";

const endSession = logout => {
  logout("");
  sessionStorage.setItem("JWT", "");
};

export default function Header({ addNote, logout }) {
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
          <div className="header-buttons">
            <Button
              action="logout"
              icon="fa fa-sign-out"
              onClick={() => endSession(logout)}
            />
            <Button active onClick={addNote} text="+ Add Note" />
          </div>
        </div>
      </MediaQuery>
    </div>
  );
}

Header.propTypes = {
  addNote: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};
