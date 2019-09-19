/**
 * Class representing a priority node
 *
 * @class PriorityNode
 */
class PriorityNode {
  /**
   * Creates an instance of PriorityNode
   * 
   * @param {*} name
   * @param {number} priority
   * @memberof PriorityNode
   */
  constructor(name, priority) {
    this.name = name
    this.priority = priority
  }
  
  /**
   * Returns the priority value of the node for comparison
   *
   * @returns
   * @memberof PriorityNode
   */
  valueOf() {
    return this.priority
  }
}

module.exports = PriorityNode