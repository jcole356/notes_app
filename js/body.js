import React from 'react';
import ReactDOM from 'react-dom';
import Card from './card'

const Body = (props) => (
    <div className="body">
        {props.notes.map((note, idx) => {
            return (
                <Card 
                    body={note.body}
                    color={note.color} 
                    deleteNote={props.deleteNote} 
                    editNote={props.editNote}
                    id={idx} 
                    key={idx} 
                    title={note.title} 
                />
            )
        })}
    </div>
)

export default Body