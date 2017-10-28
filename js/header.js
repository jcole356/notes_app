import React from 'react';
import ReactDOM from 'react-dom';
import Button from './button'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="header">
                <Button
                    active={true}
                    onClick={this.props.addNote}
                    text={'+ Add Note'}
                />
            </div>
        )
    }
}