const Node = require('../node/node')

/**
 * Class representing a singly linked list
 * 
 * @class SinglyLinkedList
 */
class SinglyLinkedList {
  /**
   * Creates an instance of SinglyLinkedList
   * 
   * @property  {Node}   head    - The start of the linked list
   * @property  {Node}   tail    - The end of the linked list
   * @property  {number} length  - The length of the linked list
   * @memberof SinglyLinkedList
   */
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  /**
   * Checks if the linked list is empty
   * 
   * @returns   {boolean}
   * @memberof SinglyLinkedList
   */
  isEmpty() {
    return this.length === 0
  }

  /**
   * Adds a node to the head of the linked list
   * 
   * @param {*} data 
   * @memberof SinglyLinkedList
   */
  addFirst(data) {
    const newNode = new Node(data)
    if (this.isEmpty()) {
      this.head = newNode
      this.tail = this.head
    } else {
      newNode.next = this.head
      this.head = newNode
    }
    this.length += 1
  }

  /**
   * Removes and returns the head node
   * 
   * @returns {Node} currentHead - The head node
   * @memberof SinglyLinkedList
   */
  removeFirst() {
    if (this.isEmpty()) {
      return undefined
    }

    const currentHead = this.head
    this.head = currentHead.next
    currentHead.next = null
    this.length -= 1
    if (this.isEmpty()) {
      this.tail = null
    }

    return currentHead
  }

  /**
   * Adds node to the end of the linked list
   * 
   * @param {*} data 
   * @memberof SinglyLinkedList
   */
  addLast(data) {
    const newNode = new Node(data)
    if (this.isEmpty()) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length += 1
  }

  /**
   * Removes node from the end of the linked list
   * 
   * @returns {(Node|undefined)} current - The node at end of the linked list
   * @memberof SinglyLinkedList
   */
  removeLast() {
    if (this.isEmpty()) {
      return undefined
    }

    let current = this.head
    let newTail = current

    while (current.next) {
      newTail = current
      current = current.next
    }

    newTail.next = null
    this.tail = newTail
    this.length -= 1

    if (this.isEmpty()) {
      this.head = null
      this.tail = null
    }

    return current
  }

  /**
   * Returns the node at the index number
   * 
   * @param   {number} index 
   * @returns {(Node|null)} node - The node at the index number
   * @memberof SinglyLinkedList
   */
  get(index) {
    if (index < 0 || index > this.length) {
      return null
    }

    let counter = 0
    let node = this.head
    while (counter < index) {
      node = node.next
      counter += 1
    }

    return node
  }

  /**
   * Change the value of a node based on its position in the linked list
   * 
   * @param   {number}  index - The location of the node
   * @param   {*}       data  - The data to replace
   * @returns {boolean}       - Returns true if node is set, otherwise false
   * @memberof SinglyLinkedList
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
   * Add a node to the linked list at a specific position
   * 
   * @param   {number}  index
   * @param   {*}       data
   * @returns {boolean}       - True if insert was successful, false otherwise
   * @memberof SinglyLinkedList
   */
  insert(index, data) {
    if (index < 0 || index > this.length) {
      return false
    }

    if (index === 0) {
      this.addFirst(data)
    } else if (index === this.length) {
      this.addLast(data)
    } else {
      const nodeBeforeIndex = this.get(index - 1)
      const newNode = new Node(data)
      
      newNode.next = nodeBeforeIndex.next
      nodeBeforeIndex.next = newNode
      this.length += 1
    }

    return true
  }

  /**
   *  Removes node at specific position
   * 
   * @param   {number}           index
   * @returns {(Node|undefined)} - Node removed at index, otherwise undefined
   * @memberof SinglyLinkedList
   */
  remove(index) {
    if (index < 0 || index > this.length) {
      return undefined
    }

    if (index === this.length - 1) {
      this.removeLast()
    } else if (index === 0) {
      this.removeFirst()
    } else {
      const prevNode = this.get(index - 1)
      const removedNode = prevNode.next
      prevNode.next = removedNode.next
      this.length -= 1
    }
  }

  /**
   * Reverses the linked list
   * 
   * @returns {(Node|null)} - The head of the reversed linked list
   * @memberof SinglyLinkedList
   */
  reverse() {
    if (this.isEmpty() || this.length < 2) {
      return this.head
    }

    let prev = null
    let curr = this.head

    this.head = this.tail
    this.tail = curr

    while (curr) {
      const nextNode = curr.next
      curr.next = prev
      prev = curr
      curr = nextNode
    }

    return this.head
  }
}

module.exports = SinglyLinkedList