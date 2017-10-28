import React from 'react';
import ReactDOM from 'react-dom';
import Button from './button'

export default class Dialog extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="dialog" style={{display: this.props.visible ? 'block' : 'none'}}>
                <div className="message">
                    <div className="messge-title">Delete Note</div>
                    <div className="messge-body">Are you sure you want to delete this note?</div>
                </div>
                <div className="footer">
                    <Button active={true} onClick={this.props.cancel} text={'Cancel'}/>
                    <Button active={true} onClick={this.props.delete} text={'Delete'}/>
                </div>
            </div>
        )
    }
}