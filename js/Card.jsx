import React from "react";
import PropTypes from "prop-types";

import Button from "./Button.tsx";

import noteType from "./types";

export default function Card({ deleteNote, editNote, note }) {
  const { body, color, id, title } = note;
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <div className="card-header">
        <div className="title">{title}</div>
        <div className="buttons">
          <Button
            active
            icon="fa fa-trash-o"
            onClick={() => {
              deleteNote(id);
            }}
            text="Delete"
          />
          <Button
            active
            icon="fa fa-pencil"
            onClick={() => {
              editNote(id);
            }}
            text="Edit"
          />
        </div>
      </div>
      <div className="note-body">
        <textarea
          readOnly
          style={{
            width: "93%"
          }}
          value={body}
        />
      </div>
    </div>
  );
}

Card.propTypes = {
  deleteNote: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
  note: noteType.isRequired
};
