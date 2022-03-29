import React, { Component } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  create(newTodo) {
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }

  update(id, updatedTask) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  }

  delete(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  render() {
    const todos = this.state.todos.map(todo => (
      <Todo
        delete={this.delete}
        key={todo.id}
        id={todo.id}
        task={todo.task}
        update={this.update}
      />
    ));
    return (
      <div>
        <NewTodoForm createTodo={this.handleCreate} />
        <ul>{todos}</ul>
      </div>
    );
  }
}

export default TodoList;
