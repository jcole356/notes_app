import React from 'react';
import ReactDOM from 'react-dom';

export default class Button extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div 
                className={`button ${this.props.action}`} 
                onClick={this.props.active ? this.props.onClick : null}
                style={this.props.active ? {opacity: '1'} : {opacity: '0.5'}}
            >
                {this.props.icon ? 
                    <i className={this.props.icon} aria-hidden="true"></i>
                    :
                this.props.text}
            </div>
        )
    }
}