import React from 'react';
import ReactDOM from 'react-dom';
import Button from './button'

export default class ColorPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            colors: [
                'red',
                'green',
                'yellow',
                'blue',
            ],
        }
    }

    handleChange = (event) => {
        const color = event.target.getAttribute('data-color')
        this.props.onChange(color)
    }

    render() {
      return (
        <div className="color-picker">
            {this.state.colors.map((color) => {
                return (
                    <div className="color" data-color={color} key={color} onClick={this.handleChange} style={{backgroundColor: color}}/>
                )
            })}
        </div>
      )
    }
  }