import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isHiding: false };
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <h1>I am a counter</h1>
        <h3>Count is: {this.state.count}</h3>
        <button onClick={() => this.setState(this.state.count + 1)}>Add 1</button>
      </div>
    );
  }
}

export default Counter;
