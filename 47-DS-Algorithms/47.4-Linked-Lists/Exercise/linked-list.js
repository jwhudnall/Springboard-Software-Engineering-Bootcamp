/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (!this.tail || !this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);
    if (!this.tail || !this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (!this.tail) {
      throw new Error("List is empty.");
    } else if (this.head === this.tail) {
      const val = this.tail.val;
      this.head = null;
      this.tail = null;
      this.length--;
      return val;
    } else {
      let currentNode = this.head;
      while (currentNode.next.next) {
        currentNode = currentNode.next;
      }
      // Stops 1 before tail
      const popped = currentNode.next;
      this.tail = currentNode;
      this.tail.next = null;
      this.length--;
      return popped.val;
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    // Remove & return head value. Throws error if list is empty.
    if (!this.head) {
      throw new Error("List is empty.");
    } else if (this.head === this.tail) {
      const val = this.head.val;
      this.head = null;
      this.tail = null;
      this.length--;
      return val;
    } else {
      const val = this.head.val;
      this.head = this.head.next;
      this.length--;
      return val;
    }
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    // Retrieve value at index position idx. Throws error if index is invalid.
    if (!this.head) {
      throw new Error("Invalid index (list is empty)");
    } else if (this.head === this.tail) {
      if (idx === 0) {
        return this.head.val;
      } else {
        throw new Error("Invalid index.");
      }
    } else {
      let currentIdx = 0;
      let currentNode = this.head;
      while (currentNode) {
        if (currentIdx === idx) {
          return currentNode.val;
        }
        currentIdx++;
        currentNode = currentNode.next;
      }
      throw new Error("Invalid index.");
    }
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (!this.head) {
      throw new Error("Invalid index (list is empty)");
    } else if (this.head === this.tail) {
      if (idx === 0) {
        this.head.val = val;
      } else {
        throw new Error("Invalid index (list is empty)");
      }
    } else {
      let currentIdx = 0;
      let currentNode = this.head;
      while (currentNode) {
        if (idx === currentIdx) {
          currentNode.val = val;
          return;
        }
        currentIdx++;
        currentNode = currentNode.next;
      }
      throw new Error("Invalid index (list is empty)");
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    // Insert a new node at position idx with value val. Throws error if index is invalid. Returns undefined.
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
    } else if (this.head === this.tail) {
      if (idx === 0) {
        this.head = newNode;
        newNode.next = this.tail;
        this.length++;
      } else if (idx === 1) {
        this.head.next = newNode;
        this.tail = newNode;
        this.length++;
      } else {
        throw new Error("Invalid Index.");
      }
    } else {
      // 2+ Nodes
      if (idx === 0) {
        const next = this.head.next;
        newNode.next = next;
        this.head = newNode;
        this.length++;
        return;
      }
      let currentIdx = 1;
      let previous = this.head;
      let currentNode = previous.next;
      while (currentNode) {
        if (currentIdx === idx) {
          previous.next = newNode;
          newNode.next = currentNode;
          this.length++;
          return;
        }
        currentIdx++;
        previous = previous.next;
        currentNode = previous.next;
      }
      // Check if 1 more index has target. If not, throw error
      if (currentIdx === idx) {
        previous.next = newNode;
        this.tail = newNode;
        this.length++;
        return;
      } else {
        throw new Error("Invalid Index.");
      }
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    // Remove & return value at position idx. Throws error if index is invalid.
    if (!this.head) {
      throw new Error("Invalid index (list is empty).");
    } else if (this.head === this.tail) {
      if (idx === 0) {
        const val = this.head.val;
        this.head = null;
        this.tail = null;
        this.length--;
        return val;
      } else {
        throw new Error("Invalid index.");
      }
    } else {
      // 2+ nodes
      if (idx === 0) {
        const val = this.head.val;
        this.head = this.head.next;
        this.length--;
        return val;
      }
      let currentIdx = 1;
      let previousNode = this.head;
      let currentNode = previous.next;
      while (currentNode) {
        if (currentIdx === idx) {
          const val = currentNode.val;
          previousNode.next = currentNode.next;
          this.length--;
          return val;
        }
        currentIdx++;
        previousNode = previousNode.next;
        currentNode = previousNode.next;
      }
      if (currentIdx === idx) {
        // Handle case where idx is at tail
        const val = previousNode.val;
        previousNode.next = null;
        this.length--;
        return val;
      } else {
        throw new Error("Invalid Index.");
      }
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    if (!this.head) {
      return 0;
    }
    let count = 0;
    let sum = 0;
    let currentNode = this.head;
    while (currentNode) {
      count++;
      sum += currentNode.val;
      currentNode = currentNode.next;
    }
    return sum / count;
  }
}

module.exports = LinkedList;
