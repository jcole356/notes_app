import React from 'react';
import ReactDOM from 'react-dom';
import Button from './button'
import ColorPicker from './colorPicker'

export default class Note extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            body: '',
            color: 'red',
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            color: nextProps.note.color,
        })
    }
    
    addNote = () => {
        const title = this.props.edit ?  (this.state.title ? this.state.title : this.props.note.title) : this.state.title
        const body = this.props.edit ? (this.state.body ? this.state.body : this.props.note.body) : this.state.body
        this.props.submit(
            title, 
            body, 
            this.state.color
        )
        this.setState({
            title: '',
            body: '',
            color: 'red'
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleColorChange = (color) => {
        this.setState({
            color: color,
        })
    }

    render() {
        const backgroundColor = this.state.color
        return (
            <div
                className="note"
                style={{
                    display: this.props.visible ? 'block' : 'none',
                }}
            >
                <div
                    className="note-content"
                    style={{
                        backgroundColor: backgroundColor
                    }}
                >
                    <ColorPicker
                        onChange={this.handleColorChange} 
                        selected={this.state.color}
                    />
                    <div className="formContainer">
                        <form>
                            <input
                                name="title"
                                onChange={this.handleChange}
                                placeholder={this.props.note.title}
                                type="text"
                                value={this.state.title}
                            />
                            <textarea
                                placeholder={this.props.note.body }
                                name="body"
                                onChange={this.handleChange}
                                value={this.state.body}
                                style={{ width: '98%' }}
                            >
                            </textarea>
                        </form>
                    </div>
                </div>
                <div className="footer">
                    <Button onClick={this.props.cancelNote} active={true} action={'cancel'} text={'Cancel'} />
                    <Button onClick={this.addNote} active={!!this.state.title} text={this.props.edit ? 'Save' : 'Add'} />
                </div>
            </div>
        )
    }
  }