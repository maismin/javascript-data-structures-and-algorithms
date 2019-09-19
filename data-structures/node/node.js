/**
 * Class representing a node.
 * 
 * @class Node
 */
class Node {
  /**
   * Creates a node
   * 
   * @param     {*}     data  - Any object or primitive
   * @property  {*}     data  - The object or primitive contained in the node
   * @property  {Node}  prev  - Points to the previous node
   * @property  {Node}  next  - Points to the next node
   */
  constructor(data) {
    this.data = data
    this.prev = null
    this.next = null
  }
}

module.exports = Node