class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

let antNode = new Node("ant");
let beeNode = new Node("bee");
let caterpillarNode = new Node("caterpillar");

antNode.next = beeNode;
beeNode.next = caterpillarNode;

console.log(antNode.next.next); // {'val': 'caterpillar', 'next': null}
