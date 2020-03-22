import React, { Component } from "react";
import PropTypes from "prop-types";
import uuidv1 from "uuid/v1";

import {
  createUserNote,
  deleteNote as deleteNoteApi,
  editNote as editNoteApi,
  getUserNotes
} from "./services/api";
import Body from "./Body";
import Dialog from "./Dialog";
import Header from "./Header";
import NoteModal from "./NoteModal";

const DEFAULT_NOTE = {
  id: uuidv1(),
  body: "Just start typing here",
  color: "red",
  title: "Untitled"
};

export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      notes: [],
      openDeleteModal: false,
      openNoteModal: false,
      selectedNoteId: null
    };
  }

  componentDidMount() {
    getUserNotes("current").then(response =>
      response
        .json()
        .then(json => {
          this.setState({ notes: json.notes });
        })
        .catch(err => {
          console.log("error from container", err);
        })
    );
  }

  addNote = (title, body, color) => {
    const { notes } = this.state;
    notes.push({
      body,
      color,
      id: uuidv1(),
      title
    });
    this.setState({
      notes,
      openNoteModal: false,
      selectedNoteId: null
    });
    createUserNote("current", { title, body, color }).then(response =>
      response.json().then(json => {
        this.setState({ notes: json.notes });
      })
    );
  };

  cancelDelete = () => {
    this.setState({
      openDeleteModal: false
    });
  };

  cancelNote = () => {
    this.setState({
      edit: false,
      selectedNoteId: null,
      openNoteModal: false
    });
  };

  editNote = (title, body, color) => {
    const { selectedNoteId } = this.state;
    this.handleAddNoteClick();
    this.updateNote(selectedNoteId, title, body, color);
    this.setState({
      edit: false,
      selectedNoteId: null,
      openNoteModal: false
    });
    editNoteApi(selectedNoteId, { title, body, color }).then(response =>
      response.json().then(json => {
        const {
          id: responseId,
          title: responseTitle,
          body: responseBody,
          color: responseColor
        } = json.note;
        this.updateNote(responseId, responseTitle, responseBody, responseColor);
      })
    );
  };

  findNote = id => {
    const { notes } = this.state;

    return notes.find(note => {
      return note.id === id;
    });
  };

  deleteNote = () => {
    const { selectedNoteId, notes } = this.state;
    const findNote = notes.find(note => {
      return note.id === selectedNoteId;
    });
    const idx = notes.indexOf(findNote);
    notes.splice(idx, 1);
    this.setState({
      selectedNoteId: null,
      notes,
      openDeleteModal: false
    });
    deleteNoteApi(selectedNoteId);
  };

  handleAddNoteClick = () => {
    this.setState({
      selectedNoteId: null,
      openNoteModal: true
    });
  };

  handleDeleteNoteClick = id => {
    this.setState({
      openDeleteModal: true,
      selectedNoteId: id
    });
  };

  handleEditNoteClick = id => {
    this.setState({
      edit: true,
      selectedNoteId: id,
      openNoteModal: true
    });
  };

  updateNote = (id, title, body, color) => {
    const { notes } = this.state;
    const note = this.findNote(id);
    const idx = notes.indexOf(note);
    notes[idx] = {
      title,
      id,
      body,
      color
    };
    this.setState({
      notes
    });
  };

  render() {
    const { logout } = this.props;
    const {
      edit,
      notes,
      openDeleteModal,
      openNoteModal,
      selectedNoteId
    } = this.state;
    return (
      <div className="container">
        {openNoteModal || openDeleteModal ? (
          <div className="modal-background" />
        ) : null}
        <Header
          addNote={this.handleAddNoteClick}
          className="header-container"
          logout={logout}
        />
        <Body
          notes={notes}
          editNote={this.handleEditNoteClick}
          deleteNote={this.handleDeleteNoteClick}
        />
        <NoteModal
          cancelNote={this.cancelNote}
          edit={edit}
          note={
            selectedNoteId
              ? notes.find(note => {
                  return note.id === selectedNoteId;
                })
              : DEFAULT_NOTE
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

Container.propTypes = {
  logout: PropTypes.func.isRequired
};
