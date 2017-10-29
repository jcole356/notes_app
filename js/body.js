import React from 'react';
import ReactDOM from 'react-dom';
import Card from './card'

export default class Body extends React.Component {
    render() {
        return (
            <div className="body">
                {this.props.notes.map((note, idx) => {
                    return (
                        <Card 
                            body={note.body}
                            color={note.color} 
                            deleteNote={this.props.deleteNote} 
                            editNote={this.props.editNote}
                            id={idx} 
                            key={idx} 
                            title={note.title} 
                        />
                    )
                })}
            </div>
        )
    }
}