import React from "react";
import PropTypes from "prop-types";

import Card from "./Card";

export default function Body({ deleteNote, editNote, notes }) {
  return (
    <div className="body">
      {notes.map(note => {
        const { body, color, id, title } = note;
        return (
          <Card
            body={body}
            color={color}
            deleteNote={deleteNote}
            editNote={editNote}
            id={id}
            key={id}
            title={title}
          />
        );
      })}
    </div>
  );
}

export const noteType = PropTypes.shape({
  body: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
});

Body.propTypes = {
  deleteNote: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(noteType).isRequired
};
