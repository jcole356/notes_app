import React from 'react';
import ReactDOM from 'react-dom';
import Body from './body'
import Dialog from './dialog'
import Header from './header'
import Note from './note'

export default class Container extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            note: '',
            notes: [
                { 
                    title: 'Sunday', 
                    body: `watch football\nexercise\nlaundry`, 
                    color: 'red' 
                },
                { 
                    title: 'Monday', 
                    body: 'go to work', 
                    color: 'green' 
                },
                { 
                    title: 'Friday', 
                    body: 'Dinner\nsleep', 
                    color: 'blue' 
                },
                { 
                    title: 'Saturday', 
                    body: 'Farmers Market\nWatch Stranger Things', 
                    color: 'yellow' 
                },
            ],
            openNoteModal: false,
            openDeleteModal: false,
        }
    }

    addNote = (title, body, color) => {
        this.state.notes.unshift({title: title, body: body, color: color})
        this.setState({
            note: '',
            notes: this.state.notes,
            openNoteModal: false,
        })
    }

    cancelDelete = () => {
        this.setState({
            openDeleteModal: false,
        })
    }

    cancelNote = () => {
        this.setState({
            note: '',
            openNoteModal: false,
        })
    }

    editNote = (title, body, color) => {
        this.handleAddNoteClick()
        this.state.notes[this.state.note] = {title: title, body: body, color: color}
        this.setState({
            edit: false,
            note: '',
            notes: this.state.notes,
            openNoteModal: false,
        })
    }

    deleteNote = () => {
        this.state.notes.splice(this.state.note, 1)
        this.setState({
            note: '',
            notes: this.state.notes,
            openDeleteModal: false,
        })
    }

    // TODO: rename to openModal
    handleAddNoteClick = () => {
        this.setState({
            openNoteModal: true,
        })
    }

    handleDeleteNoteClick = (key) => {
        this.setState({
            openDeleteModal: true,
            note: key,
        })
    }

    handleEditNoteClick = (key) => {
        this.setState({
            edit: true,
            note: key,
            openNoteModal: true,
        })
    }

    render() {
        return (
            <div className="container">
                {this.state.openNoteModal || this.state.openDeleteModal ? <div className="modal-background"/> : null}
                <Header addNote={this.handleAddNoteClick} />
                <Body 
                    notes={this.state.notes} 
                    editNote={this.handleEditNoteClick} 
                    deleteNote={this.handleDeleteNoteClick} 
                />
                <Note
                    cancelNote={this.cancelNote}
                    edit={this.state.edit}
                    note={this.state.note !== '' ? 
                        this.state.notes.slice(this.state.note, this.state.note + 1)[0] : 
                        {title: "Untitled", body: "Just start typing here", color: 'red'}
                    }
                    submit={this.state.edit ? this.editNote : this.addNote}
                    visible={this.state.openNoteModal}
                />
                <Dialog cancel={this.cancelDelete} delete={this.deleteNote} visible={this.state.openDeleteModal}/>
            </div>
        )
    }
  }