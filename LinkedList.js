import Node from "./Node.js";

export default class LinkedList {
  #size = 0;
  #head = null;
  #tail = null;

  get size() {
    return this.#size;
  }

  get head() {
    return this.#head.value;
  }

  get tail() {
    return this.#tail.value;
  }

  #traverseList(value, callbackTrue, callbackFalse) {
    let node = this.#head;
    let index = 0;
    while (index !== this.#size) {
      if (node.value === value) {
        return callbackTrue(index);
      } else {
        node = node.nextNode;
        index += 1;
      }
    }

    return callbackFalse();
  }

  #isInvalidIndex(index, indexValid) {
    return !Number.isInteger(index) || index < 0 || index > indexValid;
  }

  #getNodes(index) {
    let nodeIndex = 0;
    let node = this.#head;
    let nodeParent;
    while (nodeIndex !== index) {
      if (nodeIndex === index - 1) {
        nodeParent = node;
      }
      node = node.nextNode;
      nodeIndex += 1;
    }

    return { node, nodeParent };
  }

  append(value) {
    const newNode = new Node(value);

    if (this.#size === 0) {
      this.#head = newNode;
    } else {
      this.#tail.nextNode = newNode;
    }

    this.#tail = newNode;
    this.#size += 1;
  }

  prepend(value) {
    const newNode = new Node(value, this.#head);

    if (this.#size === 0) {
      this.#tail = newNode;
    }

    this.#head = newNode;
    this.#size += 1;
  }

  at(index) {
    if (!Number.isInteger(index)) {
      return undefined;
    }

    if (index < 0 || index > this.#size - 1) {
      return undefined;
    }

    let nodeIndex = 0;
    let node = this.#head;
    while (nodeIndex !== index) {
      node = node.nextNode;
      nodeIndex += 1;
    }

    return node.value;
  }

  pop() {
    let node = this.#head;
    let index = 0;
    while (index !== this.#size - 2) {
      node = node.nextNode;
      index += 1;
    }

    node.nextNode = null;
    this.#tail = node;
    this.#size -= 1;
  }

  contains(value) {
    return this.#traverseList(
      value,
      () => true,
      () => false
    );
  }

  find(value) {
    return this.#traverseList(
      value,
      (index) => index,
      () => null
    );
  }

  toString() {
    let string = "";
    let node = this.#head;
    let index = 0;
    while (index !== this.#size) {
      string += `( ${node.value} ) -> `;
      node = node.nextNode;
      index += 1;
    }

    string += `${node}`;
    return string;
  }

  insertAt(value, index) {
    if (this.#isInvalidIndex(index, this.#size)) {
      return undefined;
    }

    if (index === 0) {
      this.prepend(value);
      return;
    } else if (index === this.#size) {
      this.append(value);
      return;
    }

    const { node, nodeParent } = this.#getNodes(index);
    const newNode = new Node(value, node);
    nodeParent.nextNode = newNode;
    this.#size += 1;
  }

  removeAt(index) {
    if (this.#isInvalidIndex(index, this.#size - 1)) {
      return undefined;
    }

    if (index === 0) {
      this.#head = this.#head.nextNode;
      this.#size -= 1;
      return;
    } else if (index === this.#size - 1) {
      this.pop();
      return;
    }

    const { node, nodeParent } = this.#getNodes(index);
    nodeParent.nextNode = node.nextNode;
    this.#size -= 1;
  }
}
