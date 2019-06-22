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

Body.propTypes = {
  deleteNote: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  notes: PropTypes.any.isRequired
};

export default Body;
