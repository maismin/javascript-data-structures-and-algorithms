class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

/**
 * Class representing a queue
 *
 * @class Queue
 */
class Queue {
  /**
   * Creates an instance of Queue
   * 
   * @memberof Queue
   */
  constructor() {
    this.first = null
    this.last = null
    this.size = 0
  }

  /**
   * Checks if the queue is empty
   *
   * @returns {boolean}
   * @memberof Queue
   */
  isEmpty() {
    return this.size === 0
  }

  /**
   * Add node to end of queue
   *
   * @param {*} data
   * @memberof Queue
   */
  enqueue(data) {
    const newNode = new Node(data)

    if (this.isEmpty()) {
      this.first = newNode
      this.last = newNode
    } else {
      this.last.next = newNode
      this.last = newNode
    }
    
    this.size += 1
  }

  /**
   * Remove and return data from front of queue
   *
   * @param {*} data
   * @returns {(Node|null)}
   * @memberof Queue
   */
  dequeue(data) {
    if (this.isEmpty()) {
      return null
    }

    const removedNode = this.first

    if (this.size === 1) {
      this.first = null
      this.last = null
    } else {
      this.first = this.first.next
    }

    this.size -= 1
    return removedNode.data
  }

  /**
   * Return the first node in queue
   *
   * @returns {(Node|null)}
   * @memberof Queue
   */
  peek() {
    return this.first
  }
}

module.exports = Queue