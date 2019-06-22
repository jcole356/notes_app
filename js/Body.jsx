import React from "react";
import PropTypes from "prop-types";

import Card from "./Card";

const Body = ({ deleteNote, editNote, notes }) => (
  <div className="body">
    {notes.map((note, idx) => {
      const { body, color, title } = note;
      return (
        <Card
          body={body}
          color={color}
          deleteNote={deleteNote}
          editNote={editNote}
          id={idx}
          key={title}
          title={title}
        />
      );
    })}
  </div>
);

const noteType = PropTypes.shape({
  optionalProperty: PropTypes.string,
  requiredProperty: PropTypes.number.isRequired
});

Body.propTypes = {
  deleteNote: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(noteType).isRequired
};

export default Body;
