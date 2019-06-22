import React from 'react';
import Card from './card'

const Body = ({
    deleteNote,
    editNote,
    notes,
}) => (
    <div className="body">
        {notes.map((note, idx) => {
            const {
                body,
                color,
                title,
            } = note;
            return (
                <Card 
                    body={body}
                    color={color}
                    deleteNote={deleteNote}
                    editNote={editNote}
                    id={idx}
                    key={title}
                    title={title}
                />
            )
        })}
    </div>
)

export default Body
