import React from "react";
import PropTypes from "prop-types";

import Button from "./Button.tsx";

export default function Dialog({ visible, cancelCallback, deleteCallback }) {
  return (
    <div className="dialog" style={{ display: visible ? "block" : "none" }}>
      <div className="message">
        <div className="messge-title">Delete Note</div>
        <div className="messge-body">
          Are you sure you want to delete this note?
        </div>
      </div>
      <div className="footer">
        <Button active onClick={cancelCallback} text="Cancel" />
        <Button active onClick={deleteCallback} text="Delete" />
      </div>
    </div>
  );
}

Dialog.propTypes = {
  cancelCallback: PropTypes.func.isRequired,
  deleteCallback: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};
