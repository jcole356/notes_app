import React from "react";

import Body from "./Body";
import Dialog from "./Dialog";
import Header from "./Header";
import NoteModal from "./NoteModal";

import mockNotes from "./mocks/notes";

const DEFAULT_NOTE = {
  body: "Just start typing here",
  color: "red",
  title: "Untitled"
};

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: null,
      notes: mockNotes,
      openDeleteModal: false,
      openNoteModal: false
    };
  }

  addNote = (title, body, color) => {
    const { notes } = this.state;
    notes.unshift({ title, body, color });
    this.setState({
      note: null,
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
      note: null,
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
      note: null,
      notes,
      openNoteModal: false
    });
  };

  deleteNote = () => {
    const { note, notes } = this.state;
    notes.splice(note, 1);
    this.setState({
      note: null,
      notes,
      openDeleteModal: false
    });
  };

  handleAddNoteClick = () => {
    this.setState({
      openNoteModal: true
    });
  };

  handleDeleteNoteClick = id => {
    this.setState({
      openDeleteModal: true,
      note: id
    });
  };

  handleEditNoteClick = id => {
    this.setState({
      edit: true,
      note: id,
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
        <NoteModal
          cancelNote={this.cancelNote}
          edit={edit}
          note={note ? notes.slice(note, note + 1)[0] : DEFAULT_NOTE}
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
