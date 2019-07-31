import React from "react";
import uuidv1 from "uuid/v1";

import Body from "./Body";
import Dialog from "./Dialog";
import Header from "./Header";
import NoteModal from "./NoteModal";

import mockNotes from "./mocks/notes";

const DEFAULT_NOTE = {
  id: uuidv1(),
  body: "Just start typing here",
  color: "red",
  title: "Untitled"
};

export default class Container extends React.Component {
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

  // TODO: create a new API layer
  componentDidMount() {
    // eslint-disable-next-line no-undef
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const myInit = {
      method: "GET",
      headers: myHeaders,
      cache: "default"
    };

    // eslint-disable-next-line no-undef
    const myRequest = new Request("http://localhost:3000/api/users/1");

    // eslint-disable-next-line no-undef
    fetch(myRequest, myInit)
      .then(response =>
        response.json().then(json => {
          console.log("response json", json);
          this.setState({ notes: json.notes });
        })
      )
      .catch(err => {
        console.log("error", err);
        this.setState({ notes: mockNotes });
      });
  }

  addNote = (title, body, color) => {
    const { notes } = this.state;
    notes.unshift({
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
    const { selectedNoteId, notes } = this.state;
    this.handleAddNoteClick();
    const findNote = notes.find(note => {
      return note.id === selectedNoteId;
    });
    const idx = notes.indexOf(findNote);
    notes[idx] = {
      title,
      id: selectedNoteId,
      body,
      color
    };
    this.setState({
      edit: false,
      selectedNoteId: null,
      notes,
      openNoteModal: false
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

  render() {
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
