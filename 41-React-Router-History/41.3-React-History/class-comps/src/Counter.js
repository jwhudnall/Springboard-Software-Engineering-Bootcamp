import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isHiding: false };
    // "binds" needed to use this
    this.decrement = this.decrement.bind(this);
    this.increment = this.increment.bind(this);
  }
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
  render() {
    return (
      <div>
        <h1>I am a counter</h1>
        <h3>Count is: {this.state.count}</h3>
        <button onClick={this.increment}>Add 1</button>
        <button onClick={this.decrement}>Subtract 1</button>
      </div>
    );
  }
}

export default Counter;
