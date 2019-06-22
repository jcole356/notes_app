import React from "react";
import PropTypes from "prop-types";

const DEFAULT_NOTE_COLORS = ["red", "green", "yellow", "blue"];

// TODO: color picker squares should be components
export default class ColorPicker extends React.Component {
  handleChange = event => {
    const { onChange } = this.props;
    const color = event.target.getAttribute("data-color");
    onChange(color);
  };

  render() {
    const { selected } = this.props;
    return (
      <div className="color-picker">
        {DEFAULT_NOTE_COLORS.map(color => {
          const style = {
            backgroundColor: color
          };
          if (selected === color) {
            style.borderColor = "black";
          }
          return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div
              className="color"
              data-color={color}
              key={color}
              onClick={this.handleChange}
              style={style}
            />
          );
        })}
      </div>
    );
  }
}

ColorPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
};
