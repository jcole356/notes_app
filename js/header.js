import React from 'react';
import ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';
import Button from './button'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    // TODO: add a media query to format the button
    // TODO: stop adding the undefined class to some instances of the button
    render() {
        return (
            <div>
                <MediaQuery query="(max-width: 768px)">
                    <div className="header">
                        <div className="header-title">
                            Notes
                        </div>
                        <Button
                            active={true}
                            onClick={this.props.addNote}
                            text={'+'}
                        />
                    </div>
                </MediaQuery>
                <MediaQuery query="(min-width: 769px)">
                    <div className="header">
                        <div className="header-title">
                            Notes
                        </div>
                        <Button
                            active={true}
                            onClick={this.props.addNote}
                            text={'+ Add Note'}
                        />
                    </div>
                </MediaQuery>
            </div>
        )
    }
}