/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";

import Button from "./Button";
import ColorPicker from "./ColorPicker";

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      title: "",
      color: "red"
    };
  }

  // TODO: replace with componentDidUpdate
  componentWillReceiveProps(nextProps) {
    if (nextProps.edit) {
      this.setState({
        body: nextProps.note.body,
        title: nextProps.note.title,
        color: nextProps.note.color
      });
    } else {
      this.setState({
        color: nextProps.note.color
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
    this.setState({
      title: "",
      body: "",
      color: "red"
    });
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

Note.defaultProps = {
  edit: false
};

Note.propTypes = {
  cancelNote: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  note: PropTypes.any.isRequired,
  submit: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};
