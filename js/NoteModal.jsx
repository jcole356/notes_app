// TODO: disable this rule globally
// TODO: maybe a condidate for adding hooks?
/* eslint-disable react/no-did-update-set-state */
import React from "react";
import PropTypes from "prop-types";

import Button from "./Button";
import ColorPicker from "./ColorPicker";

import { noteType } from "./Body";

const DEFAULT_NOTE_COLOR = "red";
const DEFAULT_NOTE_STATE = {
  body: "",
  color: DEFAULT_NOTE_COLOR,
  title: ""
};

export default class NoteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_NOTE_STATE;
  }

  componentDidUpdate(prevProps) {
    const { edit, note } = this.props;
    if (!prevProps.edit && edit) {
      this.setState({
        body: note.body,
        color: note.color,
        title: note.title
      });
    }
    if (prevProps.edit && !edit) {
      this.setState({
        color: DEFAULT_NOTE_COLOR
      });
    }
  }

  addNote = () => {
    const { submit } = this.props;
    const { body, color, title } = this.state;
    submit(title, body, color);
    this.resetDefaultState();
  };

  cancelNote = () => {
    const { cancelNote } = this.props;
    this.resetDefaultState();
    cancelNote();
  };

  editNote = () => {
    const { body, color, title } = this.state;
    const {
      note: { body: noteBody, title: noteTitle },
      submit
    } = this.props;
    const titleResult = title || noteTitle;
    const bodyResult = body || noteBody;
    submit(titleResult, bodyResult, color);
    this.resetDefaultState();
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleColorChange = color => {
    this.setState({
      color
    });
  };

  resetDefaultState = () => {
    this.setState(DEFAULT_NOTE_STATE);
  };

  render() {
    const { body, color, title } = this.state;
    const { edit, note, visible } = this.props;
    const backgroundColor = color;
    return (
      <div
        className="note"
        style={{
          backgroundColor,
          display: visible ? "block" : "none"
        }}
      >
        <div className="note-content">
          <ColorPicker onChange={this.handleColorChange} selected={color} />
          <div className="formContainer">
            <form>
              <input
                name="title"
                onChange={this.handleChange}
                placeholder={edit ? "" : note.title}
                type="text"
                value={title}
              />
              <textarea
                name="body"
                onChange={this.handleChange}
                placeholder={edit ? "" : note.body}
                style={{
                  width: "98%",
                  resize: "none"
                }}
                value={body}
              />
            </form>
          </div>
        </div>
        <div className="footer">
          <Button
            onClick={this.cancelNote}
            active
            action="cancel"
            text="Cancel"
          />
          <Button
            onClick={edit ? this.editNote : this.addNote}
            active={!!title}
            text={edit ? "Save" : "Add"}
          />
        </div>
      </div>
    );
  }
}

NoteModal.defaultProps = {
  edit: false
};

NoteModal.propTypes = {
  cancelNote: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  note: noteType.isRequired,
  submit: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};
