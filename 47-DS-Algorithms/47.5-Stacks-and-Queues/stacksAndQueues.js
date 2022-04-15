// Queues
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

// Priority Queue
class PriorityQueue {
  constructor() {
    this.data = [];
  }
  add(priority, value) {
    this.data.push({ priority, value });
  }
  poll() {
    let maxIdx = 0;
    let maxPriority = this.data[0].priority;
    for (let i = 1; i < this.data.length; i++) {
      const curPriority = this.data[i].priority;
      if (curPriority > maxPriority) {
        maxPriority = curPriority;
        maxIdx = i;
      }
    }
    return this.data.splice(maxIdx, 1)[0].value;
  }
}

const pq = new PriorityQueue();
pq.add(8, "broken leg");
pq.add(6, "dizziness");
pq.add(10, "heart attack");
pq.add(2, "tooth ache");
