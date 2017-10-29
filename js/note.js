import React from 'react';
import ReactDOM from 'react-dom';
import Button from './button'
import ColorPicker from './colorPicker'

export default class Note extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: '',
            title: '',
            color: 'red',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.edit) {
            this.setState({
                body: nextProps.note.body,
                title: nextProps.note.title,
                color: nextProps.note.color,
            })
        } else {
            this.setState({
                color: nextProps.note.color,
            })
        }
    }
    
    addNote = () => {
        // TODO: alpha sort
        this.props.submit(
            this.state.title, 
            this.state.body, 
            this.state.color
        )
        this.resetDefaultState();
    }
    
    editNote = () => {
        const title = this.state.title ? this.state.title : this.props.note.title
        const body = this.state.body ? this.state.body : this.props.note.body
        // TODO: alpha sort
        this.props.submit(
            title,
            body,
            this.state.color
        )
        this.resetDefaultState();
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

    resetDefaultState = () => {
        this.setState({
            title: '',
            body: '',
            color: 'red'
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
                                placeholder={this.props.edit ? '' : this.props.note.title}
                                type="text"
                                value={this.state.title}
                            />
                            <textarea
                                name="body"
                                onChange={this.handleChange}
                                placeholder={this.props.edit ? '' : this.props.note.body}
                                rows={20}
                                style={{ width: '98%' }}
                                value={this.state.body}
                            >
                            </textarea>
                        </form>
                    </div>
                </div>
                <div className="footer">
                    <Button 
                        onClick={this.props.cancelNote} 
                        active={true} 
                        action={'cancel'} 
                        text={'Cancel'} 
                    />
                    <Button 
                        onClick={this.props.edit ? this.editNote : this.addNote} 
                        active={!!this.state.title} 
                        text={this.props.edit ? 'Save' : 'Add'} 
                    />
                </div>
            </div>
        )
    }
  }