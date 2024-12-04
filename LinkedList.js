import Node from "./Node.js";

export default class LinkedList {
  size = 0;
  head = null;
  tail = null;

  append(value) {
    const newNode = new Node(value);

    if (this.size === 0) {
      this.head = newNode;
    } else {
      this.tail.nextNode = newNode;
    }

    this.tail = newNode;
    this.size += 1;
  }

  prepend(value) {
    const newNode = new Node(value, this.head);

    if (this.size === 0) {
      this.tail = newNode;
    }

    this.head = newNode;
    this.size += 1;
  }

  at(index) {
    if (!Number.isInteger(index)) {
      return undefined;
    }

    if (index < 0 || index > this.size - 1) {
      return undefined;
    }

    let nodeIndex = 0;
    let node = this.head;
    while (nodeIndex !== index) {
      node = node.nextNode;
      nodeIndex += 1;
    }

    return node.value;
  }

  pop() {
    let node = this.head;
    let index = 0;
    while (index !== this.size - 2) {
      node = node.nextNode;
      index += 1;
    }

    node.nextNode = null;
    this.tail = node;
    this.size -= 1;
  }

  contains(value) {
    let node = this.head;
    let index = 0;
    while (index !== this.size) {
      if (node.value === value) {
        return true;
      } else {
        node = node.nextNode;
        index += 1;
      }
    }

    return false;
  }

  find(value) {
    let node = this.head;
    let index = 0;
    while (index !== this.size) {
      if (node.value === value) {
        return index;
      } else {
        node = node.nextNode;
        index += 1;
      }
    }

    return null;
  }

  toString() {
    let string = "";
    let node = this.head;
    let index = 0;
    while (index !== this.size) {
      string += `( ${node.value} ) -> `;
      node = node.nextNode;
      index += 1;
    }

    string += `${node}`;
    return string;
  }

  insertAt(value, index) {
    if (!Number.isInteger(index)) {
      return undefined;
    }

    if (index < 0 || index > this.size) {
      return undefined;
    }

    if (index === 0) {
      this.prepend(value);
      return;
    }

    if (index === this.size) {
      this.append(value);
      return;
    }

    let nodeIndex = 0;
    let node = this.head;
    let nodeParent;
    while (nodeIndex !== index) {
      if (nodeIndex === index - 1) {
        nodeParent = node;
      }
      node = node.nextNode;
      nodeIndex += 1;
    }

    const newNode = new Node(value, node);
    nodeParent.nextNode = newNode;
    this.size += 1;
  }

  removeAt(index) {
    if (!Number.isInteger(index)) {
      return undefined;
    }

    if (index < 0 || index > this.size - 1) {
      return undefined;
    }

    if (index === 0) {
      this.head = this.head.nextNode;
      this.size -= 1;
      return;
    }

    if (index === this.size - 1) {
      this.pop();
      return;
    }

    let nodeIndex = 0;
    let node = this.head;
    let nodeParent;
    while (nodeIndex !== index) {
      if (nodeIndex === index - 1) {
        nodeParent = node;
      }
      node = node.nextNode;
      nodeIndex += 1;
    }

    nodeParent.nextNode = node.nextNode;
    this.size -= 1;
  }
}
