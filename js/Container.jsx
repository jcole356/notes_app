import React from "react";

import Body from "./Body";
import Dialog from "./Dialog";
import Header from "./Header";
import Note from "./Note";

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      notes: [
        {
          title: "Sunday",
          body: `watch football\nexercise\nlaundry`,
          color: "red"
        },
        {
          title: "Monday",
          body: "go to work",
          color: "green"
        },
        {
          title: "Friday",
          body: "Dinner\nsleep",
          color: "blue"
        },
        {
          title: "Saturday",
          body: "Farmers Market\nWatch Stranger Things",
          color: "yellow"
        }
      ],
      openNoteModal: false,
      openDeleteModal: false
    };
  }

  // TODO: this is gross
  addNote = (title, body, color) => {
    const { notes } = this.state;
    notes.unshift({ title, body, color });
    this.setState({
      note: "",
      notes,
      openNoteModal: false
    });
  };

  cancelDelete = () => {
    this.setState({
      openDeleteModal: false
    });
  };

  cancelNote = () => {
    this.setState({
      note: "",
      openNoteModal: false
    });
  };

  editNote = (title, body, color) => {
    const { note, notes } = this.state;
    this.handleAddNoteClick();
    notes[note] = {
      title,
      body,
      color
    };
    this.setState({
      edit: false,
      note: "",
      notes,
      openNoteModal: false
    });
  };

  deleteNote = () => {
    const { note, notes } = this.state;
    notes.splice(note, 1);
    this.setState({
      note: "",
      notes,
      openDeleteModal: false
    });
  };

  // TODO: rename to openModal
  handleAddNoteClick = () => {
    this.setState({
      openNoteModal: true
    });
  };

  handleDeleteNoteClick = key => {
    this.setState({
      openDeleteModal: true,
      note: key
    });
  };

  handleEditNoteClick = key => {
    this.setState({
      edit: true,
      note: key,
      openNoteModal: true
    });
  };

  render() {
    const { edit, note, notes, openDeleteModal, openNoteModal } = this.state;
    return (
      <div className="container">
        {openNoteModal || openDeleteModal ? (
          <div className="modal-background" />
        ) : null}
        <Header
          addNote={this.handleAddNoteClick}
          className="header-container"
        />
        <Body
          notes={notes}
          editNote={this.handleEditNoteClick}
          deleteNote={this.handleDeleteNoteClick}
        />
        <Note
          cancelNote={this.cancelNote}
          edit={edit}
          note={
            note !== ""
              ? notes.slice(note, note + 1)[0]
              : {
                  title: "Untitled",
                  body: "Just start typing here",
                  color: "red"
                }
          }
          submit={edit ? this.editNote : this.addNote}
          visible={openNoteModal}
        />
        <Dialog
          cancelCallback={this.cancelDelete}
          deleteCallback={this.deleteNote}
          visible={openDeleteModal}
        />
      </div>
    );
  }
}
