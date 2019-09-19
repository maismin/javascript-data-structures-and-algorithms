const Node = require('../node/node')

/**
 * Class representing a doubly linked list
 *
 * @class DoublyLinkedList
 * @requires Node
 */
class DoublyLinkedList {
  /**
   * Creates an instance of DoublyLinkedList
   * 
   * @memberof DoublyLinkedList
   */
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  /**
   * Adds a node with data at the end if the linked list
   *
   * @param {*} data
   * @memberof DoublyLinkedList
   */
  push(data) {
    const newNode = new Node(data)

    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }

    this.length += 1
  }

  /**
   * Removes and returns node at the end of the linked list
   *
   * @returns {(Node|undefined)}
   * @memberof DoublyLinkedList
   */
  pop() {
    if (this.length === 0) {
      return undefined
    }

    const removedNode = this.tail

    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      this.tail = removedNode.prev
      this.tail.next = null
      removedNode.prev = null
    }

    this.length -= 1
    return removedNode
  }

  /**
   * Removes the node at the front of the linked list
   *
   * @returns {(Node|undefined)}
   * @memberof DoublyLinkedList
   */
  shift() {
    if (this.length === 0) {
      return undefined
    }

    const prevHead = this.head

    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      this.head = this.head.next
      this.head.prev = null
      prevHead.next = null
    }

    this.length -= 1
    return prevHead
  }

  /**
   * Adds a new node to the front of the linked list
   *
   * @param {*} data
   * @memberof DoublyLinkedList
   */
  unshift(data) {
    const newNode = new Node(data)

    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.head.prev = newNode
      newNode.next = this.head
      this.head = newNode
    }

    this.length += 1
  }

  /**
   * Returns the node at index
   *
   * @param   {number} index
   * @returns {(Node|null)}
   * @memberof DoublyLinkedList
   */
  get(index) {
    if (index < 0 || index >= this.length) {
      return null
    }

    let count, current
    if (index <= Math.floor(this.length / 2)) {
      count = 0
      current = this.head
      while (count != index) {
        current = current.next
        count += 1
      }
    } else {
      count = this.length - 1
      current = this.tail
      while (count !== index) {
        current = current.prev
        count -= 1
      }
    }

    return current
  }

  /**
   * Replace the data of the node at index position with new data
   *
   * @param {number} index
   * @param {*} data
   * @returns {boolean} - True if node is set with data, false otherwise
   * @memberof DoublyLinkedList
   */
  set(index, data) {
    const node = this.get(index)

    if (node) {
      node.data = data
      return true
    }

    return false
  }

  /**
   * Add a node at index position
   *
   * @param {number} index
   * @param {*} data
   * @returns {boolean} Returns true if insertion is successful, otherwise false
   * @memberof DoublyLinkedList
   */
  insert(index, data) {
    if (index === 0) {
      this.unshift(data)
      return true
    }

    if (index === this.length) {
      this.push(data)
      return true
    }

    const node = this.get(index - 1)

    if (node) {
      const newNode = new Node(data)
      newNode.next = node.next
      node.next.prev = newNode
      newNode.prev = node
      node.next = newNode
      this.length += 1
      return true
    }

    return false
  }

  /**
   *  Removes and returns the node at index position
   *
   * @param {number} index
   * @returns {(Node|undefined)}
   * @memberof DoublyLinkedList
   */
  remove(index) {
    if (index < 0 || index >= this.length) {
      return undefined
    }

    if (index === 0) {
      return this.shift()
    }

    if (index === this.length - 1) {
      return this.pop()
    }

    const removedNode = this.get(index)

    removedNode.prev.next = removedNode.next
    removedNode.next.prev = removedNode.prev

    removedNode.prev = null
    removedNode.next = null

    this.length -= 1
    return removedNode
  }
}

module.exports = DoublyLinkedList