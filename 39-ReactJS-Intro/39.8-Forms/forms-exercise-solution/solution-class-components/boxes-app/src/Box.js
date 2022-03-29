import React, { Component } from "react";

class Box extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove() {
    this.props.handleRemove(this.props.id);
  }

  render() {
    const { height, width, backgroundColor } = this.props;
    return (
      <div>
        <div
          style={{
            height: `${height}em`,
            width: `${width}em`,
            backgroundColor
          }}
        />
        <button onClick={this.handleRemove}>Remove The Box!</button>
      </div>
    );
  }
}

export default Box;

