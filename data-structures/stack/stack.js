class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

/**
 * Class representing a stack
 *
 * @class Stack
 */
class Stack {
  /**
   * Creates an instance of Stack
   *
   * @memberof Stack
   */
  constructor() {
    this.top = null
    this.size = 0
  }

  /**
   * Adds a node on top of the stack
   *
   * @param {*} data
   * @memberof Stack
   */
  push(data) {
    const newNode = new Node(data)

    if (this.size === 0) {
      this.top = newNode
    } else {
      newNode.next = this.top
      this.top = newNode
    }

    this.size += 1
  }

  /**
   * Removes and returns the top of the stack
   *
   * @returns {(Node|null)}
   * @memberof Stack
   */
  pop() {
    if (this.size === 0) {
      return null
    }

    const removedTop = this.top

    this.top = removedTop.next
    removedTop.next = null
    this.size -= 1

    return removedTop
  }
}

module.exports = Stack