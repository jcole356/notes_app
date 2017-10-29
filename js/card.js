import React from 'react';
import ReactDOM from 'react-dom';
import Button from './button'

export default class Card extends React.Component {
    handleEditNote = () => {
        this.props.editNote(this.props.id)
    }

    handleDeleteNote = () => {
        this.props.deleteNote(this.props.id)
    }

    render() {
      return (
        <div className="card" style={{backgroundColor: this.props.color}}>
            <div className="card-header">
                <div className="title">
                    {this.props.title}
                </div>
                <Button text={'Delete'} active={true} icon={'fa fa-trash-o'} onClick={this.handleDeleteNote}/>
                <Button text={'Edit'} active={true} icon={'fa fa-pencil'} onClick={this.handleEditNote}/>
            </div>
            <div className="note-body">
                <textarea
                    readOnly={true}
                    rows={10}
                    // TODO: add to CSS
                    style={{
                        border: 'none',
                        outline: 'none',
                        resize: 'none',
                        width: '93%'
                    }}
                    value={this.props.body}
                >
                </textarea>
            </div>
        </div>
      )
    }
  }