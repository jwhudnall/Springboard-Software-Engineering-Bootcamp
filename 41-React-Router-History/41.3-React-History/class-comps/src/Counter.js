import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <h1>I am a counter</h1>
      </div>
    );
  }
}

export default Counter;
