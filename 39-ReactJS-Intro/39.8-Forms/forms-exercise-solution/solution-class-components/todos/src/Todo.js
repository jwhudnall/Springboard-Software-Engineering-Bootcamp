import React, { Component } from "react";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task,
      isEditing: false
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleChange(evt) {
    this.setState({ task: evt.target.value });
  }

  handleDelete() {
    this.props.delete(this.props.id);
  }

  handleUpdate(evt) {
    evt.preventDefault();
    this.props.update(this.props.id, this.state.task);
    this.setState({ isEditing: false });
  }

  render() {
    let result = (
      <div>
        <button onClick={this.toggleEdit}>Edit</button>
        <button onClick={this.props.deleteTodo}>X</button>
        <li>{this.props.task}</li>
      </div>
    );
    if (this.state.isEditing) {
      result = (
        <div>
          <form onSubmit={this.handleUpdate}>
            <input
              type="text"
              value={this.state.task}
              onChange={this.handleChange}
            />
            <button>Stop Editing</button>
          </form>
        </div>
      );
    }
    return result;
  }
}

export default Todo;
