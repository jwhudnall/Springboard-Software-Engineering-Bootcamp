import React, { Component } from "react";
import uuid from "uuid/v4";

export default class NewBoxForm extends Component {
  constructor() {
    super();
    this.state = {
      height: "",
      width: "",
      backgroundColor: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.gatherInput = this.gatherInput.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  gatherInput(evt) {
    evt.preventDefault();
    // height, width, backgroundColor, id
    this.props.createBox({ ...this.state, id: uuid() });
    this.setState({
      height: "",
      width: "",
      backgroundColor: ""
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.gatherInput}>
          <div>
            <label htmlFor="height">Height</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="height"
              value={this.state.height}
              id="height"
            />
          </div>
          <div>
            <label htmlFor="width">Width</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="width"
              id="width"
              value={this.state.width}
            />
          </div>
          <div>
            <label htmlFor="backgroundColor">backgroundColor:</label>
            <input
              onChange={this.handleChange}
              type="text"
              name="backgroundColor"
              value={this.state.backgroundColor}
              id="backgroundColor"
            />
          </div>
          <button id="newBoxButton">Add a new box!</button>
        </form>
      </div>
    );
  }
}
