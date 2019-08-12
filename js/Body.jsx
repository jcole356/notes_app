import React from "react";
import PropTypes from "prop-types";

import Card from "./Card";

import noteType from "./types";

export default function Body({ deleteNote, editNote, notes }) {
  return (
    <div className="body">
      {notes.map(note => {
        const { id } = note;
        return (
          <Card
            deleteNote={deleteNote}
            editNote={editNote}
            key={id}
            note={note}
          />
        );
      })}
    </div>
  );
}

Body.propTypes = {
  deleteNote: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(noteType).isRequired
};
