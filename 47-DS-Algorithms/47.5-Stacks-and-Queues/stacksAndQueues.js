class Queue {
  constructor() {
    this.data = {};
  }
  enqueue(val) {
    this.data.push(val);
  }
  dequeue(val) {
    return this.data.shift();
  }
}
