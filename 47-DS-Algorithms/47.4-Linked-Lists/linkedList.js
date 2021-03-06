class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  traverse() {
    let currentNode = this.head;
    while (currentNode) {
      console.log(currentNode.val);
      currentNode = currentNode.next;
    }
  }
  find(val) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.val === val) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }
  append(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    this.tail.next = newNode; // Points previous end node to new
    this.tail = newNode; // Points LL tail to new
  }
}

// let antNode = new Node("ant");
// let beeNode = new Node("bee");
// let caterpillarNode = new Node("caterpillar");

// antNode.next = beeNode;
// beeNode.next = caterpillarNode;

// console.log(antNode.next.next); // {'val': 'caterpillar', 'next': null}

// Page Example
// const firstPage = new Node("google.com", new Node("reddit.com", new Node("amazon.com")));
const train = new LinkedList();
train.append("Engine");
train.append("Freight Car 1");
train.append("Freight Car 2");

train.traverse();

// const history = new LinkedList();
// history.head = firstPage;
